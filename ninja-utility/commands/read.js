const fs = require("node:fs/promises");

async function readFile(filePath) {
  try {
    const contents = await fs.readFile(filePath, "utf8");
    process.stdout.write(contents.endsWith("\n") ? contents : `${contents}\n`);
  } catch (error) {
    console.error(`Could not read "${filePath}": ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = readFile;