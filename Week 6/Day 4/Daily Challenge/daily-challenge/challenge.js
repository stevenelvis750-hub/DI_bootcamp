const { greet } = require("./greeting/greeting");
const displayColorfulMessage = require("./color-message/colorful-message");
const readFile = require("./file-operations/read-file");

async function runChallenge() {
  console.log(greet("Alex"));
  displayColorfulMessage();
  console.log(await readFile());
}

runChallenge().catch((error) => {
  console.error(`Challenge failed: ${error.message}`);
  process.exitCode = 1;
});