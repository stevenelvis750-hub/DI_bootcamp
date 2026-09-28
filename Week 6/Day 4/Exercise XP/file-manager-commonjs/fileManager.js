const fs = require("node:fs/promises");

function readFile(filePath) {
  return fs.readFile(filePath, "utf8");
}

function writeFile(filePath, content) {
  return fs.writeFile(filePath, content, "utf8");
}

module.exports = { readFile, writeFile };