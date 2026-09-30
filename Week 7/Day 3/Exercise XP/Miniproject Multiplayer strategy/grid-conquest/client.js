(() => {
  const $ = (sel) => document.querySelector(sel);
  const views = { auth: $('#auth-view'), lobby: $('#lobby-view'), game: $('#game-view') };
  const KEY_TO_DIR = { ArrowUp: 'up', w: 'up', ArrowDown: 'down', s: 'down', ArrowLeft: 'left', a: 'left', ArrowRight: 'right', d: 'right' };

  // sessionStorage = one login per browser tab, so two tabs can be two different players
  const state = {
    token: sessionStorage.getItem('token'),
    user: sessionStorage.getItem('user'),
    mode: 'login', view: 'auth', gameId: null, game: null, busy: false, timer: null,
  };

  /* ---------- API helper ---------- */
  async function api(path, { method = 'GET', body } = {}) {
    const res = await fetch('/api' + path, {
      method,
      headers: { 'Content-Type': 'application/json', ...(state.token ? { Authorization: `Bearer ${state.token}` } : {}) },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = res.status === 204 ? null : await res.json().catch(() => ({}));
    if (!res.ok) {
      if (res.status === 401 && state.token) { clearSession(); showView('auth'); }
      throw new Error(data?.error || `Request failed (${res.status})`);
    }
    return data;
  }

  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.remove('hidden');
    clearTimeout(toast.t);
    toast.t = setTimeout(() => t.classList.add('hidden'), 2800);
  }
  const toastErr = (e) => toast(e.message);

  /* ---------- Views ---------- */
  function showView(name) {
    state.view = name;
    Object.entries(views).forEach(([k, el]) => el.classList.toggle('hidden', k !== name));
    $('#userbox').classList.toggle('hidden', name === 'auth');
    $('#user-name').textContent = state.user || '';
    clearInterval(state.timer);
    if (name === 'lobby') {
      loadLobby().catch(() => {});
      state.timer = setInterval(() => loadLobby().catch(() => {}), 3000);
    } else if (name === 'game') {
      state.timer = setInterval(() => { if (!state.busy) refreshGame().catch(() => {}); }, 1500);
    }
  }

  function saveSession(token, user) {
    Object.assign(state, { token, user });
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', user);
  }
  function clearSession() {
    Object.assign(state, { token: null, user: null });
    sessionStorage.clear();
  }

  /* ---------- Auth ---------- */
  function setMode(mode) {
    state.mode = mode;
    $('#tab-login').classList.toggle('active', mode === 'login');
    $('#tab-register').classList.toggle('active', mode === 'register');
    $('#auth-submit').textContent = mode === 'login' ? 'Log in' : 'Create account';
    $('#auth-error').textContent = '';
  }
  $('#tab-login').addEventListener('click', () => setMode('login'));
  $('#tab-register').addEventListener('click', () => setMode('register'));

  $('#auth-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = { username: $('#auth-username').value.trim(), password: $('#auth-password').value };
    try {
      if (state.mode === 'register') await api('/register', { method: 'POST', body });
      const { token, username } = await api('/login', { method: 'POST', body });
      saveSession(token, username);
      $('#auth-password').value = '';
      showView('lobby');
    } catch (err) {
      $('#auth-error').textContent = err.message;
    }
  });

  $('#logout').addEventListener('click', async () => {
    await api('/logout', { method: 'POST' }).catch(() => {});
    clearSession();
    showView('auth');
  });

  /* ---------- Lobby ---------- */
  function gameLabel(g) {
    const status = g.status === 'waiting' ? 'waiting for opponent'
      : g.status === 'active' ? `in progress (${g.turn}'s turn)`
      : g.winner ? `won by ${g.winner}` : 'draw';
    return `#${g.id} · ${g.players.join(' vs ')} · ${status}`;
  }

  function renderList(ul, games, buttonText, onClick, emptyText) {
    ul.textContent = '';
    if (!games.length) {
      const li = document.createElement('li');
      li.className = 'empty';
      li.textContent = emptyText;
      ul.appendChild(li);
      return;
    }
    games.forEach((g) => {
      const li = document.createElement('li');
      const label = document.createElement('span');
      label.textContent = gameLabel(g);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = buttonText;
      btn.addEventListener('click', () => onClick(g).catch(toastErr));
      li.append(label, btn);
      ul.appendChild(li);
    });
  }

  async function loadLobby() {
    const { open, mine } = await api('/games');
    renderList($('#open-games'), open, 'Join', async (g) => {
      await api(`/games/${g.id}/join`, { method: 'POST' });
      openGame(g.id);
    }, 'No open games right now. Create one!');
    renderList($('#my-games'), mine, 'Open', async (g) => openGame(g.id), 'You have no games yet.');
  }

  $('#create-game').addEventListener('click', async () => {
    try {
      const g = await api('/games', { method: 'POST' });
      openGame(g.id);
    } catch (e) { toastErr(e); }
  });

  /* ---------- Game ---------- */
  function openGame(id) {
    state.gameId = id;
    state.game = null;
    showView('game');
    refreshGame().catch(toastErr);
  }

  async function refreshGame() {
    renderGame(await api(`/games/${state.gameId}`));
  }

  async function act(path, body) {
    if (state.busy || !state.game) return;
    state.busy = true;
    try {
      renderGame(await api(`/games/${state.gameId}/${path}`, { method: 'POST', body }));
    } catch (e) {
      toastErr(e);
    } finally {
      state.busy = false;
    }
  }

  function renderGame(g) {
    state.game = g;
    $('#game-id').textContent = `Game #${g.id}`;
    renderBanner(g);
    renderBoard(g);
    renderSide(g);
  }

  function renderBanner(g) {
    const banner = $('#banner');
    banner.className = 'banner';
    if (g.status === 'waiting') {
      banner.textContent = `Waiting for an opponent to join… (game #${g.id})`;
    } else if (g.status === 'finished') {
      if (!g.winner) banner.textContent = `🤝 Draw: ${g.reason}`;
      else if (g.winner === state.user) { banner.textContent = `🎉 You won: ${g.reason}`; banner.classList.add('win'); }
      else { banner.textContent = `${g.winner} won: ${g.reason}`; if (g.you) banner.classList.add('lose'); }
    } else if (g.yourTurn) {
      banner.textContent = g.canAttack ? '👉 Your turn: you can attack the base!' : '👉 Your turn: pick a move';
      banner.classList.add('turn');
    } else {
      banner.textContent = g.you ? `Waiting for ${g.turn}…` : `${g.turn} is playing`;
    }
  }

  function renderBoard(g) {
    const board = $('#board');
    board.textContent = '';
    const rocks = new Set(g.obstacles.map((o) => `${o.row},${o.col}`));
    const valid = new Map(g.validMoves.map((m) => [`${m.row},${m.col}`, m]));
    const bases = [{ number: 1, row: 0, col: 0 }, { number: 2, row: g.size - 1, col: g.size - 1 }];

    for (let r = 0; r < g.size; r++) {
      for (let c = 0; c < g.size; c++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        const k = `${r},${c}`;

        if (rocks.has(k)) { cell.classList.add('obstacle'); cell.textContent = '🪨'; }

        const base = bases.find((b) => b.row === r && b.col === c);
        if (base) {
          cell.classList.add(`base-${base.number}`);
          cell.textContent = '🏰';
          if (g.canAttack && base.number !== g.you) {
            cell.classList.add('attackable');
            cell.title = 'Click to attack!';
            cell.addEventListener('click', () => act('attack'));
          }
        }

        const owner = g.players.find((p) => p.position.row === r && p.position.col === c);
        if (owner) {
          const token = document.createElement('div');
          token.className = `token p${owner.number}` + (owner.number === g.you ? ' you' : '');
          token.textContent = owner.username[0].toUpperCase();
          token.title = owner.username;
          cell.textContent = '';
          cell.appendChild(token);
        }

        const move = valid.get(k);
        if (move) {
          cell.classList.add('valid');
          if (move.capturesBase) cell.classList.add('capture');
          cell.addEventListener('click', () => act('move', { direction: move.direction }));
        }
        board.appendChild(cell);
      }
    }
  }

  function renderSide(g) {
    const players = $('#players');
    players.textContent = '';
    g.players.forEach((p) => {
      const li = document.createElement('li');
      const dot = document.createElement('span');
      dot.className = `dot p${p.number}`;
      const name = document.createElement('span');
      name.textContent = p.username + (p.number === g.you ? ' (you)' : '');
      li.append(dot, name);
      if (g.turn === p.username) {
        const mark = document.createElement('span');
        mark.className = 'turn-mark';
        mark.textContent = '● turn';
        li.appendChild(mark);
      }
      players.appendChild(li);
    });

    const allowed = new Set(g.validMoves.map((m) => m.direction));
    document.querySelectorAll('[data-dir]').forEach((b) => { b.disabled = !allowed.has(b.dataset.dir); });
    $('#attack').disabled = !g.canAttack;
    $('#forfeit').disabled = !(g.status === 'active' && g.you);

    const log = $('#log');
    log.textContent = '';
    g.log.forEach((entry) => {
      const li = document.createElement('li');
      li.textContent = entry.text;
      log.appendChild(li);
    });
  }

  /* ---------- Controls ---------- */
  document.querySelectorAll('[data-dir]').forEach((b) =>
    b.addEventListener('click', () => act('move', { direction: b.dataset.dir })));
  $('#attack').addEventListener('click', () => act('attack'));
  $('#forfeit').addEventListener('click', () => { if (confirm('Give up this game?')) act('forfeit'); });
  $('#back').addEventListener('click', () => showView('lobby'));

  document.addEventListener('keydown', (e) => {
    if (state.view !== 'game' || e.target.tagName === 'INPUT') return;
    const dir = KEY_TO_DIR[e.key] || KEY_TO_DIR[e.key.toLowerCase()];
    if (!dir) return;
    e.preventDefault();
    if (state.game?.yourTurn) act('move', { direction: dir });
  });

  /* ---------- Start ---------- */
  if (state.token) {
    api('/me').then(() => showView('lobby')).catch(() => showView('auth'));
  } else {
    showView('auth');
  }
})();