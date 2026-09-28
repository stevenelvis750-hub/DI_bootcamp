const fs = require("node:fs/promises");

async function listDirectory(directoryPath = __dirname) {
  try {
    const entries = await fs.readdir(directoryPath, { withFileTypes: true });
    for (const entry of entries) {
      console.log(entry.isDirectory() ? `${entry.name}/` : entry.name);
    }
  } catch (error) {
    console.error(`Could not read directory: ${error.message}`);
    process.exitCode = 1;
  }
}

listDirectory(process.argv[2]);