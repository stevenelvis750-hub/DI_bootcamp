const express = require('express');
const crypto = require('crypto');
const { promisify } = require('util');
const store = require('../lib/store');

const scrypt = promisify(crypto.scrypt);
const router = express.Router();
const USERNAME_RE = /^[A-Za-z0-9_]{3,20}$/;
const DUMMY_SALT = crypto.randomBytes(16);

const hashPassword = (password, salt) => scrypt(password, salt, 64);

/* ---------- Middleware ---------- */
function requireAuth(req, res, next) {
  const header = req.get('Authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  const username = token && store.getSessionUser(token);
  if (!username) return res.status(401).json({ error: 'Please log in first' });
  req.user = username;
  req.token = token;
  next();
}

/* ---------- Routes ---------- */
// POST /api/register  { username, password }
router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body || {};
    if (typeof username !== 'string' || !USERNAME_RE.test(username)) {
      return res.status(400).json({ error: 'Username must be 3-20 characters: letters, numbers or _' });
    }
    if (typeof password !== 'string' || password.length < 6 || password.length > 100) {
      return res.status(400).json({ error: 'Password must be 6-100 characters' });
    }

    const salt = crypto.randomBytes(16);
    const hash = await hashPassword(password, salt);

    const lower = username.toLowerCase();
    if (store.users.has(lower)) return res.status(409).json({ error: 'That username is already taken' });
    store.users.set(lower, { username, salt, hash });

    res.status(201).json({ username });
  } catch (err) {
    next(err);
  }
});

// POST /api/login  { username, password } -> { token, username }
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body || {};
    if (typeof username !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ error: 'username and password are required' });
    }

    const user = store.users.get(username.toLowerCase());
    const hash = await hashPassword(password, user ? user.salt : DUMMY_SALT); // same work either way
    if (!user || !crypto.timingSafeEqual(hash, user.hash)) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.json({ token: store.createSession(user.username), username: user.username });
  } catch (err) {
    next(err);
  }
});

router.get('/me', requireAuth, (req, res) => res.json({ username: req.user }));

router.post('/logout', requireAuth, (req, res) => {
  store.sessions.delete(req.token);
  res.status(204).end();
});

module.exports = { router, requireAuth };