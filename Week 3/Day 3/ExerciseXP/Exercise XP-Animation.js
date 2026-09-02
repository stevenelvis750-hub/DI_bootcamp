const container = document.getElementById("container");
const clearButton = document.getElementById("clear");
let intervalId;

// Part I
setTimeout(() => {
  alert("Hello World");
}, 2000);

// Part II
setTimeout(() => {
  if (container) {
    const paragraph = document.createElement("p");
    paragraph.textContent = "Hello World";
    container.appendChild(paragraph);
  }
}, 2000);

// Part III
function addHelloParagraph() {
  if (!container) return;

  const paragraph = document.createElement("p");
  paragraph.textContent = "Hello World";
  container.appendChild(paragraph);

  if (container.querySelectorAll("p").length >= 5) {
    clearInterval(intervalId);
  }
}

intervalId = setInterval(addHelloParagraph, 2000);

if (clearButton) {
  clearButton.addEventListener("click", () => {
    clearInterval(intervalId);
  });
}

// Exercise 2: Move the box
const boxContainer = document.getElementById("boxContainer");
const animateBox = document.getElementById("animate");
let moveInterval;

function myMove() {
  if (!boxContainer || !animateBox) return;

  let position = 0;
  clearInterval(moveInterval);

  moveInterval = setInterval(() => {
    const maxRight = boxContainer.clientWidth - animateBox.clientWidth;

    if (position >= maxRight) {
      clearInterval(moveInterval);
      return;
    }

    position += 1;
    animateBox.style.left = `${position}px`;
  }, 1);
}
