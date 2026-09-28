const fs = require("node:fs/promises");
const path = require("node:path");

function readFile() {
  const filePath = path.join(__dirname, "files", "file-data.txt");
  return fs.readFile(filePath, "utf8");
}

module.exports = readFile;