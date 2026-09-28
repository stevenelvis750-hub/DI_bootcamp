const path = require("node:path");
const { readFile, writeFile } = require("./fileManager");

async function main() {
  const helloPath = path.join(__dirname, "Hello World.txt");
  const byePath = path.join(__dirname, "Bye World.txt");
  const helloContent = await readFile(helloPath);

  console.log(`Read from Hello World.txt: ${helloContent.trimEnd()}`);
  await writeFile(byePath, "Writing to the file");
  console.log("Updated Bye World.txt.");
}

main().catch((error) => {
  console.error(`File operation failed: ${error.message}`);
  process.exitCode = 1;
});