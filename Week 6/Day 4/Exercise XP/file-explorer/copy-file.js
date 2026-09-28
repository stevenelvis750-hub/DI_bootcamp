const fs = require("node:fs/promises");
const path = require("node:path");

async function copySourceFile() {
  const sourcePath = path.join(__dirname, "source.txt");
  const destinationPath = path.join(__dirname, "destination.txt");
  const content = await fs.readFile(sourcePath, "utf8");

  await fs.writeFile(destinationPath, content, "utf8");
  console.log(`Copied ${path.basename(sourcePath)} to ${path.basename(destinationPath)}.`);
}

copySourceFile().catch((error) => {
  console.error(`Could not copy file: ${error.message}`);
  process.exitCode = 1;
});