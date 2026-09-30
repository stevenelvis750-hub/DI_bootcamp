const fs = require('fs/promises');
const path = require('path');
const { HttpError } = require('./errors');

const FILE = process.env.USERS_FILE || path.join(__dirname, '..', 'users.json');

async function readUsers() {
  let raw;
  try {
    raw = await fs.readFile(FILE, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') return []; // no file yet = no users
    throw new HttpError(500, 'Could not read user data');
  }

  try {
    const data = JSON.parse(raw || '[]');
    if (!Array.isArray(data)) throw new Error('not an array');
    return data;
  } catch {
    // Don't silently fall back to [] here: the next write would wipe the damaged file.
    throw new HttpError(500, 'User data file is corrupted');
  }
}

async function writeUsers(users) {
  try {
    const tmp = `${FILE}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(users, null, 2));
    await fs.rename(tmp, FILE); // atomic swap, so a crash can't leave a half-written file
  } catch {
    throw new HttpError(500, 'Could not save user data');
  }
}

// Run read-modify-write cycles one at a time so simultaneous requests can't overwrite each other
let queue = Promise.resolve();
function withLock(fn) {
  const run = queue.then(fn);
  queue = run.catch(() => {});
  return run;
}

module.exports = { readUsers, writeUsers, withLock };