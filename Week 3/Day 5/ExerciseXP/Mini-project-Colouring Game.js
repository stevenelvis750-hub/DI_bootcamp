// ============================================
// COLOURING SQUARES
// ============================================


// -----------------------------
// ELEMENTS
// -----------------------------

const canvas = document.getElementById("canvas");

const counter = document.getElementById("counter");

const clearButton =
    document.getElementById("clear");

const undoButton =
    document.getElementById("undo");

const eraserButton =
    document.getElementById("eraser");

const currentColor =
    document.getElementById("current-color");

const swatches =
    document.querySelectorAll(".swatch");


// -----------------------------
// SETTINGS
// -----------------------------

const GRID_SIZE = 20;

let selectedColor = "#ff4d6d";

let isDrawing = false;

let eraserActive = false;

let history = [];


// -----------------------------
// AUDIO
// -----------------------------

let audioContext;


function getAudio() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }

    if (audioContext.state === "suspended") {

        audioContext.resume();

    }

    return audioContext;
}


function paintSound() {

    const ctx = getAudio();

    const oscillator =
        ctx.createOscillator();

    const gain =
        ctx.createGain();


    oscillator.type = "sine";


    const notes = [
        330,
        392,
        440,
        523,
        659
    ];


    const note =
        notes[
            Math.floor(
                Math.random() * notes.length
            )
        ];


    oscillator.frequency.value = note;


    gain.gain.setValueAtTime(
        0.04,
        ctx.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.12
    );


    oscillator
        .connect(gain)
        .connect(ctx.destination);


    oscillator.start();

    oscillator.stop(
        ctx.currentTime + 0.12
    );
}


// -----------------------------
// CREATE CANVAS
// -----------------------------

function createCanvas() {

    canvas.innerHTML = "";

    for (
        let i = 0;
        i < GRID_SIZE * GRID_SIZE;
        i++
    ) {

        const square =
            document.createElement("div");


        square.className = "square";


        square.dataset.color = "";


        // Mouse

        square.addEventListener(
            "pointerdown",
            (event) => {

                event.preventDefault();

                isDrawing = true;

                paintSquare(square);

            }
        );


        square.addEventListener(
            "pointerenter",
            () => {

                if (isDrawing) {

                    paintSquare(square);

                }

            }
        );


        canvas.appendChild(square);

    }

}


createCanvas();


// Stop drawing

document.addEventListener(
    "pointerup",
    () => {

        isDrawing = false;

    }
);


// -----------------------------
// PAINT SQUARE
// -----------------------------

function paintSquare(square) {

    const oldColor =
        square.dataset.color;


    const newColor =
        eraserActive
            ? ""
            : selectedColor;


    // Don't repaint the same colour

    if (oldColor === newColor) {

        return;

    }


    // Save history

    history.push({
        square: square,
        oldColor: oldColor
    });


    // Limit history

    if (history.length > 500) {

        history.shift();

    }


    square.dataset.color = newColor;

    square.style.background =
        newColor || "#151827";


    square.classList.remove("painted");


    // Restart animation

    void square.offsetWidth;


    square.classList.add("painted");


    if (!eraserActive) {

        paintSound();

    }


    updateCounter();

}


// -----------------------------
// UPDATE COUNTER
// -----------------------------

function updateCounter() {

    const squares =
        document.querySelectorAll(".square");


    let painted = 0;


    squares.forEach(square => {

        if (square.dataset.color) {

            painted++;

        }

    });


    counter.textContent =
        `${painted} / ${GRID_SIZE * GRID_SIZE}`;

}


// -----------------------------
// COLOUR PALETTE
// -----------------------------

swatches.forEach(swatch => {

    swatch.addEventListener(
        "click",
        () => {

            selectedColor =
                swatch.dataset.color;


            eraserActive = false;


            eraserButton.classList.remove(
                "active"
            );


            // Selected state

            swatches.forEach(item => {

                item.classList.remove(
                    "selected"
                );

            });


            swatch.classList.add(
                "selected"
            );


            updateCurrentColor();

        }
    );

});


// -----------------------------
// CURRENT COLOR LABEL
// -----------------------------

function updateCurrentColor() {

    if (eraserActive) {

        currentColor.textContent =
            "● Eraser";

        currentColor.style.color =
            "#999";

        return;

    }


    currentColor.textContent =
        "● Selected";


    currentColor.style.color =
        selectedColor;

}


updateCurrentColor();


// -----------------------------
// ERASER
// -----------------------------

eraserButton.addEventListener(
    "click",
    () => {

        eraserActive =
            !eraserActive;


        eraserButton.classList.toggle(
            "active"
        );


        updateCurrentColor();

    }
);


// -----------------------------
// UNDO
// -----------------------------

undoButton.addEventListener(
    "click",
    () => {

        if (history.length === 0) {

            return;

        }


        const last =
            history.pop();


        last.square.dataset.color =
            last.oldColor;


        last.square.style.background =
            last.oldColor || "#151827";


        updateCounter();

    }
);


// -----------------------------
// CLEAR
// -----------------------------

clearButton.addEventListener(
    "click",
    () => {

        const squares =
            document.querySelectorAll(
                ".square"
            );


        squares.forEach(square => {

            if (square.dataset.color) {

                history.push({
                    square: square,
                    oldColor:
                        square.dataset.color
                });

            }


            square.dataset.color = "";

            square.style.background =
                "#151827";

        });


        updateCounter();

    }
);