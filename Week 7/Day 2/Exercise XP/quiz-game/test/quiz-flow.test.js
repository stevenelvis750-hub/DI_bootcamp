const assert = require("node:assert/strict");
const { once } = require("node:events");
const { test } = require("node:test");
const quizModel = require("../server/models/quizModel");

const originalGetQuestions = quizModel.getQuestions;
quizModel.getQuestions = async () => [
  {
    id: 1,
    category: "TEST",
    question: "Which answer is correct?",
    correctAnswerId: 11,
    explanation: "Option A is correct.",
    options: [{ id: 11, label: "Option A" }, { id: 12, label: "Option B" }],
  },
  {
    id: 2,
    category: "TEST",
    question: "Second question?",
    correctAnswerId: 21,
    explanation: "Option C is correct.",
    options: [{ id: 21, label: "Option C" }, { id: 22, label: "Option D" }],
  },
];

const app = require("../app");

test("quiz starts, grades answers, advances, and returns the final score", async () => {
  const server = app.listen(0);
  await once(server, "listening");
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const post = (path, body) => fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  try {
    let response = await post("/api/quiz/start", {});
    assert.equal(response.status, 201);
    const started = await response.json();
    assert.equal(started.question.number, 1);
    assert.equal("correctAnswerId" in started.question, false);

    response = await post("/api/quiz/answer", { sessionId: started.sessionId, optionId: 12 });
    const firstAnswer = await response.json();
    assert.equal(firstAnswer.correct, false);
    assert.equal(firstAnswer.score, 0);
    assert.equal(firstAnswer.correctAnswer, "Option A");

    response = await post("/api/quiz/next", { sessionId: started.sessionId });
    const secondQuestion = await response.json();
    assert.equal(secondQuestion.question.number, 2);

    response = await post("/api/quiz/answer", { sessionId: started.sessionId, optionId: 21 });
    assert.equal((await response.json()).score, 1);

    response = await post("/api/quiz/next", { sessionId: started.sessionId });
    assert.deepEqual(await response.json(), { finished: true, score: 1, total: 2 });
  } finally {
    quizModel.getQuestions = originalGetQuestions;
    server.close();
  }
});