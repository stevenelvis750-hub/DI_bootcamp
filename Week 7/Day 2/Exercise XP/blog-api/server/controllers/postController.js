const postModel = require("../models/postModel");

function parseId(value) {
  if (!/^\d+$/.test(value)) return null;
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

function validatePostFields(body, { requireBoth = false } = {}) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return "A JSON object is required.";
  const fields = ["title", "content"];
  if (requireBoth && fields.some((field) => body[field] === undefined)) {
    return "Both title and content are required.";
  }
  if (!requireBoth && fields.every((field) => body[field] === undefined)) {
    return "Provide a title or content to update.";
  }
  for (const field of fields) {
    if (body[field] !== undefined && (typeof body[field] !== "string" || !body[field].trim())) {
      return `${field} must be a non-empty string.`;
    }
  }
  return null;
}

async function getAll(_request, response, next) {
  try {
    response.json(await postModel.getAll());
  } catch (error) {
    next(error);
  }
}

async function getById(request, response, next) {
  const id = parseId(request.params.id);
  if (!id) return response.status(400).json({ error: "Post id must be a positive integer." });
  try {
    const post = await postModel.getById(id);
    if (!post) return response.status(404).json({ error: "Post not found." });
    response.json(post);
  } catch (error) {
    next(error);
  }
}

async function create(request, response, next) {
  const validationError = validatePostFields(request.body, { requireBoth: true });
  if (validationError) return response.status(400).json({ error: validationError });
  try {
    const post = await postModel.create({
      title: request.body.title.trim(),
      content: request.body.content.trim(),
    });
    response.status(201).json(post);
  } catch (error) {
    next(error);
  }
}

async function update(request, response, next) {
  const id = parseId(request.params.id);
  if (!id) return response.status(400).json({ error: "Post id must be a positive integer." });
  const validationError = validatePostFields(request.body);
  if (validationError) return response.status(400).json({ error: validationError });
  const fields = {};
  for (const field of ["title", "content"]) {
    if (request.body[field] !== undefined) fields[field] = request.body[field].trim();
  }
  try {
    const post = await postModel.update(id, fields);
    if (!post) return response.status(404).json({ error: "Post not found." });
    response.json(post);
  } catch (error) {
    next(error);
  }
}

async function remove(request, response, next) {
  const id = parseId(request.params.id);
  if (!id) return response.status(400).json({ error: "Post id must be a positive integer." });
  try {
    const removed = await postModel.remove(id);
    if (!removed) return response.status(404).json({ error: "Post not found." });
    response.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = { getAll, getById, create, update, remove };