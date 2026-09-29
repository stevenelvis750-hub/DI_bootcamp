const welcomeView = document.querySelector("#welcome-view");
const playView = document.querySelector("#play-view");
const resultView = document.querySelector("#result-view");
const startButton = document.querySelector("#start-button");
const questionNumber = document.querySelector("#question-number");
const questionCategory = document.querySelector("#question-category");
const questionTitle = document.querySelector("#question-title");
const optionList = document.querySelector("#option-list");
const progressTrack = document.querySelector(".progress-track");
const progressFill = document.querySelector("#progress-fill");
const submitButton = document.querySelector("#submit-button");
const answerHint = document.querySelector("#answer-hint");
const feedback = document.querySelector("#feedback");
const feedbackTitle = document.querySelector("#feedback-title");
const feedbackCopy = document.querySelector("#feedback-copy");
const nextButton = document.querySelector("#next-button");
const currentScore = document.querySelector("#current-score");
const scoreTotal = document.querySelector("#score-total");
const finalScore = document.querySelector("#final-score");
const finalTotal = document.querySelector("#final-total");
const resultCopy = document.querySelector("#result-copy");
const playAgainButton = document.querySelector("#play-again-button");
const welcomeDescription = document.querySelector(".welcome-description");
const defaultWelcomeDescription = welcomeDescription.textContent;

const answerKeys = ["A", "B", "C", "D"];
let sessionId = null;
let activeQuestion = null;
let selectedOptionId = null;
let currentPoints = 0;
let hasAnswered = false;

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Something went wrong. Please try again.");
  return data;
}

function setScreen(screen) {
  welcomeView.hidden = screen !== "welcome";
  playView.hidden = screen !== "play";
  resultView.hidden = screen !== "result";
}

function renderQuestion(question) {
  activeQuestion = question;
  selectedOptionId = null;
  hasAnswered = false;
  questionNumber.textContent = `${String(question.number).padStart(2, "0")} / ${String(question.total).padStart(2, "0")}`;
  questionCategory.textContent = question.category;
  questionTitle.textContent = question.question;
  scoreTotal.textContent = String(question.total);
  progressTrack.setAttribute("aria-valuemax", String(question.total));
  progressTrack.setAttribute("aria-valuenow", String(question.number));
  progressFill.style.width = `${(question.number / question.total) * 100}%`;
  optionList.replaceChildren();

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "answer-option";
    button.type = "button";
    button.setAttribute("aria-pressed", "false");
    const key = document.createElement("span");
    key.className = "answer-key";
    key.textContent = answerKeys[index] || String(index + 1);
    const label = document.createElement("span");
    label.className = "answer-text";
    label.textContent = option.label;
    const mark = document.createElement("span");
    mark.className = "answer-mark";
    mark.setAttribute("aria-hidden", "true");
    mark.textContent = "✓";
    button.append(key, label, mark);
    button.addEventListener("click", () => selectOption(option.id));
    optionList.append(button);
  });

  submitButton.disabled = true;
  submitButton.hidden = false;
  answerHint.textContent = "SELECT ONE OPTION";
  feedback.hidden = true;
  feedback.classList.remove("is-wrong");
  setScreen("play");
}

function selectOption(optionId) {
  if (hasAnswered) return;
  selectedOptionId = optionId;
  const options = [...optionList.children];
  options.forEach((button, index) => {
    const selected = activeQuestion.options[index].id === optionId;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  submitButton.disabled = false;
  answerHint.textContent = `${answerKeys[activeQuestion.options.findIndex((option) => option.id === optionId)]} SELECTED`;
}

async function startQuiz() {
  startButton.disabled = true;
  startButton.firstChild.textContent = "Loading quiz... ";
  welcomeDescription.textContent = defaultWelcomeDescription;
  try {
    const result = await requestJson("/api/quiz/start", { method: "POST" });
    sessionId = result.sessionId;
    currentPoints = 0;
    currentScore.textContent = "0";
    renderQuestion(result.question);
  } catch (error) {
    welcomeDescription.textContent = error.message;
    setScreen("welcome");
  } finally {
    startButton.disabled = false;
    startButton.firstChild.textContent = "Start quiz ";
  }
}

async function submitAnswer() {
  if (hasAnswered || selectedOptionId === null) return;
  hasAnswered = true;
  submitButton.disabled = true;
  try {
    const result = await requestJson("/api/quiz/answer", {
      method: "POST",
      body: JSON.stringify({ sessionId, optionId: selectedOptionId }),
    });
    currentPoints = result.score;
    currentScore.textContent = String(result.score);
    [...optionList.children].forEach((button, index) => {
      button.disabled = true;
      const option = activeQuestion.options[index];
      if (option.label === result.correctAnswer) button.classList.add("is-correct");
      if (option.id === selectedOptionId && !result.correct) button.classList.add("is-wrong");
    });
    feedbackTitle.textContent = result.correct ? "Correct." : "Not quite.";
    feedbackCopy.textContent = result.correct
      ? result.explanation
      : `The answer was ${result.correctAnswer}. ${result.explanation}`;
    feedback.classList.toggle("is-wrong", !result.correct);
    answerHint.textContent = `SCORE ${result.score} / ${result.total}`;
    submitButton.hidden = true;
    nextButton.textContent = result.isLastQuestion ? "See final score ↗" : "Next question ↗";
    feedback.hidden = false;
    nextButton.focus();
  } catch (error) {
    hasAnswered = false;
    feedbackTitle.textContent = "Couldn't submit.";
    feedbackCopy.textContent = error.message;
    feedback.classList.add("is-wrong");
    feedback.hidden = false;
    nextButton.hidden = true;
  }
}

async function advanceQuestion() {
  nextButton.disabled = true;
  nextButton.hidden = false;
  try {
    const result = await requestJson("/api/quiz/next", {
      method: "POST",
      body: JSON.stringify({ sessionId }),
    });
    if (result.finished) {
      finalScore.textContent = String(result.score);
      finalTotal.textContent = String(result.total);
      resultCopy.textContent = result.score === result.total
        ? "A perfect run. You know your way around the stack."
        : result.score >= Math.ceil(result.total * 0.6)
          ? "Solid instincts. Keep building on them."
          : "Good first run. The next one is yours to improve.";
      setScreen("result");
    } else {
      renderQuestion(result.question);
    }
  } catch (error) {
    feedbackCopy.textContent = error.message;
  } finally {
    nextButton.disabled = false;
  }
}

startButton.addEventListener("click", startQuiz);
playAgainButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", submitAnswer);
nextButton.addEventListener("click", advanceQuestion);