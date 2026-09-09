const quotes = [
	{ id: 0, author: 'Maya Angelou', quote: 'You may not control all the events that happen to you, but you can decide not to be reduced by them.', likes: 0 },
	{ id: 1, author: 'James Baldwin', quote: 'The place in which I will fit will not exist until I make it.', likes: 0 },
	{ id: 2, author: 'Mary Oliver', quote: 'Tell me, what is it you plan to do with your one wild and precious life?', likes: 0 },
	{ id: 3, author: 'Albert Einstein', quote: 'Life is like riding a bicycle. To keep your balance, you must keep moving.', likes: 0 },
	{ id: 4, author: 'Octavia E. Butler', quote: 'All that you touch you change. All that you change changes you.', likes: 0 }
];

let currentQuote = null;
let previousRandomId = null;
let filteredQuotes = [];
let filteredIndex = -1;
const savedQuoteIds = new Set();

const quoteText = document.querySelector('#quote-text');
const quoteAuthor = document.querySelector('#quote-author');
const quoteMeta = document.querySelector('#quote-meta');
const likeCount = document.querySelector('#like-count');
const statOutput = document.querySelector('#stat-output');
const previousButton = document.querySelector('#previous-quote');
const nextButton = document.querySelector('#next-quote');
const collectionCount = document.querySelector('#collection-count');
const saveButton = document.querySelector('#save-quote');

function displayQuote(quote) {
	currentQuote = quote;
	quoteText.textContent = quote.quote;
	quoteAuthor.textContent = `- ${quote.author}`;
	quoteMeta.textContent = `Quote #${quote.id}`;
	likeCount.textContent = quote.likes;
	saveButton.textContent = savedQuoteIds.has(quote.id) ? 'Saved' : 'Save quote';
	statOutput.textContent = '';
}

function getRandomQuote() {
	if (quotes.length === 1) return quotes[0];

	let candidates = quotes.filter((quote) => quote.id !== currentQuote?.id);
	if (!candidates.length) candidates = quotes;
	const differentCandidates = candidates.filter((quote) => quote.id !== previousRandomId);
	if (differentCandidates.length) candidates = differentCandidates;

	const randomQuote = candidates[Math.floor(Math.random() * candidates.length)];

	previousRandomId = randomQuote.id;
	return randomQuote;
}

document.querySelector('#generate-quote').addEventListener('click', () => {
	filteredQuotes = [];
	filteredIndex = -1;
	previousButton.disabled = true;
	nextButton.disabled = true;
	displayQuote(getRandomQuote());
});

document.querySelector('#add-quote-form').addEventListener('submit', (event) => {
	event.preventDefault();
	const form = event.currentTarget;
	const quoteInput = form.elements.quote;
	const authorInput = form.elements.author;
	const newQuote = {
		id: quotes.length,
		author: authorInput.value.trim(),
		quote: quoteInput.value.trim(),
		likes: 0
	};

	if (!newQuote.quote || !newQuote.author) return;
	quotes.push(newQuote);
	collectionCount.textContent = quotes.length;
	displayQuote(newQuote);
	form.reset();
	document.querySelector('#add-message').textContent = `Quote #${newQuote.id} added.`;
});

document.querySelector('#filter-form').addEventListener('submit', (event) => {
	event.preventDefault();
	const author = event.currentTarget.elements.author.value.trim().toLowerCase();
	filteredQuotes = quotes.filter((quote) => quote.author.toLowerCase().includes(author));
	filteredIndex = filteredQuotes.length ? 0 : -1;

	if (!filteredQuotes.length) {
		document.querySelector('#filter-message').textContent = 'No quotes found for that author.';
		previousButton.disabled = true;
		nextButton.disabled = true;
		return;
	}

	document.querySelector('#filter-message').textContent = `${filteredQuotes.length} quote${filteredQuotes.length === 1 ? '' : 's'} found.`;
	displayQuote(filteredQuotes[filteredIndex]);
	previousButton.disabled = filteredQuotes.length < 2;
	nextButton.disabled = filteredQuotes.length < 2;
});

function moveThroughFilteredQuotes(step) {
	if (!filteredQuotes.length) return;
	filteredIndex = (filteredIndex + step + filteredQuotes.length) % filteredQuotes.length;
	displayQuote(filteredQuotes[filteredIndex]);
}

previousButton.addEventListener('click', () => moveThroughFilteredQuotes(-1));
nextButton.addEventListener('click', () => moveThroughFilteredQuotes(1));

document.querySelector('#characters-with-spaces').addEventListener('click', () => {
	if (currentQuote) statOutput.textContent = `${currentQuote.quote.length} characters, including spaces.`;
});

document.querySelector('#characters-without-spaces').addEventListener('click', () => {
	if (currentQuote) statOutput.textContent = `${currentQuote.quote.replace(/\s/g, '').length} characters, excluding spaces.`;
});

document.querySelector('#word-count').addEventListener('click', () => {
	if (currentQuote) statOutput.textContent = `${currentQuote.quote.trim().split(/\s+/).length} words.`;
});

document.querySelector('#like-quote').addEventListener('click', () => {
	if (!currentQuote) return;
	currentQuote.likes += 1;
	likeCount.textContent = currentQuote.likes;
});

saveButton.addEventListener('click', () => {
	if (!currentQuote) return;
	if (savedQuoteIds.has(currentQuote.id)) {
		savedQuoteIds.delete(currentQuote.id);
		saveButton.textContent = 'Save quote';
		statOutput.textContent = 'Quote removed from saved quotes.';
		return;
	}
	savedQuoteIds.add(currentQuote.id);
	saveButton.textContent = 'Saved';
	statOutput.textContent = 'Quote saved for later.';
});

document.querySelector('#copy-quote').addEventListener('click', async () => {
	if (!currentQuote) return;
	const textToCopy = `"${currentQuote.quote}" - ${currentQuote.author}`;
	try {
		await navigator.clipboard.writeText(textToCopy);
		statOutput.textContent = 'Quote copied to your clipboard.';
	} catch {
		statOutput.textContent = 'Copy is unavailable in this browser context.';
	}
});
