const API_KEY = "a97b3a9a6d4e5f09da96687c";
const API_BASE_URL = "https://v6.exchangerate-api.com/v6";

const form = document.querySelector("#converter-form");
const amountInput = document.querySelector("#amount");
const fromCurrency = document.querySelector("#from-currency");
const toCurrency = document.querySelector("#to-currency");
const swapButton = document.querySelector("#swap");
const convertButton = document.querySelector(".convert-button");
const resultValue = document.querySelector("#result-value");
const rateNote = document.querySelector("#rate-note");
const message = document.querySelector("#message");

function showMessage(text) {
	message.textContent = text;
}

function setControlsEnabled(enabled) {
	fromCurrency.disabled = !enabled;
	toCurrency.disabled = !enabled;
	swapButton.disabled = !enabled;
	convertButton.disabled = !enabled;
}

async function requestExchangeRate(path) {
	const response = await fetch(`${API_BASE_URL}/${API_KEY}/${path}`);
	let data;
	try {
		data = await response.json();
	} catch (error) {
		throw new Error("ExchangeRate API returned an unreadable response.");
	}

	if (!response.ok || data.result !== "success") {
		if (data["error-type"] === "inactive-account") {
			throw new Error("Your ExchangeRate API account is inactive. Activate the account or replace the API key.");
		}
		if (data["error-type"] === "invalid-key") {
			throw new Error("This ExchangeRate API key is invalid. Check the key and try again.");
		}
		throw new Error(data["error-type"] || `ExchangeRate API request failed (${response.status}).`);
	}

	return data;
}

function addCurrencyOptions(currencies) {
	const options = currencies
		.map(([code, name]) => `<option value="${code}">${code} - ${name}</option>`)
		.join("");
	fromCurrency.innerHTML = options;
	toCurrency.innerHTML = options;
	fromCurrency.value = "USD";
	toCurrency.value = "EUR";
}

async function fetchSupportedCurrencies() {
	if (API_KEY === "YOUR_EXCHANGERATE_API_KEY") {
		throw new Error("Add your ExchangeRate API key in the JavaScript file first.");
	}
	const data = await requestExchangeRate("codes");
	addCurrencyOptions(data.supported_codes);
	setControlsEnabled(true);
}

async function convertCurrency(event) {
	event.preventDefault();
	const amount = Number.parseFloat(amountInput.value);
	if (!Number.isFinite(amount) || amount < 0) {
		showMessage("Enter a valid amount greater than or equal to zero.");
		return;
	}

	convertButton.disabled = true;
	showMessage("Fetching the latest exchange rate...");
	try {
		const data = await requestExchangeRate(`pair/${fromCurrency.value}/${toCurrency.value}/${amount}`);
		resultValue.textContent = `${data.conversion_result.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${toCurrency.value}`;
		rateNote.textContent = `1 ${fromCurrency.value} = ${data.conversion_rate} ${toCurrency.value}`;
		showMessage("");
	} catch (error) {
		showMessage(error.message);
	} finally {
		convertButton.disabled = false;
	}
}

function swapCurrencies() {
	const previousFrom = fromCurrency.value;
	fromCurrency.value = toCurrency.value;
	toCurrency.value = previousFrom;
	form.requestSubmit();
}

form.addEventListener("submit", convertCurrency);
swapButton.addEventListener("click", swapCurrencies);

fetchSupportedCurrencies()
	.then(() => form.requestSubmit())
	.catch((error) => showMessage(error.message));
