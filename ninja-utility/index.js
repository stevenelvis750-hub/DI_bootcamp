#!/usr/bin/env node
const { Command } = require("commander");

const program = new Command();

program
  .name("ninja-utility")
  .description("A small command-line utility")
  .version("1.0.0");

program
  .command("greet [name]")
  .description("Print a colorful greeting")
  .action((name) => require("./commands/greet")(name));

program
  .command("fetch [url]")
  .description("Fetch and display JSON from a URL")
  .action((url) => require("./commands/fetch")(url));

program
  .command("read <file>")
  .description("Read and display a text file")
  .action((filePath) => require("./commands/read")(filePath));

program.parseAsync(process.argv).catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});