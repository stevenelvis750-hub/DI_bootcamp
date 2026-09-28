const axios = require("axios");

async function fetchPostTitles() {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
      timeout: 10000,
    });

    response.data.forEach((post) => console.log(post.title));
  } catch (error) {
    console.error(`Could not fetch posts: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = fetchPostTitles;