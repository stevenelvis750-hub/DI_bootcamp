const _ = require('lodash');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const notes = require('./notes');

// Parse the command line. .string() stops yargs turning --title=123 into a number.
const argv = yargs(hideBin(process.argv)).string(['title', 'body']).help(false).version(false).argv;

// The first bare word after "node app" is the command (add, list, read, remove)
const command = _.first(argv._);

const hasText = (value) => typeof value === 'string' && value.trim() !== '';

if (command === 'add') {
  if (!hasText(argv.title) || !hasText(argv.body)) {
    console.log('Usage: node app add --title="Note Title" --body="Note\'s body"');
  } else {
    notes.addNote(argv.title, argv.body);
  }
} else if (command === 'list') {
  notes.listNotes();
} else if (command === 'read') {
  if (!hasText(argv.title)) console.log('Usage: node app read --title="Note Title"');
  else notes.readNote(argv.title);
} else if (command === 'remove') {
  if (!hasText(argv.title)) console.log('Usage: node app remove --title="Note Title"');
  else notes.removeNote(argv.title);
} else {
  console.log('command not recognized');
}