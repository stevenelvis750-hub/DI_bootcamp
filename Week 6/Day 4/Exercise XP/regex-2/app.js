const readline = require("node:readline/promises");
const isValidFullName = require("./validate-name");

async function main() {
  const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const fullName = await terminal.question("Enter your full name: ");
    console.log(isValidFullName(fullName) ? "Valid full name." : "Invalid full name.");
  } finally {
    terminal.close();
  }
}

main();