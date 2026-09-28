const axios = require("axios");

async function fetchData(url = "https://jsonplaceholder.typicode.com/posts/1") {
  try {
    const response = await axios.get(url, { timeout: 10000 });
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error(`Fetch failed: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = fetchData;