const chalk = require("chalk");

function greet(name = "there") {
  console.log(chalk.bold.cyan(`Hello, ${name}! Welcome to Ninja Utility.`));
}

module.exports = greet;