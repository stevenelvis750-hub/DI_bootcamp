const chalk = require("chalk");

function displayColorfulMessage() {
  console.log(chalk.bold.green("Modules make Node.js projects colorful and reusable!"));
}

module.exports = displayColorfulMessage;