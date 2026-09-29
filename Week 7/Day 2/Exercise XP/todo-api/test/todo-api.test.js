const assert = require("node:assert/strict");
const { once } = require("node:events");
const { test } = require("node:test");
const todoModel = require("../server/models/todoModel");

const originalMethods = { ...todoModel };
const todos = [];
let nextId = 1;

todoModel.getAll = async () => todos.map((todo) => ({ ...todo }));
todoModel.getById = async (id) => {
  const todo = todos.find((item) => item.id === id);
  return todo ? { ...todo } : undefined;
};
todoModel.create = async ({ title, completed }) => {
  const todo = { id: nextId++, title, completed };
  todos.push(todo);
  return { ...todo };
};
todoModel.update = async (id, fields) => {
  const todo = todos.find((item) => item.id === id);
  if (!todo) return undefined;
  Object.assign(todo, fields);
  return { ...todo };
};
todoModel.remove = async (id) => {
  const index = todos.findIndex((item) => item.id === id);
  if (index === -1) return false;
  todos.splice(index, 1);
  return true;
};

const app = require("../app");

test("todo API supports CRUD and rejects invalid input", async () => {
  const server = app.listen(0);
  await once(server, "listening");
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const request = (path, method = "GET", body) => fetch(`${baseUrl}${path}`, {
    method,
    ...(body === undefined ? {} : {
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    }),
  });

  try {
    let response = await request("/api/todos", "POST", { title: "  Buy milk  " });
    assert.equal(response.status, 201);
    const created = await response.json();
    assert.deepEqual(created, { id: 1, title: "Buy milk", completed: false });

    response = await request("/api/todos");
    assert.deepEqual(await response.json(), [created]);
    response = await request("/api/todos/1");
    assert.deepEqual(await response.json(), created);

    response = await request("/api/todos/1", "PUT", { completed: true });
    assert.deepEqual(await response.json(), { ...created, completed: true });
    response = await request("/api/todos/invalid");
    assert.equal(response.status, 400);
    response = await request("/api/todos", "POST", { title: " " });
    assert.equal(response.status, 400);
    response = await request("/api/todos/1", "DELETE");
    assert.equal(response.status, 204);
    response = await request("/api/todos/1");
    assert.equal(response.status, 404);
  } finally {
    Object.assign(todoModel, originalMethods);
    server.close();
  }
});