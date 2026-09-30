// Run with: npm test  (uses a temporary data file, so your real users.json is untouched)
const fs = require('fs');
const os = require('os');
const path = require('path');
const assert = require('assert');

const tmpFile = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'users-')), 'users.json');
fs.writeFileSync(tmpFile, '[]');
process.env.USERS_FILE = tmpFile;

const app = require('../app');

(async () => {
  const server = app.listen(0);
  const base = `http://127.0.0.1:${server.address().port}`;
  const call = async (method, url, body, raw) => {
    const res = await fetch(base + url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: raw ?? (body ? JSON.stringify(body) : undefined),
    });
    return { status: res.status, body: await res.json() };
  };
  const person = (o = {}) => ({ name: 'Ada', lastName: 'Lovelace', email: 'ada@example.com', username: 'ada', password: 'secret1', ...o });

  // Registration
  let r = await call('POST', '/register', person());
  assert.strictEqual(r.status, 201);
  assert.strictEqual(r.body.message, 'User registered successfully');
  assert.strictEqual(r.body.user.password, undefined);

  const stored = JSON.parse(fs.readFileSync(tmpFile, 'utf8'));
  assert.ok(stored[0].password.startsWith('$2'), 'password must be stored as a bcrypt hash');
  assert.ok(!fs.readFileSync(tmpFile, 'utf8').includes('secret1'), 'plain password must not be in the file');

  const before = fs.readFileSync(tmpFile, 'utf8');
  r = await call('POST', '/register', person({ username: 'ADA', password: 'different1' }));   // same username (any case)
  assert.deepStrictEqual([r.status, r.body.message], [409, 'Username or password already exists']);
  r = await call('POST', '/register', person({ username: 'grace' }));                          // same password
  assert.deepStrictEqual([r.status, r.body.message], [409, 'Username or password already exists']);
  assert.strictEqual(fs.readFileSync(tmpFile, 'utf8'), before, 'file must not change on duplicates');

  assert.strictEqual((await call('POST', '/register', { username: 'x' })).status, 400);
  assert.strictEqual((await call('POST', '/register', person({ email: 'nope', username: 'u2' }))).status, 400);
  assert.strictEqual((await call('POST', '/register', null, '{bad')).status, 400);
  assert.strictEqual((await call('POST', '/register', person({ name: 'Grace', username: 'grace', email: 'g@x.io', password: 'other-pass' }))).status, 201);

  // Login
  r = await call('POST', '/login', { username: 'ada', password: 'secret1' });
  assert.strictEqual(r.status, 200);
  assert.match(r.body.message, /Login successful.*Ada/);
  r = await call('POST', '/login', { username: 'ada', password: 'wrong-pass' });
  assert.deepStrictEqual([r.status, r.body.message], [401, 'Incorrect password']);
  r = await call('POST', '/login', { username: 'nobody', password: 'secret1' });
  assert.deepStrictEqual([r.status, r.body.message], [404, 'User not found. Please register first.']);
  assert.strictEqual((await call('POST', '/login', { username: 'ada' })).status, 400);

  // Users
  r = await call('GET', '/users');
  assert.strictEqual(r.body.length, 2);
  assert.ok(r.body.every((u) => u.password === undefined));
  assert.strictEqual((await call('GET', '/users/1')).body.username, 'ada');
  assert.strictEqual((await call('GET', '/users/99')).status, 404);
  assert.strictEqual((await call('GET', '/users/abc')).status, 400);

  r = await call('PUT', '/users/1', { name: 'Augusta', email: 'augusta@example.com' });
  assert.deepStrictEqual([r.status, r.body.user.name], [200, 'Augusta']);
  assert.strictEqual((await call('PUT', '/users/1', { username: 'grace' })).status, 409);
  assert.strictEqual((await call('PUT', '/users/1', {})).status, 400);
  assert.strictEqual((await call('PUT', '/users/99', { name: 'X' })).status, 404);
  assert.strictEqual((await call('PUT', '/users/1', { password: 'brand-new-pw' })).status, 200);
  assert.strictEqual((await call('POST', '/login', { username: 'ada', password: 'brand-new-pw' })).status, 200);
  assert.strictEqual((await call('POST', '/login', { username: 'ada', password: 'secret1' })).status, 401);

  // File errors
  fs.writeFileSync(tmpFile, '{not json');
  r = await call('GET', '/users');
  assert.deepStrictEqual([r.status, r.body.message], [500, 'User data file is corrupted']);
  assert.strictEqual(fs.readFileSync(tmpFile, 'utf8'), '{not json', 'corrupt file must not be overwritten');

  console.log('All tests passed');
  server.close();
})().catch((err) => { console.error(err); process.exit(1); });