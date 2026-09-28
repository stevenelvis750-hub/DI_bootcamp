const express = require("express");
const { fetchPosts } = require("./data/dataService");

const app = express();
const port = process.env.PORT || 5000;

app.get("/api/posts", async (_request, response) => {
  try {
    const posts = await fetchPosts();
    console.log("Posts successfully retrieved and sent as a response.");
    response.json(posts);
  } catch (error) {
    console.error(`Could not retrieve posts: ${error.message}`);
    response.status(502).json({ error: "Could not retrieve posts from JSONPlaceholder." });
  }
});

app.use((_request, response) => response.status(404).json({ error: "Route not found." }));

app.listen(port, () => console.log(`Axios posts API listening at http://localhost:${port}`));