const express = require("express");

const app = express();
const port = process.env.PORT || 5000;
const todos = [];
let nextId = 1;

app.use(express.json({ limit: "16kb" }));

function findTodo(id) {
  if (!/^\d+$/.test(id)) return undefined;
  return todos.find((todo) => todo.id === Number(id));
}

app.post("/api/todos", (request, response) => {
  const { title, completed = false } = request.body || {};
  if (typeof title !== "string" || !title.trim()) {
    return response.status(400).json({ error: "A non-empty title is required." });
  }
  if (typeof completed !== "boolean") {
    return response.status(400).json({ error: "completed must be a boolean." });
  }
  const todo = { id: nextId++, title: title.trim(), completed };
  todos.push(todo);
  response.status(201).json(todo);
});

app.get("/api/todos", (_request, response) => {
  response.json(todos);
});

app.get("/api/todos/:id", (request, response) => {
  const todo = findTodo(request.params.id);
  if (!todo) return response.status(404).json({ error: "Todo not found." });
  response.json(todo);
});

app.put("/api/todos/:id", (request, response) => {
  const todo = findTodo(request.params.id);
  if (!todo) return response.status(404).json({ error: "Todo not found." });
  const { title, completed } = request.body || {};
  if (title === undefined && completed === undefined) {
    return response.status(400).json({ error: "Provide a title or completed value to update." });
  }
  if (title !== undefined && (typeof title !== "string" || !title.trim())) {
    return response.status(400).json({ error: "title must be a non-empty string." });
  }
  if (completed !== undefined && typeof completed !== "boolean") {
    return response.status(400).json({ error: "completed must be a boolean." });
  }
  if (title !== undefined) todo.title = title.trim();
  if (completed !== undefined) todo.completed = completed;
  response.json(todo);
});

app.delete("/api/todos/:id", (request, response) => {
  const todoIndex = todos.findIndex((todo) => todo.id === Number(request.params.id));
  if (todoIndex === -1 || !/^\d+$/.test(request.params.id)) {
    return response.status(404).json({ error: "Todo not found." });
  }
  todos.splice(todoIndex, 1);
  response.status(204).end();
});

app.listen(port, () => console.log(`Todo API listening at http://localhost:${port}`));