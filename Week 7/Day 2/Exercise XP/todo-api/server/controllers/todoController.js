const todoModel = require("../models/todoModel");

function parseId(value) {
  if (!/^\d+$/.test(value)) return null;
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

function getAll(_request, response, next) {
  todoModel.getAll().then((todos) => response.json(todos)).catch(next);
}

function getById(request, response, next) {
  const id = parseId(request.params.id);
  if (!id) return response.status(400).json({ error: "Todo id must be a positive integer." });
  todoModel.getById(id).then((todo) => {
    if (!todo) return response.status(404).json({ error: "Todo not found." });
    response.json(todo);
  }).catch(next);
}

function create(request, response, next) {
  const { title, completed = false } = request.body || {};
  if (typeof title !== "string" || !title.trim()) {
    return response.status(400).json({ error: "A non-empty title is required." });
  }
  if (typeof completed !== "boolean") {
    return response.status(400).json({ error: "completed must be a boolean." });
  }
  todoModel.create({ title: title.trim(), completed }).then((todo) => {
    response.status(201).json(todo);
  }).catch(next);
}

function update(request, response, next) {
  const id = parseId(request.params.id);
  if (!id) return response.status(400).json({ error: "Todo id must be a positive integer." });

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

  const fields = {};
  if (title !== undefined) fields.title = title.trim();
  if (completed !== undefined) fields.completed = completed;
  todoModel.update(id, fields).then((todo) => {
    if (!todo) return response.status(404).json({ error: "Todo not found." });
    response.json(todo);
  }).catch(next);
}

function remove(request, response, next) {
  const id = parseId(request.params.id);
  if (!id) return response.status(400).json({ error: "Todo id must be a positive integer." });
  todoModel.remove(id).then((removed) => {
    if (!removed) return response.status(404).json({ error: "Todo not found." });
    response.status(204).end();
  }).catch(next);
}

module.exports = { getAll, getById, create, update, remove };