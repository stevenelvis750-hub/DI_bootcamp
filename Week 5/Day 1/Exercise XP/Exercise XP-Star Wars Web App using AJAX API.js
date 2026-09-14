const randomButton = document.querySelector("#random-character");
const loadingMessage = document.querySelector("#loading");
const errorMessage = document.querySelector("#error");
const characterName = document.querySelector("#character-name");
const recordNumber = document.querySelector("#record-number");
const height = document.querySelector("#height");
const gender = document.querySelector("#gender");
const birthYear = document.querySelector("#birth-year");
const age = document.querySelector("#age");
const homeWorld = document.querySelector("#home-world");
const portraitImage = document.querySelector("#portrait-image");
const portraitSymbol = document.querySelector("#portrait-symbol");

const characterCount = 83;

function getApproximateAge(birthYearValue) {
	const parsedBirthYear = Number.parseFloat(birthYearValue);
	if (!Number.isFinite(parsedBirthYear) || !birthYearValue.includes("BBY")) {
		return "Unknown";
	}
	return `${Math.round(parsedBirthYear)} years`;
}

function setLoading(isLoading) {
	loadingMessage.hidden = !isLoading;
	randomButton.disabled = isLoading;
	if (isLoading) {
		errorMessage.textContent = "";
		portraitImage.hidden = true;
		portraitSymbol.hidden = false;
	}
}

function setPortrait(characterId, characterNameValue) {
	portraitImage.src = `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;
	portraitImage.alt = `${characterNameValue} portrait`;
	portraitImage.hidden = false;
	portraitSymbol.hidden = true;
	portraitImage.onerror = () => {
		portraitImage.hidden = true;
		portraitSymbol.hidden = false;
	};
}

function displayCharacter(character, id) {
	const properties = character.properties;
	recordNumber.textContent = `FILE // ${String(id).padStart(2, "0")}`;
	characterName.textContent = properties.name;
	setPortrait(id, properties.name);
	height.textContent = properties.height || "Unknown";
	gender.textContent = properties.gender || "Unknown";
	birthYear.textContent = properties.birth_year || "Unknown";
	age.textContent = getApproximateAge(properties.birth_year || "");
	homeWorld.textContent = properties.homeworld || "Unknown";
}

async function getCharacter(id) {
	setLoading(true);
	try {
		const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
		if (!response.ok) {
			throw new Error("Character unavailable");
		}
		const result = await response.json();
		if (!result.result || !result.result.properties) {
			throw new Error("Invalid character data");
		}
		displayCharacter(result.result, id);
	} catch (error) {
		errorMessage.textContent = "Transmission failed. Please try again.";
		characterName.textContent = "No record found";
		portraitImage.hidden = true;
		portraitSymbol.hidden = false;
		recordNumber.textContent = "FILE // ERROR";
		height.textContent = "--";
		gender.textContent = "--";
		birthYear.textContent = "--";
			age.textContent = "--";
		homeWorld.textContent = "--";
	} finally {
		setLoading(false);
	}
}

function getRandomCharacter() {
	const randomId = Math.floor(Math.random() * characterCount) + 1;
	getCharacter(randomId);
}

randomButton.addEventListener("click", getRandomCharacter);
getRandomCharacter();
