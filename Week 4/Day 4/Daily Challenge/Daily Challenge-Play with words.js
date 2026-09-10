function makeAllCaps(words) {
	return new Promise((resolve, reject) => {
		if (!Array.isArray(words) || !words.every((word) => typeof word === "string")) {
			reject("Every item must be a string.");
			return;
		}

		resolve(words.map((word) => word.toUpperCase()));
	});
}

function sortWords(words) {
	return new Promise((resolve, reject) => {
		if (!Array.isArray(words) || words.length <= 4) {
			reject("The array must contain more than four words.");
			return;
		}

		resolve([...words].sort());
	});
}

// Examples for the first daily challenge:
// makeAllCaps([1, "pear", "banana"])
//   .then((words) => sortWords(words))
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error));

// makeAllCaps(["apple", "pear", "banana"])
//   .then((words) => sortWords(words))
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error));

makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
	.then((words) => sortWords(words))
	.then((result) => console.log("Uppercased and sorted:", result))
	.catch((error) => console.log(error));

const morse = `{
	"0": "-----",
	"1": ".----",
	"2": "..---",
	"3": "...--",
	"4": "....-",
	"5": ".....",
	"6": "-....",
	"7": "--...",
	"8": "---..",
	"9": "----.",
	"a": ".-",
	"b": "-...",
	"c": "-.-.",
	"d": "-..",
	"e": ".",
	"f": "..-.",
	"g": "--.",
	"h": "....",
	"i": "..",
	"j": ".---",
	"k": "-.-",
	"l": ".-..",
	"m": "--",
	"n": "-.",
	"o": "---",
	"p": ".--.",
	"q": "--.-",
	"r": ".-.",
	"s": "...",
	"t": "-",
	"u": "..-",
	"v": "...-",
	"w": ".--",
	"x": "-..-",
	"y": "-.--",
	"z": "--..",
	".": ".-.-.-",
	",": "--..--",
	"?": "..--..",
	"!": "-.-.--",
	"-": "-....-",
	"/": "-..-.",
	"@": ".--.-.",
	"(": "-.--.",
	")": "-.--.-"
}`;

function toJs() {
	return new Promise((resolve, reject) => {
		let morseJS;

		try {
			morseJS = JSON.parse(morse);
		} catch (error) {
			reject("The Morse JSON is invalid.");
			return;
		}

		if (Object.keys(morseJS).length === 0) {
			reject("The Morse object is empty.");
			return;
		}

		resolve(morseJS);
	});
}

function toMorse(morseJS) {
	return new Promise((resolve, reject) => {
		const wordOrSentence =
			typeof window === "undefined"
				? "Hello"
				: window.prompt("Enter a word or sentence:");

		if (wordOrSentence === null) {
			reject("No word or sentence was entered.");
			return;
		}

		const characters = [...wordOrSentence.toLowerCase()];
		const unknownCharacter = characters.find((character) => !morseJS[character]);

		if (unknownCharacter) {
			reject(`The character "${unknownCharacter}" is not available in Morse code.`);
			return;
		}

		resolve(characters.map((character) => morseJS[character]));
	});
}

function joinWords(morseTranslation) {
	const translation = morseTranslation.join("\n");

	if (typeof document !== "undefined") {
		const output = document.createElement("pre");
		output.textContent = translation;
		document.body.appendChild(output);
	}

	console.log("Morse translation:\n" + translation);
	return translation;
}

toJs()
	.then((morseJS) => toMorse(morseJS))
	.then((morseTranslation) => joinWords(morseTranslation))
	.catch((error) => console.log(error));
