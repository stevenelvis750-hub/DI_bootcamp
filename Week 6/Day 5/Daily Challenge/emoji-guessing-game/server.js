const crypto = require("node:crypto");
const path = require("node:path");
const express = require("express");

const app = express();
const port = process.env.PORT || 3005;
const roundCount = 10;
const emojis = [
  { emoji: "😀", name: "Smile" },
  { emoji: "🐶", name: "Dog" },
  { emoji: "🌮", name: "Taco" },
  { emoji: "🍉", name: "Watermelon" },
  { emoji: "🦋", name: "Butterfly" },
  { emoji: "🚀", name: "Rocket" },
  { emoji: "🎸", name: "Guitar" },
  { emoji: "🧁", name: "Cupcake" },
  { emoji: "🐙", name: "Octopus" },
  { emoji: "🌈", name: "Rainbow" },
  { emoji: "🦉", name: "Owl" },
  { emoji: "🍕", name: "Pizza" },
  { emoji: "⚽", name: "Soccer ball" },
  { emoji: "🌻", name: "Sunflower" },
  { emoji: "🐢", name: "Turtle" },
  { emoji: "🎈", name: "Balloon" },
  { emoji: "🧊", name: "Ice cube" },
  { emoji: "🍄", name: "Mushroom" },
];
const sessions = new Map();
const leaderboard = [];

app.use(express.json({ limit: "16kb" }));
app.use(express.static(path.join(__dirname, "public")));

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function makeQuestion(session) {
  const answer = session.questions[session.currentIndex];
  const distractors = shuffle(emojis.filter((item) => item.name !== answer.name)).slice(0, 3);
  session.currentQuestionId = crypto.randomUUID();
  return {
    id: session.currentQuestionId,
    emoji: answer.emoji,
    options: shuffle([answer, ...distractors]).map((item) => item.name),
    round: session.currentIndex + 1,
    total: session.questions.length,
  };
}

app.post("/api/start", (_request, response) => {
  const sessionId = crypto.randomUUID();
  const session = {
    questions: shuffle(emojis).slice(0, roundCount),
    currentIndex: 0,
    currentQuestionId: null,
    score: 0,
    answered: false,
    finished: false,
    scoreSaved: false,
  };
  sessions.set(sessionId, session);
  response.status(201).json({ sessionId, question: makeQuestion(session) });
});

app.post("/api/guess", (request, response) => {
  const { sessionId, questionId, guess } = request.body || {};
  const session = sessions.get(sessionId);
  if (!session || session.finished || session.answered) {
    return response.status(400).json({ error: "This game session cannot accept a guess." });
  }
  if (questionId !== session.currentQuestionId) {
    return response.status(400).json({ error: "That emoji is not the current question." });
  }
  if (typeof guess !== "string") {
    return response.status(400).json({ error: "Select one of the listed answers." });
  }

  const answer = session.questions[session.currentIndex];
  const correct = guess === answer.name;
  session.answered = true;
  if (correct) session.score += 1;
  response.json({
    correct,
    answer: answer.name,
    score: session.score,
    round: session.currentIndex + 1,
    total: session.questions.length,
    finalRound: session.currentIndex === session.questions.length - 1,
  });
});

app.post("/api/next", (request, response) => {
  const { sessionId } = request.body || {};
  const session = sessions.get(sessionId);
  if (!session || session.finished || !session.answered) {
    return response.status(400).json({ error: "Submit a guess before moving to the next emoji." });
  }
  if (session.currentIndex === session.questions.length - 1) {
    session.finished = true;
    return response.json({ finished: true, score: session.score, total: session.questions.length });
  }
  session.currentIndex += 1;
  session.answered = false;
  response.json({ finished: false, question: makeQuestion(session) });
});

app.get("/api/leaderboard", (_request, response) => {
  response.json(leaderboard.slice(0, 5));
});

app.post("/api/leaderboard", (request, response) => {
  const { sessionId, name } = request.body || {};
  const session = sessions.get(sessionId);
  if (!session || !session.finished) {
    return response.status(400).json({ error: "Finish a game before saving a score." });
  }
  if (session.scoreSaved) {
    return response.status(409).json({ error: "This game score has already been saved." });
  }
  if (typeof name !== "string" || !name.trim()) {
    return response.status(400).json({ error: "Enter a name for the leaderboard." });
  }

  const entry = {
    name: name.trim().slice(0, 18),
    score: session.score,
    total: session.questions.length,
    savedAt: Date.now(),
  };
  session.scoreSaved = true;
  leaderboard.push(entry);
  leaderboard.sort((first, second) => second.score - first.score || first.savedAt - second.savedAt);
  leaderboard.splice(5);
  response.status(201).json(entry);
});

app.use((_request, response) => response.status(404).json({ error: "Route not found." }));

app.use((error, _request, response, _next) => {
  if (error instanceof SyntaxError && "body" in error) {
    return response.status(400).json({ error: "Request body must contain valid JSON." });
  }
  console.error(error);
  response.status(500).json({ error: "Internal server error." });
});

app.listen(port, () => console.log(`Emoji Guess is running at http://localhost:${port}`));