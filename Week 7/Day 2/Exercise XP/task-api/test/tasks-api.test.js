const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { once } = require("node:events");
const { test } = require("node:test");

test("tasks API persists CRUD operations and validates requests", async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "task-api-test-"));
  const tasksFile = path.join(directory, "tasks.json");
  await fs.writeFile(tasksFile, "[]\n", "utf8");
  process.env.TASKS_FILE = tasksFile;
  const app = require("../app");
  const server = app.listen(0);
  await once(server, "listening");
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const request = (route, method = "GET", body) => fetch(`${baseUrl}${route}`, {
    method,
    ...(body === undefined ? {} : {
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    }),
  });

  try {
    let response = await request("/tasks", "POST", { title: "  Write tests  " });
    assert.equal(response.status, 201);
    const created = await response.json();
    assert.deepEqual(created, { id: 1, title: "Write tests", completed: false });
    assert.deepEqual(JSON.parse(await fs.readFile(tasksFile, "utf8")), [created]);

    response = await request("/tasks");
    assert.deepEqual(await response.json(), [created]);
    response = await request("/tasks/1");
    assert.deepEqual(await response.json(), created);
    response = await request("/tasks/1", "PUT", { completed: true });
    assert.deepEqual(await response.json(), { ...created, completed: true });
    response = await request("/tasks/not-an-id");
    assert.equal(response.status, 400);
    response = await request("/tasks", "POST", { title: " " });
    assert.equal(response.status, 400);
    response = await request("/tasks/1", "DELETE");
    assert.equal(response.status, 204);
    response = await request("/tasks/1");
    assert.equal(response.status, 404);
  } finally {
    server.close();
    delete process.env.TASKS_FILE;
    delete require.cache[require.resolve("../app")];
    delete require.cache[require.resolve("../server/models/taskStore")];
    await fs.rm(directory, { recursive: true, force: true });
  }
});