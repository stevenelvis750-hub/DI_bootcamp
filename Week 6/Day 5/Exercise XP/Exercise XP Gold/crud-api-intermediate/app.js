const express = require("express");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 5000;
const postsApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
});

app.use(express.json({ limit: "32kb" }));

function forwardApiError(error, response) {
  const status = error.response?.status || 502;
  response.status(status).json({
    error: error.response ? "The posts service returned an error." : "The posts service is unavailable.",
  });
}

app.get("/api/posts", async (_request, response) => {
  try {
    const result = await postsApi.get("/posts");
    response.json(result.data);
  } catch (error) {
    forwardApiError(error, response);
  }
});

app.get("/api/posts/:id", async (request, response) => {
  if (!/^\d+$/.test(request.params.id) || Number(request.params.id) < 1) {
    return response.status(400).json({ error: "Post id must be a positive integer." });
  }
  try {
    const result = await postsApi.get(`/posts/${request.params.id}`);
    if (!result.data.id) return response.status(404).json({ error: "Post not found." });
    response.json(result.data);
  } catch (error) {
    forwardApiError(error, response);
  }
});

app.post("/api/posts", async (request, response) => {
  const { title, body, userId } = request.body || {};
  if (typeof title !== "string" || !title.trim() || typeof body !== "string" || !body.trim()) {
    return response.status(400).json({ error: "A non-empty title and body are required." });
  }
  if (userId !== undefined && (!Number.isInteger(userId) || userId < 1)) {
    return response.status(400).json({ error: "userId must be a positive integer." });
  }
  try {
    const result = await postsApi.post("/posts", {
      title: title.trim(), body: body.trim(), userId: userId || 1,
    });
    response.status(201).json(result.data);
  } catch (error) {
    forwardApiError(error, response);
  }
});

app.put("/api/posts/:id", async (request, response) => {
  if (!/^\d+$/.test(request.params.id) || Number(request.params.id) < 1) {
    return response.status(400).json({ error: "Post id must be a positive integer." });
  }
  const { title, body, userId } = request.body || {};
  if (typeof title !== "string" || !title.trim() || typeof body !== "string" || !body.trim()) {
    return response.status(400).json({ error: "A non-empty title and body are required." });
  }
  if (userId !== undefined && (!Number.isInteger(userId) || userId < 1)) {
    return response.status(400).json({ error: "userId must be a positive integer." });
  }
  try {
    const result = await postsApi.put(`/posts/${request.params.id}`, {
      id: Number(request.params.id), title: title.trim(), body: body.trim(), userId: userId || 1,
    });
    response.json(result.data);
  } catch (error) {
    forwardApiError(error, response);
  }
});

app.delete("/api/posts/:id", async (request, response) => {
  if (!/^\d+$/.test(request.params.id) || Number(request.params.id) < 1) {
    return response.status(400).json({ error: "Post id must be a positive integer." });
  }
  try {
    await postsApi.delete(`/posts/${request.params.id}`);
    response.status(204).end();
  } catch (error) {
    forwardApiError(error, response);
  }
});

app.listen(port, () => console.log(`CRUD API listening at http://localhost:${port}`));