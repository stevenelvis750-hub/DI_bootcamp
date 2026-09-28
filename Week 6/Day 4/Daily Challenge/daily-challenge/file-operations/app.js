const readFile = require("./read-file");

readFile()
  .then((content) => console.log(content))
  .catch((error) => {
    console.error(`Could not read file: ${error.message}`);
    process.exitCode = 1;
  });