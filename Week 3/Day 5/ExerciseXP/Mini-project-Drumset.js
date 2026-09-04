// ======================================
// PULSE ROOM DRUM MACHINE
// ======================================

const pads = document.querySelectorAll(".pad");

const lastHit = document.getElementById("last-hit");

const beatButton = document.getElementById("beatButton");
const stopButton = document.getElementById("stopButton");
const clearButton = document.getElementById("clearButton");


// ======================================
// AUDIO ENGINE
// ======================================

let audioContext;

function getAudioContext() {

    if (!audioContext) {

        audioContext =
            new (window.AudioContext ||
            window.webkitAudioContext)();

    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    return audioContext;
}


// ======================================
// MASTER VOLUME
// ======================================

function createGain(volume = 0.3) {

    const ctx = getAudioContext();

    const gain = ctx.createGain();

    gain.gain.value = volume;

    gain.connect(ctx.destination);

    return gain;
}


// ======================================
// KICK
// ======================================

function playKick() {

    const ctx = getAudioContext();

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
        150,
        ctx.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        45,
        ctx.currentTime + 0.25
    );

    gain.gain.setValueAtTime(
        0.9,
        ctx.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.35
    );

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.35);
}


// ======================================
// SNARE
// ======================================

function playSnare() {

    const ctx = getAudioContext();

    const bufferSize =
        ctx.sampleRate * 0.2;

    const buffer =
        ctx.createBuffer(
            1,
            bufferSize,
            ctx.sampleRate
        );

    const data =
        buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {

        data[i] =
            Math.random() * 2 - 1;

    }

    const noise =
        ctx.createBufferSource();

    noise.buffer = buffer;

    const filter =
        ctx.createBiquadFilter();

    filter.type = "highpass";

    filter.frequency.value = 1000;

    const gain = ctx.createGain();

    gain.gain.setValueAtTime(
        0.5,
        ctx.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.2
    );

    noise
        .connect(filter)
        .connect(gain)
        .connect(ctx.destination);

    noise.start();
}


// ======================================
// HI-HAT
// ======================================

function playHiHat() {

    const ctx = getAudioContext();

    const bufferSize =
        ctx.sampleRate * 0.08;

    const buffer =
        ctx.createBuffer(
            1,
            bufferSize,
            ctx.sampleRate
        );

    const data =
        buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {

        data[i] =
            Math.random() * 2 - 1;

    }

    const noise =
        ctx.createBufferSource();

    noise.buffer = buffer;

    const filter =
        ctx.createBiquadFilter();

    filter.type = "highpass";

    filter.frequency.value = 5000;

    const gain = ctx.createGain();

    gain.gain.setValueAtTime(
        0.25,
        ctx.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.08
    );

    noise
        .connect(filter)
        .connect(gain)
        .connect(ctx.destination);

    noise.start();
}


// ======================================
// TOM
// ======================================

function playTom() {

    const ctx = getAudioContext();

    const oscillator =
        ctx.createOscillator();

    const gain =
        ctx.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
        180,
        ctx.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        80,
        ctx.currentTime + 0.3
    );

    gain.gain.setValueAtTime(
        0.6,
        ctx.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.3
    );

    oscillator
        .connect(gain)
        .connect(ctx.destination);

    oscillator.start();

    oscillator.stop(
        ctx.currentTime + 0.3
    );
}


// ======================================
// OPEN HI-HAT
// ======================================

function playOpenHat() {

    const ctx = getAudioContext();

    const bufferSize =
        ctx.sampleRate * 0.35;

    const buffer =
        ctx.createBuffer(
            1,
            bufferSize,
            ctx.sampleRate
        );

    const data =
        buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {

        data[i] =
            Math.random() * 2 - 1;

    }

    const noise =
        ctx.createBufferSource();

    noise.buffer = buffer;

    const filter =
        ctx.createBiquadFilter();

    filter.type = "highpass";

    filter.frequency.value = 4500;

    const gain = ctx.createGain();

    gain.gain.setValueAtTime(
        0.25,
        ctx.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.35
    );

    noise
        .connect(filter)
        .connect(gain)
        .connect(ctx.destination);

    noise.start();
}


// ======================================
// BOOM
// ======================================

function playBoom() {

    const ctx = getAudioContext();

    const oscillator =
        ctx.createOscillator();

    const gain =
        ctx.createGain();

    oscillator.type = "triangle";

    oscillator.frequency.setValueAtTime(
        100,
        ctx.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        35,
        ctx.currentTime + 0.6
    );

    gain.gain.setValueAtTime(
        0.8,
        ctx.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.6
    );

    oscillator
        .connect(gain)
        .connect(ctx.destination);

    oscillator.start();

    oscillator.stop(
        ctx.currentTime + 0.6
    );
}


// ======================================
// CLAP
// ======================================

function playClap() {

    const ctx = getAudioContext();

    for (let burst = 0; burst < 3; burst++) {

        const bufferSize =
            ctx.sampleRate * 0.06;

        const buffer =
            ctx.createBuffer(
                1,
                bufferSize,
                ctx.sampleRate
            );

        const data =
            buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {

            data[i] =
                Math.random() * 2 - 1;

        }

        const noise =
            ctx.createBufferSource();

        noise.buffer = buffer;

        const gain =
            ctx.createGain();

        const start =
            ctx.currentTime +
            burst * 0.025;

        gain.gain.setValueAtTime(
            0.35,
            start
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            start + 0.06
        );

        noise
            .connect(gain)
            .connect(ctx.destination);

        noise.start(start);
    }
}


// ======================================
// RIDE
// ======================================

function playRide() {

    const ctx = getAudioContext();

    const bufferSize =
        ctx.sampleRate * 0.45;

    const buffer =
        ctx.createBuffer(
            1,
            bufferSize,
            ctx.sampleRate
        );

    const data =
        buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {

        data[i] =
            Math.random() * 2 - 1;

    }

    const noise =
        ctx.createBufferSource();

    noise.buffer = buffer;

    const filter =
        ctx.createBiquadFilter();

    filter.type = "highpass";

    filter.frequency.value = 3500;

    const gain =
        ctx.createGain();

    gain.gain.setValueAtTime(
        0.25,
        ctx.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.45
    );

    noise
        .connect(filter)
        .connect(gain)
        .connect(ctx.destination);

    noise.start();
}


// ======================================
// PLAY SOUND
// ======================================

function playSound(sound) {

    switch (sound) {

        case "kick":
            playKick();
            break;

        case "snare":
            playSnare();
            break;

        case "hihat":
            playHiHat();
            break;

        case "tom":
            playTom();
            break;

        case "openhat":
            playOpenHat();
            break;

        case "boom":
            playBoom();
            break;

        case "clap":
            playClap();
            break;

        case "ride":
            playRide();
            break;

    }
}


// ======================================
// ANIMATE PAD
// ======================================

function hitPad(pad) {

    const sound =
        pad.dataset.sound;

    playSound(sound);

    pad.classList.remove("playing");

    // Restart animation
    void pad.offsetWidth;

    pad.classList.add("playing");

    setTimeout(() => {

        pad.classList.remove("playing");

    }, 150);


    // Keyboard animation

    const key =
        pad.dataset.key;

    const keyboardKey =
        [...document.querySelectorAll("kbd")]
            .find(
                item =>
                    item.textContent.toLowerCase() === key
            );

    if (keyboardKey) {

        keyboardKey.classList.add("active");

        setTimeout(() => {

            keyboardKey.classList.remove("active");

        }, 120);

    }


    // Status

    lastHit.textContent =
        `Playing ${sound.toUpperCase()} 🔊`;
}


// ======================================
// MOUSE / TOUCH
// ======================================

pads.forEach(pad => {

    pad.addEventListener("click", () => {

        hitPad(pad);

    });

});


// ======================================
// KEYBOARD
// ======================================

document.addEventListener("keydown", event => {

    if (event.repeat) {
        return;
    }

    const key =
        event.key.toLowerCase();

    const pad =
        [...pads].find(
            item =>
                item.dataset.key === key
        );

    if (pad) {

        hitPad(pad);

    }

});


// ======================================
// AUTO BEAT
// ======================================

let beatInterval = null;

const beatPattern = [
    "a",
    "d",
    "s",
    "d",
    "a",
    "d",
    "s",
    "j"
];

let beatIndex = 0;


beatButton.addEventListener("click", () => {

    if (beatInterval) {
        return;
    }

    getAudioContext();

    beatButton.classList.add("active");

    beatButton.textContent =
        "⏸ BEAT PLAYING";

    beatIndex = 0;

    beatInterval = setInterval(() => {

        const key =
            beatPattern[beatIndex];

        const pad =
            [...pads].find(
                item =>
                    item.dataset.key === key
            );

        if (pad) {
            hitPad(pad);
        }

        beatIndex++;

        if (beatIndex >= beatPattern.length) {
            beatIndex = 0;
        }

    }, 220);

});


// ======================================
// STOP BEAT
// ======================================

stopButton.addEventListener("click", () => {

    clearInterval(beatInterval);

    beatInterval = null;

    beatButton.classList.remove("active");

    beatButton.textContent =
        "▶ PLAY BEAT";

    lastHit.textContent =
        "Beat stopped.";

});


// ======================================
// CLEAR
// ======================================

clearButton.addEventListener("click", () => {

    clearInterval(beatInterval);

    beatInterval = null;

    beatButton.classList.remove("active");

    beatButton.textContent =
        "▶ PLAY BEAT";

    pads.forEach(pad => {

        pad.classList.remove("playing");

    });

    lastHit.textContent =
        "Ready when you are...";

});