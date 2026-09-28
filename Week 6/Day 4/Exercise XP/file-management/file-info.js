const fs = require("node:fs");
const path = require("node:path");

function displayFileInfo() {
  const filePath = path.join(__dirname, "data", "example.txt");

  if (!fs.existsSync(filePath)) {
    console.log(`File exists: no (${filePath})`);
    return;
  }

  const stats = fs.statSync(filePath);
  console.log(`File exists: yes (${filePath})`);
  console.log(`Size: ${stats.size} bytes`);
  console.log(`Created: ${stats.birthtime.toLocaleString()}`);
}

module.exports = displayFileInfo;