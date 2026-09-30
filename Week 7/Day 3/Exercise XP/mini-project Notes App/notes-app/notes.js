const fs = require('fs');
const path = require('path');

const NOTES_FILE = path.join(__dirname, 'notes.json');

/* ---------- File helpers ---------- */
const loadNotes = () => {
  try {
    const data = JSON.parse(fs.readFileSync(NOTES_FILE, 'utf8'));
    return Array.isArray(data) ? data : [];
  } catch (err) {
    return []; // file missing or empty/corrupt: start with no notes
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
};

/* ---------- Commands ---------- */
const addNote = (title, body) => {
  const notes = loadNotes();

  if (notes.some((note) => note.title === title)) {
    console.log('Note already exists');
    return;
  }

  notes.push({ title, body });
  saveNotes(notes);
  console.log('Note added');
};

const listNotes = () => {
  const notes = loadNotes();

  if (notes.length === 0) {
    console.log('No notes saved yet');
    return;
  }

  console.log(`Your notes (${notes.length}):`);
  notes.forEach((note, i) => console.log(`${i + 1}. ${note.title}`));
};

const readNote = (title) => {
  const note = loadNotes().find((n) => n.title === title);

  if (!note) {
    console.log('Note not found');
    return;
  }

  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

const removeNote = (title) => {
  const notes = loadNotes();
  const remaining = notes.filter((note) => note.title !== title);

  if (remaining.length === notes.length) {
    console.log('Note not found');
    return;
  }

  saveNotes(remaining);
  console.log('Note removed');
};

module.exports = { addNote, listNotes, readNote, removeNote };