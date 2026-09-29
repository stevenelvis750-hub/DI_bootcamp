const bookModel = require("../models/bookModel");

function parseId(value) {
  if (!/^\d+$/.test(value)) return null;
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

function validateFields(body, { requireAll = false } = {}) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return "A JSON object is required.";
  const fields = ["title", "author", "publishedYear"];
  if (requireAll && fields.some((field) => body[field] === undefined)) {
    return "title, author, and publishedYear are required.";
  }
  if (!requireAll && fields.every((field) => body[field] === undefined)) {
    return "Provide at least one book field to update.";
  }
  for (const field of ["title", "author"]) {
    if (body[field] !== undefined && (typeof body[field] !== "string" || !body[field].trim())) {
      return `${field} must be a non-empty string.`;
    }
  }
  if (body.publishedYear !== undefined && (!Number.isInteger(body.publishedYear) || body.publishedYear < 0 || body.publishedYear > new Date().getFullYear())) {
    return "publishedYear must be a valid year.";
  }
  return null;
}

function getAll(_request, response) {
  response.json(bookModel.getAll());
}

function getById(request, response) {
  const id = parseId(request.params.bookId);
  if (!id) return response.status(400).json({ message: "Book id must be a positive integer." });
  const book = bookModel.getById(id);
  if (!book) return response.status(404).json({ message: "Book not found" });
  response.status(200).json(book);
}

function create(request, response) {
  const validationError = validateFields(request.body, { requireAll: true });
  if (validationError) return response.status(400).json({ message: validationError });
  const book = bookModel.create({
    title: request.body.title.trim(),
    author: request.body.author.trim(),
    publishedYear: request.body.publishedYear,
  });
  response.status(201).json(book);
}

function update(request, response) {
  const id = parseId(request.params.bookId);
  if (!id) return response.status(400).json({ message: "Book id must be a positive integer." });
  const validationError = validateFields(request.body);
  if (validationError) return response.status(400).json({ message: validationError });
  const fields = {};
  for (const field of ["title", "author", "publishedYear"]) {
    if (request.body[field] !== undefined) {
      fields[field] = typeof request.body[field] === "string" ? request.body[field].trim() : request.body[field];
    }
  }
  const book = bookModel.update(id, fields);
  if (!book) return response.status(404).json({ message: "Book not found" });
  response.json(book);
}

function remove(request, response) {
  const id = parseId(request.params.bookId);
  if (!id) return response.status(400).json({ message: "Book id must be a positive integer." });
  if (!bookModel.remove(id)) return response.status(404).json({ message: "Book not found" });
  response.status(204).end();
}

module.exports = { getAll, getById, create, update, remove };