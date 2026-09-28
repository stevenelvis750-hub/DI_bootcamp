const introScreen = document.querySelector("#intro-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultsScreen = document.querySelector("#results-screen");
const startButton = document.querySelector("#start-button");
const questionCount = document.querySelector("#question-count");
const categoryLabel = document.querySelector("#category-label");
const questionTitle = document.querySelector("#question-title");
const answerList = document.querySelector("#answer-list");
const submitButton = document.querySelector("#submit-button");
const selectionNote = document.querySelector("#selection-note");
const progressTrack = document.querySelector(".progress-track");
const progressFill = document.querySelector("#progress-fill");
const timerElement = document.querySelector("#timer");
const timerValue = document.querySelector("#timer-value");
const feedback = document.querySelector("#feedback");
const feedbackTitle = document.querySelector("#feedback-title");
const feedbackDetail = document.querySelector("#feedback-detail");
const nextButton = document.querySelector("#next-button");
const finalScore = document.querySelector("#final-score");
const resultMessage = document.querySelector("#result-message");
const scoreForm = document.querySelector("#score-form");
const playerName = document.querySelector("#player-name");
const saveStatus = document.querySelector("#save-status");
const restartButton = document.querySelector("#restart-button");
const scoreList = document.querySelector("#score-list");

const leaderboardKey = "quickfire-scores-v1";
const answerLetters = ["A", "B", "C", "D"];
let sessionId = null;
let question = null;
let selectedIndex = null;
let timerInterval = null;
let remainingSeconds = 20;
let submitted = false;
let currentScore = 0;
let currentTotal = 0;
let scoreSaved = false;

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }
  return data;
}

function setBusy(button, busy, text) {
  button.disabled = busy;
  if (text) {
    button.dataset.originalText ||= button.textContent;
    button.textContent = busy ? text : button.dataset.originalText;
  }
}

function stopTimer() {
  window.clearInterval(timerInterval);
  timerInterval = null;
  timerElement.classList.remove("is-low");
}

function startTimer(seconds) {
  stopTimer();
  remainingSeconds = seconds;
  updateTimer();

  timerInterval = window.setInterval(() => {
    remainingSeconds -= 1;
    updateTimer();
    if (remainingSeconds <= 0) {
      stopTimer();
      submitAnswer(null);
    }
  }, 1000);
}

function updateTimer() {
  timerValue.textContent = String(remainingSeconds).padStart(2, "0");
  timerElement.setAttribute("aria-label", `${remainingSeconds} seconds remaining`);
  timerElement.classList.toggle("is-low", remainingSeconds <= 5);
}

function renderQuestion(nextQuestion, timeLimit) {
  question = nextQuestion;
  selectedIndex = null;
  submitted = false;
  questionCount.textContent = question.difficulty;
  categoryLabel.textContent = question.category.toUpperCase();
  questionTitle.textContent = question.prompt;
  progressTrack.setAttribute("aria-valuemax", question.total);
  progressTrack.setAttribute("aria-valuenow", String(Number.parseInt(question.difficulty, 10)));
  progressFill.style.width = `${(Number.parseInt(question.difficulty, 10) / question.total) * 100}%`;
  answerList.replaceChildren();

  question.choices.forEach((choice, index) => {
    const option = document.createElement("button");
    option.className = "answer-option";
    option.type = "button";
    option.setAttribute("aria-pressed", "false");
    option.innerHTML = `<span class="answer-key">${answerLetters[index]}</span><span class="answer-text"></span><span class="answer-mark" aria-hidden="true">✓</span>`;
    option.querySelector(".answer-text").textContent = choice;
    option.addEventListener("click", () => selectAnswer(index));
    answerList.append(option);
  });

  submitButton.disabled = true;
  submitButton.hidden = false;
  submitButton.textContent = "Lock it in ↗";
  selectionNote.textContent = "SELECT ONE ANSWER";
  feedback.hidden = true;
  feedback.classList.remove("is-wrong");
  nextButton.hidden = false;
  quizScreen.hidden = false;
  resultsScreen.hidden = true;
  introScreen.hidden = true;
  startTimer(timeLimit);
}

function selectAnswer(index) {
  if (submitted) return;
  selectedIndex = index;
  [...answerList.children].forEach((option, optionIndex) => {
    const selected = optionIndex === index;
    option.classList.toggle("is-selected", selected);
    option.setAttribute("aria-pressed", String(selected));
  });
  submitButton.disabled = false;
  selectionNote.textContent = `${answerLetters[index]} SELECTED`;
}

async function submitAnswer(choiceIndex) {
  if (submitted || !question) return;
  submitted = true;
  stopTimer();
  submitButton.disabled = true;

  try {
    const result = await requestJson("/api/answer", {
      method: "POST",
      body: JSON.stringify({ sessionId, questionId: question.id, choiceIndex }),
    });
    currentScore = result.score;
    currentTotal = result.total;
    [...answerList.children].forEach((option, index) => {
      option.disabled = true;
      if (index === result.correctIndex) option.classList.add("is-correct");
      if (index === choiceIndex && !result.correct) option.classList.add("is-wrong");
    });

    feedbackTitle.textContent = result.timedOut
      ? "Time's up."
      : result.correct
        ? "That's right."
        : "Not quite.";
    feedbackDetail.textContent = result.timedOut
      ? `The answer was ${answerLetters[result.correctIndex]}. ${result.explanation}`
      : result.correct
        ? result.explanation
        : `The answer was ${answerLetters[result.correctIndex]}. ${result.explanation}`;
    feedback.classList.toggle("is-wrong", !result.correct);
    selectionNote.textContent = `SCORE ${result.score} / ${result.total}`;
    submitButton.hidden = true;
    nextButton.textContent = result.isLastQuestion ? "See your score ↗" : "Next question ↗";
    feedback.hidden = false;
    nextButton.focus();
  } catch (error) {
    submitted = false;
    feedback.hidden = false;
    feedback.classList.add("is-wrong");
    feedbackTitle.textContent = "Couldn't submit.";
    feedbackDetail.textContent = error.message;
    nextButton.hidden = true;
  }
}

async function advanceQuestion() {
  nextButton.disabled = true;
  try {
    const result = await requestJson("/api/next", {
      method: "POST",
      body: JSON.stringify({ sessionId }),
    });
    if (result.finished) {
      showResults(result.score, result.total);
      return;
    }
    renderQuestion(result.question, result.timeLimit);
  } catch (error) {
    feedbackDetail.textContent = error.message;
  } finally {
    nextButton.disabled = false;
  }
}

function showResults(score, total) {
  stopTimer();
  currentScore = score;
  currentTotal = total;
  scoreSaved = false;
  finalScore.textContent = String(score);
  resultMessage.textContent = score === total
    ? "A perfect run. You know your way around the stack."
    : score >= Math.ceil(total * 0.6)
      ? "Solid instincts. There's always another level."
      : "Good first run. The next one is yours to improve.";
  quizScreen.hidden = true;
  introScreen.hidden = true;
  resultsScreen.hidden = false;
  saveStatus.textContent = "";
  playerName.value = "";
  playerName.focus();
}

async function startQuiz() {
  setBusy(startButton, true, "Getting ready...");
  try {
    const result = await requestJson("/api/start", { method: "POST" });
    sessionId = result.sessionId;
    renderQuestion(result.question, result.timeLimit);
  } catch (error) {
    startButton.textContent = error.message;
  } finally {
    startButton.disabled = false;
    startButton.textContent = "Start the quiz ↗";
  }
}

function readScores() {
  try {
    const scores = JSON.parse(localStorage.getItem(leaderboardKey) || "[]");
    return Array.isArray(scores) ? scores : [];
  } catch {
    return [];
  }
}

function renderLeaderboard() {
  const scores = readScores()
    .sort((first, second) => second.score - first.score || first.savedAt - second.savedAt)
    .slice(0, 5);
  scoreList.replaceChildren();

  if (scores.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-board";
    empty.textContent = "No scores yet. Put the first one on the board.";
    scoreList.append(empty);
    return;
  }

  scores.forEach((score, index) => {
    const row = document.createElement("li");
    row.className = "score-row";
    row.innerHTML = `<span class="score-rank">0${index + 1}</span><span class="score-name"></span><span class="score-points"></span>`;
    row.querySelector(".score-name").textContent = score.name;
    row.querySelector(".score-points").textContent = `${score.score}/${score.total}`;
    scoreList.append(row);
  });
}

startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", () => submitAnswer(selectedIndex));
nextButton.addEventListener("click", advanceQuestion);
restartButton.addEventListener("click", startQuiz);
scoreForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (scoreSaved) return;

  const name = playerName.value.trim();
  if (!name) return;

  const scores = readScores();
  scores.push({ name, score: currentScore, total: currentTotal, savedAt: Date.now() });
  localStorage.setItem(leaderboardKey, JSON.stringify(scores));
  scoreSaved = true;
  saveStatus.textContent = "Score saved to this device.";
  renderLeaderboard();
});

renderLeaderboard();