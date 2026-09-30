const fs = require("node:fs/promises");
const path = require("node:path");

const tasksFile = process.env.TASKS_FILE || path.join(__dirname, "../../tasks.json");
let operationQueue = Promise.resolve();

function serialize(operation) {
  const result = operationQueue.then(operation);
  operationQueue = result.catch(() => undefined);
  return result;
}

async function readTasks() {
  let contents;
  try {
    contents = await fs.readFile(tasksFile, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    await fs.writeFile(tasksFile, "[]\n", { flag: "wx" }).catch((writeError) => {
      if (writeError.code !== "EEXIST") throw writeError;
    });
    contents = await fs.readFile(tasksFile, "utf8");
  }

  let tasks;
  try {
    tasks = JSON.parse(contents);
  } catch (error) {
    throw new Error("The task data file contains invalid JSON.", { cause: error });
  }
  if (!Array.isArray(tasks)) {
    throw new Error("The task data file must contain a JSON array.");
  }
  return tasks;
}

async function writeTasks(tasks) {
  const temporaryFile = `${tasksFile}.tmp`;
  await fs.writeFile(temporaryFile, `${JSON.stringify(tasks, null, 2)}\n`, "utf8");
  await fs.rename(temporaryFile, tasksFile);
}

function getAll() {
  return serialize(readTasks);
}

function getById(id) {
  return serialize(async () => (await readTasks()).find((task) => task.id === id));
}

function create({ title, completed }) {
  return serialize(async () => {
    const tasks = await readTasks();
    const nextId = tasks.reduce((highest, task) => Math.max(highest, task.id), 0) + 1;
    const task = { id: nextId, title, completed };
    tasks.push(task);
    await writeTasks(tasks);
    return task;
  });
}

function update(id, fields) {
  return serialize(async () => {
    const tasks = await readTasks();
    const task = tasks.find((item) => item.id === id);
    if (!task) return undefined;
    Object.assign(task, fields);
    await writeTasks(tasks);
    return task;
  });
}

function remove(id) {
  return serialize(async () => {
    const tasks = await readTasks();
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    await writeTasks(tasks);
    return true;
  });
}

module.exports = { getAll, getById, create, update, remove };