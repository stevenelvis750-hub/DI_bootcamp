const crypto = require("node:crypto");
const path = require("node:path");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const questionTimeLimit = 20;
const questions = [
  {
    id: "express-routing",
    category: "Express",
    difficulty: "01 / 06",
    prompt: "Which method handles an HTTP GET request in Express?",
    choices: ["app.fetch()", "app.get()", "app.routeGet()", "app.request()"],
    answer: 1,
    explanation: "app.get() registers a route handler for HTTP GET requests.",
  },
  {
    id: "node-modules",
    category: "Node.js",
    difficulty: "02 / 06",
    prompt: "Which built-in module helps create and work with file paths?",
    choices: ["http", "events", "path", "stream"],
    answer: 2,
    explanation: "The path module provides utilities for safely working with file and directory paths.",
  },
  {
    id: "middleware-order",
    category: "Express",
    difficulty: "03 / 06",
    prompt: "When should Express middleware usually be registered?",
    choices: ["Before the routes that use it", "After app.listen()", "Only inside package.json", "After every response"],
    answer: 0,
    explanation: "Express runs middleware in registration order, so it should come before routes that depend on it.",
  },
  {
    id: "status-code",
    category: "HTTP",
    difficulty: "04 / 06",
    prompt: "Which status code means a resource was successfully created?",
    choices: ["200", "201", "301", "404"],
    answer: 1,
    explanation: "HTTP 201 Created indicates that a request successfully created a resource.",
  },
  {
    id: "json-response",
    category: "Express",
    difficulty: "05 / 06",
    prompt: "Which Express response method sends JSON?",
    choices: ["res.json()", "res.object()", "res.writeJSON()", "res.sendFile()"],
    answer: 0,
    explanation: "res.json() serializes a value as JSON and sends it with the correct content type.",
  },
  {
    id: "environment",
    category: "Node.js",
    difficulty: "06 / 06",
    prompt: "How do you access the PORT environment variable in Node.js?",
    choices: ["process.PORT", "node.env.PORT", "process.env.PORT", "env.process.PORT"],
    answer: 2,
    explanation: "Node exposes environment variables through process.env.",
  },
];
const sessions = new Map();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function publicQuestion(index) {
  const { id, category, difficulty, prompt, choices } = questions[index];
  return { id, category, difficulty, prompt, choices, total: questions.length };
}

app.post("/api/start", (request, response) => {
  const sessionId = crypto.randomUUID();
  sessions.set(sessionId, {
    currentIndex: 0,
    score: 0,
    answered: false,
    finished: false,
  });

  response.json({
    sessionId,
    timeLimit: questionTimeLimit,
    question: publicQuestion(0),
  });
});

app.post("/api/answer", (request, response) => {
  const { sessionId, questionId, choiceIndex } = request.body || {};
  const session = sessions.get(sessionId);

  if (!session || session.finished || session.answered) {
    return response.status(400).json({ error: "This quiz session cannot accept an answer." });
  }

  const question = questions[session.currentIndex];
  if (questionId !== question.id) {
    return response.status(400).json({ error: "That question is not currently active." });
  }

  const timedOut = choiceIndex === null;
  if (!timedOut && (!Number.isInteger(choiceIndex) || choiceIndex < 0 || choiceIndex >= question.choices.length)) {
    return response.status(400).json({ error: "Choose one of the available answers." });
  }

  const correct = !timedOut && choiceIndex === question.answer;
  if (correct) {
    session.score += 1;
  }
  session.answered = true;

  response.json({
    correct,
    timedOut,
    correctIndex: question.answer,
    explanation: question.explanation,
    score: session.score,
    total: questions.length,
    isLastQuestion: session.currentIndex === questions.length - 1,
  });
});

app.post("/api/next", (request, response) => {
  const { sessionId } = request.body || {};
  const session = sessions.get(sessionId);

  if (!session || session.finished || !session.answered) {
    return response.status(400).json({ error: "Answer the current question before continuing." });
  }

  if (session.currentIndex === questions.length - 1) {
    session.finished = true;
    return response.json({ finished: true, score: session.score, total: questions.length });
  }

  session.currentIndex += 1;
  session.answered = false;
  response.json({
    finished: false,
    question: publicQuestion(session.currentIndex),
    timeLimit: questionTimeLimit,
  });
});

app.listen(port, () => {
  console.log(`Quiz game is running at http://localhost:${port}`);
});