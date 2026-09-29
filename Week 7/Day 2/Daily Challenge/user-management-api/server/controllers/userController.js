const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

const saltRounds = 12;
const profileFields = ["email", "username", "first_name", "last_name"];

function parseId(value) {
  if (!/^\d+$/.test(value)) return null;
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

function validateUserBody(body, { registration = false } = {}) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return "A JSON object is required.";
  if (registration && (typeof body.username !== "string" || !body.username.trim())) {
    return "A non-empty username is required.";
  }
  if (registration && (typeof body.password !== "string" || body.password.length < 8 || Buffer.byteLength(body.password) > 72)) {
    return "Password must be at least 8 characters and no more than 72 bytes.";
  }
  if (!registration && profileFields.every((field) => body[field] === undefined) && body.password === undefined) {
    return "Provide at least one user field to update.";
  }
  for (const field of profileFields) {
    if (body[field] !== undefined && (typeof body[field] !== "string" || !body[field].trim())) {
      return `${field} must be a non-empty string.`;
    }
  }
  if (body.email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
    return "email must be a valid email address.";
  }
  if (!registration && body.password !== undefined && (typeof body.password !== "string" || body.password.length < 8 || Buffer.byteLength(body.password) > 72)) {
    return "Password must be at least 8 characters and no more than 72 bytes.";
  }
  return null;
}

async function register(request, response) {
  const validationError = validateUserBody(request.body, { registration: true });
  if (validationError) return response.status(400).json({ error: validationError });

  const user = {
    email: request.body.email ? request.body.email.trim() : null,
    username: request.body.username.trim(),
    first_name: request.body.first_name ? request.body.first_name.trim() : "",
    last_name: request.body.last_name ? request.body.last_name.trim() : "",
    passwordHash: await bcrypt.hash(request.body.password, saltRounds),
  };
  const createdUser = await userModel.create(user);
  response.status(201).json(createdUser);
}

async function login(request, response) {
  const { username, password } = request.body || {};
  if (typeof username !== "string" || !username.trim() || typeof password !== "string" || !password) {
    return response.status(400).json({ error: "Username and password are required." });
  }
  const credentials = await userModel.findCredentialsByUsername(username.trim());
  if (!credentials || !(await bcrypt.compare(password, credentials.password))) {
    return response.status(401).json({ error: "Invalid username or password." });
  }
  const { password: storedHash, ...user } = credentials;
  response.json({ message: "Login successful.", user });
}

async function getAll(_request, response) {
  response.json(await userModel.getAll());
}

async function getById(request, response) {
  const id = parseId(request.params.id);
  if (!id) return response.status(400).json({ error: "User id must be a positive integer." });
  const user = await userModel.getById(id);
  if (!user) return response.status(404).json({ error: "User not found." });
  response.json(user);
}

async function update(request, response) {
  const id = parseId(request.params.id);
  if (!id) return response.status(400).json({ error: "User id must be a positive integer." });
  const validationError = validateUserBody(request.body);
  if (validationError) return response.status(400).json({ error: validationError });

  const fields = {};
  for (const field of profileFields) {
    if (request.body[field] !== undefined) {
      fields[field] = field === "email" ? request.body[field].trim() : request.body[field].trim();
    }
  }
  if (fields.email === "") fields.email = null;
  if (request.body.password !== undefined) {
    fields.passwordHash = await bcrypt.hash(request.body.password, saltRounds);
  }
  const user = await userModel.update(id, fields);
  if (!user) return response.status(404).json({ error: "User not found." });
  response.json(user);
}

module.exports = { register, login, getAll, getById, update };