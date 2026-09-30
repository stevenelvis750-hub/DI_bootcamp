// End-to-end smoke test: starts the app on a random port and plays real games over HTTP.
// Run with: npm test
const assert = require('assert');
const app = require('../app');
const engine = require('../lib/game');

const DIRS = { up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1] };

// First step of the shortest path from `start` to any cell in goalKeys (avoiding obstacles + `avoid`)
function nextStep(st, start, goalKeys, avoid) {
  const blocked = new Set(st.obstacles.map((o) => `${o.row},${o.col}`));
  blocked.add(avoid);
  const seen = new Set([`${start.row},${start.col}`]);
  const queue = [{ ...start, first: null }];
  while (queue.length) {
    const cur = queue.shift();
    if (goalKeys.has(`${cur.row},${cur.col}`)) return cur.first;
    for (const [d, [dr, dc]] of Object.entries(DIRS)) {
      const row = cur.row + dr, col = cur.col + dc, k = `${row},${col}`;
      if (row < 0 || row > 9 || col < 0 || col > 9 || blocked.has(k) || seen.has(k)) continue;
      seen.add(k);
      queue.push({ row, col, first: cur.first ?? d });
    }
  }
  return null;
}

async function main() {
  /* ---- Engine checks: obstacle generation ---- */
  for (let i = 0; i < 200; i++) {
    const obs = engine.generateObstacles();
    const keys = new Set(obs.map((o) => `${o.row},${o.col}`));
    assert.ok(engine.hasPath(keys, { row: 0, col: 0 }, { row: 9, col: 9 }), 'bases must be connected');
    assert.ok(obs.every((o) => keys.has(`${9 - o.row},${9 - o.col}`)), 'map must be symmetric');
    assert.ok(obs.every((o) => o.row + o.col > 2 && 18 - o.row - o.col > 2), 'bases must have clear space');
  }
  console.log('obstacle generation OK (connected, fair, clear around bases)');

  /* ---- HTTP helpers ---- */
  const server = app.listen(0);
  const base = `http://127.0.0.1:${server.address().port}/api`;
  const call = async (method, path, { token, body, raw } = {}) => {
    const res = await fetch(base + path, {
      method,
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: raw ?? (body ? JSON.stringify(body) : undefined),
    });
    const text = await res.text();
    return { status: res.status, body: text ? JSON.parse(text) : null };
  };

  /* ---- Auth ---- */
  assert.strictEqual((await call('POST', '/register', { body: { username: 'ab', password: 'secret1' } })).status, 400);
  assert.strictEqual((await call('POST', '/register', { body: { username: 'alice', password: '123' } })).status, 400);
  assert.strictEqual((await call('POST', '/register', { body: { username: 'alice', password: 'secret1' } })).status, 201);
  assert.strictEqual((await call('POST', '/register', { body: { username: 'ALICE', password: 'secret1' } })).status, 409);
  for (const u of ['bob', 'carol']) await call('POST', '/register', { body: { username: u, password: 'secret1' } });
  assert.strictEqual((await call('POST', '/login', { body: { username: 'alice', password: 'wrong!!' } })).status, 401);
  assert.strictEqual((await call('POST', '/login', { body: { username: 'nobody', password: 'secret1' } })).status, 401);
  const login = async (u) => (await call('POST', '/login', { body: { username: u, password: 'secret1' } })).body.token;
  const [A, B, C] = [await login('alice'), await login('bob'), await login('carol')];
  assert.strictEqual((await call('GET', '/games')).status, 401);
  assert.strictEqual((await call('POST', '/games', { raw: '{bad', token: A })).status, 400);
  console.log('registration + login + auth checks OK');

  /* ---- Session setup ---- */
  const created = await call('POST', '/games', { token: A });
  assert.strictEqual(created.status, 201);
  const id = created.body.id;
  assert.strictEqual(created.body.status, 'waiting');
  assert.strictEqual((await call('POST', `/games/${id}/move`, { token: A, body: { direction: 'down' } })).status, 409);
  assert.ok((await call('GET', '/games', { token: B })).body.open.some((g) => g.id === id));
  assert.strictEqual((await call('POST', `/games/${id}/join`, { token: A })).status, 409); // own game
  const joined = await call('POST', `/games/${id}/join`, { token: B });
  assert.strictEqual(joined.status, 200);
  assert.strictEqual((await call('POST', `/games/${id}/join`, { token: C })).status, 409); // already full
  const st0 = joined.body;
  assert.strictEqual(st0.status, 'active');
  assert.deepStrictEqual(st0.players.map((p) => p.position), [{ row: 0, col: 0 }, { row: 9, col: 9 }]);
  assert.strictEqual(st0.board.length, 10);
  assert.strictEqual(st0.turn, 'alice');
  console.log('game session start + join OK');

  /* ---- Move validation ---- */
  assert.strictEqual((await call('POST', `/games/${id}/move`, { token: B, body: { direction: 'up' } })).status, 409); // not your turn
  assert.strictEqual((await call('POST', `/games/${id}/move`, { token: C, body: { direction: 'up' } })).status, 403); // spectator
  assert.strictEqual((await call('POST', `/games/${id}/move`, { token: A, body: { direction: 'up' } })).status, 422);   // off grid
  assert.strictEqual((await call('POST', `/games/${id}/move`, { token: A, body: { direction: 'diagonal' } })).status, 400);
  assert.strictEqual((await call('POST', `/games/${id}/move`, { token: A, body: { direction: 'constructor' } })).status, 400);
  assert.strictEqual((await call('POST', `/games/${id}/attack`, { token: A })).status, 422); // not adjacent
  const moved = await call('POST', `/games/${id}/move`, { token: A, body: { direction: 'down' } });
  assert.strictEqual(moved.status, 200);
  assert.strictEqual(moved.body.turn, 'bob');
  assert.deepStrictEqual(moved.body.players[0].position, { row: 1, col: 0 });
  assert.strictEqual((await call('GET', `/games/${id}/winner`, { token: A })).body.winner, null);
  console.log('turn order + move validation OK');

  /* ---- Full games driven by a simple AI ---- */
  // mode "attack": alice walks next to bob's base and attacks. mode "step": alice walks onto the base.
  async function playGame(mode) {
    const gid = (await call('POST', '/games', { token: A })).body.id;
    await call('POST', `/games/${gid}/join`, { token: B });
    let st;
    for (let i = 0; i < 400; i++) {
      st = (await call('GET', `/games/${gid}`, { token: A })).body;
      if (st.status !== 'active') break;

      let res;
      if (st.turn === 'alice') {
        const win = st.validMoves.find((m) => m.capturesBase);
        if (mode === 'attack' && st.canAttack) res = await call('POST', `/games/${gid}/attack`, { token: A });
        else {
          const goals = mode === 'attack' ? new Set(['8,9', '9,8']) : new Set(['9,9']);
          const bob = st.players[1].position;
          const dir = (mode === 'step' && win?.direction) || nextStep(st, st.players[0].position, goals, `${bob.row},${bob.col}`) || st.validMoves[0].direction;
          res = await call('POST', `/games/${gid}/move`, { token: A, body: { direction: dir } });
        }
      } else {
        const view = (await call('GET', `/games/${gid}`, { token: B })).body;
        const far = (m) => Math.abs(9 - m.row) + Math.abs(9 - m.col); // bob drifts away from his own base
        const best = view.validMoves.reduce((a, m) => (far(m) > far(a) ? m : a), view.validMoves[0]);
        res = await call('POST', `/games/${gid}/move`, { token: B, body: { direction: best.direction } });
      }
      assert.strictEqual(res.status, 200, `unexpected ${res.status}: ${JSON.stringify(res.body)}`);
    }
    const w = (await call('GET', `/games/${gid}/winner`, { token: B })).body;
    assert.deepStrictEqual([w.finished, w.winner], [true, 'alice']);
    assert.strictEqual((await call('POST', `/games/${gid}/move`, { token: B, body: { direction: 'up' } })).status, 409);
    return w.reason;
  }
  assert.match(await playGame('attack'), /attack/);
  console.log('full game won by ATTACKING the base OK');
  assert.match(await playGame('step'), /reached/);
  console.log('full game won by REACHING the base OK');

  /* ---- Forfeit ---- */
  assert.strictEqual((await call('POST', `/games/${id}/forfeit`, { token: C })).status, 403);
  const ff = await call('POST', `/games/${id}/forfeit`, { token: B });
  assert.deepStrictEqual([ff.body.winner, ff.body.reason], ['alice', 'opponent forfeited']);
  console.log('forfeit OK');

  server.close();
  console.log('\nAll tests passed');
}

main().catch((err) => { console.error(err); process.exit(1); });