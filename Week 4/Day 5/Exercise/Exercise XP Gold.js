const apiKeyInput = document.querySelector('#api-key');
const generateButton = document.querySelector('#generate-gif');
const gifContainer = document.querySelector('#gif-container');
const statusMessage = document.querySelector('#status-message');

apiKeyInput.value = localStorage.getItem('giphyApiKey') || '';
generateButton.addEventListener('click', fetchRandomGif);

async function fetchRandomGif() {
	const apiKey = apiKeyInput.value.trim();
	if (!apiKey) {
		statusMessage.textContent = 'Paste your Giphy API key first.';
		apiKeyInput.focus();
		return;
	}
	localStorage.setItem('giphyApiKey', apiKey);
	statusMessage.textContent = 'Loading a GIF...';

	try {
		const url = new URL('https://api.giphy.com/v1/gifs/search');
		url.searchParams.set('api_key', apiKey);
		url.searchParams.set('q', 'funny');
		url.searchParams.set('limit', '25');
		url.searchParams.set('rating', 'g');

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Giphy request failed: ${response.status}`);
		}

		const result = await response.json();
		if (!result.data.length) {
			throw new Error('The Giphy response contained no GIFs.');
		}

		const randomGif = result.data[Math.floor(Math.random() * result.data.length)];
		const image = document.createElement('img');
		image.src = randomGif.images.original.url;
		image.alt = randomGif.title || 'Random GIF';
		gifContainer.replaceChildren(image);
		statusMessage.textContent = 'Here is your random GIF.';
	} catch (error) {
		console.error(error);
		statusMessage.textContent = 'Unable to load a GIF.';
	}
}

// Exercise 2: the promises run sequentially. The second promise does not start
// until the first one has resolved, so the total time is about three seconds.
// Output order:
// ==SEQUENTIAL START==
// starting slow promise
// slow promise is done
// slow
// starting fast promise
// fast promise is done
// fast

// Exercise 3: both promises start immediately, so they run concurrently. The
// fast promise resolves first, but the code awaits slow before logging fast.
// Output order after four seconds:
// ==CONCURRENT START with await==
// starting slow promise
// starting fast promise
// fast promise is done
// slow promise is done
// slow
// fast

// Exercise 4: async fetch helper keeps all .then() calls out of getData().
const urls = [
	'https://jsonplaceholder.typicode.com/users',
	'https://jsonplaceholder.typicode.com/posts',
	'https://jsonplaceholder.typicode.com/albums'
];

async function fetchJson(url) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Request failed: ${response.status}`);
	}
	return await response.json();
}

async function getData() {
	try {
		const [users, posts, albums] = await Promise.all(
			urls.map(url => fetchJson(url))
		);
		console.log('users', users);
		console.log('posts', posts);
		console.log('albums', albums);
	} catch (error) {
		console.log('ooooooops');
		console.error(error);
	}
}

getData();
