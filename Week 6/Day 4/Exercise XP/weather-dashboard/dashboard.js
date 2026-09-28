const readline = require("node:readline/promises");
const chalk = require("chalk");
const showWeather = require("./weather");

async function startDashboard() {
  const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const city = await terminal.question("Enter a city name: ");
    await showWeather(city);
  } catch (error) {
    console.error(chalk.red(`Weather lookup failed: ${error.message}`));
    process.exitCode = 1;
  } finally {
    terminal.close();
  }
}

module.exports = startDashboard;