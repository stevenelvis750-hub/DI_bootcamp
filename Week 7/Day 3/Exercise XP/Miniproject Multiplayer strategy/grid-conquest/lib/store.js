// In-memory storage. Everything resets when the server restarts.
const crypto = require('crypto');

const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

const users = new Map();     // lowercase username -> { username, salt, hash }
const sessions = new Map();  // token -> { username, expires }
const games = new Map();     // game id -> game

function createSession(username) {
  const token = crypto.randomBytes(24).toString('hex');
  sessions.set(token, { username, expires: Date.now() + SESSION_TTL_MS });
  return token;
}

function getSessionUser(token) {
  const s = sessions.get(token);
  if (!s) return null;
  if (s.expires < Date.now()) { sessions.delete(token); return null; }
  return s.username;
}

function newGameId() {
  let id;
  do { id = crypto.randomBytes(3).toString('hex'); } while (games.has(id));
  return id;
}

module.exports = { users, sessions, games, createSession, getSessionUser, newGameId };