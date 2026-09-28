const crypto = require("node:crypto");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET || crypto.randomBytes(32).toString("hex");
const usersByEmail = new Map();
const loginAttempts = new Map();
const passwordRounds = 12;
const maximumFailures = 5;
const lockDurationMs = 15 * 60 * 1000;

app.use(express.json({ limit: "16kb" }));

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function isStrongPassword(password) {
  return typeof password === "string"
    && password.length >= 8
    && /[a-z]/.test(password)
    && /[A-Z]/.test(password)
    && /\d/.test(password)
    && /[^a-zA-Z0-9]/.test(password);
}

function authenticate(request, response, next) {
  const authorization = request.get("authorization") || "";
  const [scheme, token] = authorization.split(" ");
  if (scheme !== "Bearer" || !token) {
    return response.status(401).json({ error: "Provide a Bearer token to access this profile." });
  }

  try {
    request.auth = jwt.verify(token, jwtSecret, { algorithms: ["HS256"] });
    next();
  } catch {
    response.status(401).json({ error: "Token is invalid or expired." });
  }
}

app.post("/api/register", async (request, response) => {
  const { name, email, password } = request.body || {};
  if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return response.status(400).json({ error: "A name and valid email address are required." });
  }
  if (!isStrongPassword(password)) {
    return response.status(400).json({
      error: "Password must be at least 8 characters and include uppercase, lowercase, a number, and a symbol.",
    });
  }

  const normalizedEmail = normalizeEmail(email);
  if (usersByEmail.has(normalizedEmail)) {
    return response.status(409).json({ error: "An account with that email already exists." });
  }

  try {
    const passwordHash = await bcrypt.hash(password, passwordRounds);
    const user = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      role: "user",
    };
    usersByEmail.set(normalizedEmail, user);
    response.status(201).json({
      message: "Account created.",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch {
    response.status(500).json({ error: "Could not create the account." });
  }
});

app.post("/api/login", async (request, response) => {
  const { email, password } = request.body || {};
  if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
    return response.status(400).json({ error: "Email and password are required." });
  }

  const normalizedEmail = normalizeEmail(email);
  const attempt = loginAttempts.get(normalizedEmail);
  if (attempt?.lockedUntil > Date.now()) {
    const retryAfterSeconds = Math.ceil((attempt.lockedUntil - Date.now()) / 1000);
    response.set("Retry-After", String(retryAfterSeconds));
    return response.status(429).json({ error: "Too many failed attempts. Try again later." });
  }
  if (attempt?.lockedUntil && attempt.lockedUntil <= Date.now()) {
    loginAttempts.delete(normalizedEmail);
  }

  const user = usersByEmail.get(normalizedEmail);
  const passwordMatches = user ? await bcrypt.compare(password, user.passwordHash) : false;
  if (!passwordMatches) {
    const failedAttempts = (loginAttempts.get(normalizedEmail)?.failedAttempts || 0) + 1;
    const lockedUntil = failedAttempts >= maximumFailures ? Date.now() + lockDurationMs : null;
    loginAttempts.set(normalizedEmail, { failedAttempts, lockedUntil });
    if (lockedUntil) {
      response.set("Retry-After", String(Math.ceil(lockDurationMs / 1000)));
      return response.status(429).json({ error: "Too many failed attempts. Account locked for 15 minutes." });
    }
    return response.status(401).json({ error: "Email or password is incorrect." });
  }

  loginAttempts.delete(normalizedEmail);
  const token = jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    jwtSecret,
    { algorithm: "HS256", expiresIn: "1h" },
  );
  response.json({ token, tokenType: "Bearer", expiresIn: 3600 });
});

app.get("/api/profile", authenticate, (request, response) => {
  const user = usersByEmail.get(request.auth.email);
  if (!user || user.id !== request.auth.sub) {
    return response.status(401).json({ error: "The account for this token no longer exists." });
  }
  response.json({ id: user.id, name: user.name, email: user.email, role: user.role });
});

app.listen(port, () => console.log(`User login API listening at http://localhost:${port}`));