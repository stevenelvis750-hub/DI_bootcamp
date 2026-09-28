const introScreen = document.querySelector("#intro-screen");
const questionScreen = document.querySelector("#question-screen");
const resultScreen = document.querySelector("#result-screen");
const startButton = document.querySelector("#start-button");
const roundChip = document.querySelector("#round-chip");
const scoreValue = document.querySelector("#score-value");
const emojiDisplay = document.querySelector("#emoji-display");
const options = document.querySelector("#options");
const guessForm = document.querySelector("#guess-form");
const submitButton = document.querySelector("#submit-button");
const feedback = document.querySelector("#feedback");
const feedbackTitle = document.querySelector("#feedback-title");
const feedbackCopy = document.querySelector("#feedback-copy");
const nextButton = document.querySelector("#next-button");
const finalScore = document.querySelector("#final-score");
const resultCopy = document.querySelector("#result-copy");
const scoreForm = document.querySelector("#score-form");
const playerName = document.querySelector("#player-name");
const saveStatus = document.querySelector("#save-status");
const againButton = document.querySelector("#again-button");
const leaderList = document.querySelector("#leader-list");

let sessionId = null;
let question = null;
let selectedGuess = null;
let score = 0;
let hasAnswered = false;
let isSaving = false;

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const data = response.status === 204 ? null : await response.json();
  if (!response.ok) throw new Error(data?.error || "The request could not be completed.");
  return data;
}

function setBusy(button, busy, busyText) {
  button.disabled = busy;
  if (busy) {
    button.dataset.label ||= button.textContent;
    button.textContent = busyText;
  } else if (button.dataset.label) {
    button.textContent = button.dataset.label;
  }
}

function renderQuestion(nextQuestion) {
  question = nextQuestion;
  selectedGuess = null;
  hasAnswered = false;
  roundChip.textContent = `ROUND ${String(question.round).padStart(2, "0")} / ${question.total}`;
  scoreValue.textContent = String(score);
  emojiDisplay.textContent = question.emoji;
  emojiDisplay.setAttribute("aria-label", "Mystery emoji");
  options.replaceChildren(options.querySelector("legend"));

  question.options.forEach((name, index) => {
    const label = document.createElement("label");
    label.className = "answer-option";
    label.innerHTML = `<input type="radio" name="guess"><span class="option-letter">${String.fromCharCode(65 + index)}</span><span class="option-name"></span>`;
    label.querySelector(".option-name").textContent = name;
    label.querySelector("input").value = name;
    label.addEventListener("change", () => {
      selectedGuess = name;
      options.querySelectorAll(".answer-option").forEach((item) => item.classList.remove("is-selected"));
      label.classList.add("is-selected");
      submitButton.disabled = false;
    });
    options.append(label);
  });

  submitButton.disabled = true;
  submitButton.hidden = false;
  submitButton.textContent = "Lock it in ↗";
  feedback.hidden = true;
  questionScreen.hidden = false;
  resultScreen.hidden = true;
  introScreen.hidden = true;
}

async function refreshLeaderboard() {
  try {
    const entries = await requestJson("/api/leaderboard");
    leaderList.replaceChildren();
    if (entries.length === 0) {
      const empty = document.createElement("li");
      empty.className = "leader-empty";
      empty.textContent = "No scores yet. Be the first to play.";
      leaderList.append(empty);
      return;
    }

    entries.forEach((entry, index) => {
      const row = document.createElement("li");
      row.className = "leader-row";
      row.innerHTML = `<span class="leader-rank">0${index + 1}</span><span class="leader-name"></span><span class="leader-score"></span>`;
      row.querySelector(".leader-name").textContent = entry.name;
      row.querySelector(".leader-score").textContent = `${entry.score}/${entry.total}`;
      leaderList.append(row);
    });
  } catch {
    leaderList.replaceChildren();
    const error = document.createElement("li");
    error.className = "leader-empty";
    error.textContent = "Scores are unavailable right now.";
    leaderList.append(error);
  }
}

async function startGame() {
  setBusy(startButton, true, "One moment...");
  setBusy(againButton, true, "One moment...");
  try {
    const result = await requestJson("/api/start", { method: "POST" });
    sessionId = result.sessionId;
    score = 0;
    roundChip.hidden = false;
    renderQuestion(result.question);
  } catch (error) {
    roundChip.textContent = error.message;
  } finally {
    setBusy(startButton, false);
    setBusy(againButton, false);
  }
}

async function submitGuess(event) {
  event.preventDefault();
  if (!selectedGuess || hasAnswered) return;
  hasAnswered = true;
  submitButton.disabled = true;
  try {
    const result = await requestJson("/api/guess", {
      method: "POST",
      body: JSON.stringify({ sessionId, questionId: question.id, guess: selectedGuess }),
    });
    score = result.score;
    scoreValue.textContent = String(score);
    options.querySelectorAll(".answer-option").forEach((option) => {
      const input = option.querySelector("input");
      input.disabled = true;
      if (input.value === result.answer) option.classList.add("is-correct");
      if (input.value === selectedGuess && !result.correct) option.classList.add("is-wrong");
    });
    feedback.classList.toggle("is-wrong", !result.correct);
    feedbackTitle.textContent = result.correct ? "Nailed it!" : "Not this time!";
    feedbackCopy.textContent = result.correct
      ? `${result.answer} is right. Your score is ${result.score}/${result.total}.`
      : `That one was ${result.answer}. Your score is ${result.score}/${result.total}.`;
    nextButton.textContent = result.finalRound ? "See your score →" : "Next emoji →";
    feedback.hidden = false;
    nextButton.focus();
  } catch (error) {
    hasAnswered = false;
    feedback.classList.add("is-wrong");
    feedbackTitle.textContent = "Oops, try again.";
    feedbackCopy.textContent = error.message;
    feedback.hidden = false;
    submitButton.disabled = false;
  }
}

async function nextRound() {
  nextButton.disabled = true;
  try {
    const result = await requestJson("/api/next", {
      method: "POST",
      body: JSON.stringify({ sessionId }),
    });
    if (result.finished) {
      showResults(result.score, result.total);
    } else {
      renderQuestion(result.question);
    }
  } catch (error) {
    feedbackCopy.textContent = error.message;
  } finally {
    nextButton.disabled = false;
  }
}

function showResults(final, total) {
  finalScore.textContent = String(final);
  resultCopy.textContent = final === total
    ? "A perfect set! You’ve got a seriously sharp eye."
    : final >= 7
      ? "Lovely spotting. You know your way around an emoji."
      : "Nice first round. There are plenty more emojis to learn.";
  scoreForm.reset();
  saveStatus.textContent = "";
  isSaving = false;
  questionScreen.hidden = true;
  introScreen.hidden = true;
  resultScreen.hidden = false;
  roundChip.textContent = "GAME COMPLETE";
  playerName.focus();
}

scoreForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = playerName.value.trim();
  if (!name || isSaving) return;
  isSaving = true;
  const saveButton = scoreForm.querySelector("button[type='submit']");
  setBusy(saveButton, true, "Saving...");
  try {
    await requestJson("/api/leaderboard", {
      method: "POST",
      body: JSON.stringify({ sessionId, name }),
    });
    saveStatus.textContent = "Your score is on the board.";
    await refreshLeaderboard();
  } catch (error) {
    saveStatus.textContent = error.message;
    isSaving = false;
  } finally {
    setBusy(saveButton, false);
  }
});

startButton.addEventListener("click", startGame);
againButton.addEventListener("click", startGame);
guessForm.addEventListener("submit", submitGuess);
nextButton.addEventListener("click", nextRound);

refreshLeaderboard();