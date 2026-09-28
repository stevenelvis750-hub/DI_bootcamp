const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const posts = [
  { id: 1, title: "Starting with Node.js", content: "A first post in the in-memory blog." },
  { id: 2, title: "Building APIs", content: "Small routes make a useful REST API." },
];
let nextId = Math.max(...posts.map((post) => post.id)) + 1;

app.use(express.json({ limit: "32kb" }));

function findPost(id) {
  if (!/^\d+$/.test(id)) return undefined;
  return posts.find((post) => post.id === Number(id));
}

app.get("/posts", (_request, response) => response.json(posts));

app.get("/posts/:id", (request, response) => {
  const post = findPost(request.params.id);
  if (!post) return response.status(404).json({ error: "Post not found." });
  response.json(post);
});

app.post("/posts", (request, response) => {
  const { title, content } = request.body || {};
  if (typeof title !== "string" || !title.trim() || typeof content !== "string" || !content.trim()) {
    return response.status(400).json({ error: "A non-empty title and content are required." });
  }
  const post = { id: nextId++, title: title.trim(), content: content.trim() };
  posts.push(post);
  response.status(201).json(post);
});

app.put("/posts/:id", (request, response) => {
  const post = findPost(request.params.id);
  if (!post) return response.status(404).json({ error: "Post not found." });
  const { title, content } = request.body || {};
  if (title === undefined && content === undefined) {
    return response.status(400).json({ error: "Provide a title or content to update." });
  }
  if (title !== undefined && (typeof title !== "string" || !title.trim())) {
    return response.status(400).json({ error: "title must be a non-empty string." });
  }
  if (content !== undefined && (typeof content !== "string" || !content.trim())) {
    return response.status(400).json({ error: "content must be a non-empty string." });
  }
  if (title !== undefined) post.title = title.trim();
  if (content !== undefined) post.content = content.trim();
  response.json(post);
});

app.delete("/posts/:id", (request, response) => {
  const index = posts.findIndex((post) => post.id === Number(request.params.id));
  if (index === -1 || !/^\d+$/.test(request.params.id)) {
    return response.status(404).json({ error: "Post not found." });
  }
  posts.splice(index, 1);
  response.status(204).end();
});

app.use((_request, response) => response.status(404).json({ error: "Route not found." }));

app.use((error, _request, response, _next) => {
  if (error instanceof SyntaxError && "body" in error) {
    return response.status(400).json({ error: "Request body must contain valid JSON." });
  }
  console.error(error);
  response.status(500).json({ error: "Internal server error." });
});

app.listen(port, () => console.log(`Blog API listening at http://localhost:${port}`));