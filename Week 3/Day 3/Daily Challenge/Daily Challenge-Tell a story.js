const form = document.getElementById("libform");
const storySpan = document.getElementById("story");
const shuffleButton = document.getElementById("shuffle-button");

const storyTemplates = [
  "Once upon a time, {person} found a {adjective} {noun} in {place} and decided to {verb} it.",
  "At {place}, {person} met a {adjective} {noun} who wanted to {verb} all day.",
  "When {person} arrived at {place}, a {adjective} {noun} suddenly started to {verb} with joy.",
  "In the middle of {place}, {person} saw a {adjective} {noun} and began to {verb} immediately."
];

let currentValues = {};

function getValues() {
  const noun = document.getElementById("noun").value.trim();
  const adjective = document.getElementById("adjective").value.trim();
  const person = document.getElementById("person").value.trim();
  const verb = document.getElementById("verb").value.trim();
  const place = document.getElementById("place").value.trim();

  return { noun, adjective, person, verb, place };
}

function validateValues(values) {
  return Object.values(values).every((value) => value !== "");
}

function buildStory(values, template) {
  return template
    .replace("{noun}", values.noun)
    .replace("{adjective}", values.adjective)
    .replace("{person}", values.person)
    .replace("{verb}", values.verb)
    .replace("{place}", values.place);
}

function renderRandomStory(values) {
  const randomTemplate = storyTemplates[Math.floor(Math.random() * storyTemplates.length)];
  storySpan.textContent = buildStory(values, randomTemplate);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const values = getValues();

  if (!validateValues(values)) {
    alert("Please fill in all fields before generating the story.");
    return;
  }

  currentValues = values;
  renderRandomStory(values);
});

shuffleButton.addEventListener("click", () => {
  if (Object.keys(currentValues).length === 0) {
    const values = getValues();
    if (!validateValues(values)) {
      alert("Please fill in the form before shuffling the story.");
      return;
    }
    currentValues = values;
  }

  renderRandomStory(currentValues);
});
