const { randomUUID } = require("node:crypto");
const quizModel = require("../models/quizModel");

const sessions = new Map();

function publicQuestion(question, index, total) {
  return {
    id: question.id,
    category: question.category,
    question: question.question,
    options: question.options,
    number: index + 1,
    total,
  };
}

async function start(_request, response) {
  const questions = await quizModel.getQuestions();
  if (questions.length === 0) {
    return response.status(503).json({ error: "No quiz questions are available." });
  }
  const sessionId = randomUUID();
  const session = { questions, index: 0, score: 0, answered: false, finished: false };
  sessions.set(sessionId, session);
  response.status(201).json({
    sessionId,
    question: publicQuestion(questions[0], 0, questions.length),
  });
}

function answer(request, response) {
  const { sessionId, optionId } = request.body || {};
  const session = sessions.get(sessionId);
  if (!session || session.finished || session.answered) {
    return response.status(400).json({ error: "This quiz session cannot accept an answer." });
  }

  const question = session.questions[session.index];
  if (optionId !== null && (!Number.isSafeInteger(optionId) || !question.options.some((option) => option.id === optionId))) {
    return response.status(400).json({ error: "Choose one of the available answers." });
  }

  const correct = optionId === question.correctAnswerId;
  if (correct) session.score += 1;
  session.answered = true;
  const correctOption = question.options.find((option) => option.id === question.correctAnswerId);
  response.json({
    correct,
    correctAnswer: correctOption.label,
    explanation: question.explanation,
    score: session.score,
    total: session.questions.length,
    isLastQuestion: session.index === session.questions.length - 1,
  });
}

function next(request, response) {
  const { sessionId } = request.body || {};
  const session = sessions.get(sessionId);
  if (!session || session.finished || !session.answered) {
    return response.status(400).json({ error: "Answer the current question before continuing." });
  }
  if (session.index === session.questions.length - 1) {
    session.finished = true;
    sessions.delete(sessionId);
    return response.json({ finished: true, score: session.score, total: session.questions.length });
  }
  session.index += 1;
  session.answered = false;
  response.json({
    finished: false,
    question: publicQuestion(session.questions[session.index], session.index, session.questions.length),
  });
}

module.exports = { start, answer, next };