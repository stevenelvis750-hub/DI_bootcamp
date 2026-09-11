const giphyApiKey = 'hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';

async function fetchJson(url) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Request failed: ${response.status} ${response.statusText}`);
	}
	return await response.json();
}

// Exercise 1: retrieve and log the Giphy search response.
async function fetchHilariousGifs() {
	const url = new URL('https://api.giphy.com/v1/gifs/search');
	url.searchParams.set('q', 'hilarious');
	url.searchParams.set('rating', 'g');
	url.searchParams.set('api_key', giphyApiKey);

	try {
		const data = await fetchJson(url);
		console.log('Exercise 1:', data);
	} catch (error) {
		console.error('Exercise 1 failed:', error);
	}
}

// Exercise 2: retrieve 10 sun GIFs, starting at result position 2.
async function fetchSunGifs() {
	const url = new URL('https://api.giphy.com/v1/gifs/search');
	url.searchParams.set('q', 'sun');
	url.searchParams.set('limit', '10');
	url.searchParams.set('offset', '2');
	url.searchParams.set('rating', 'g');
	url.searchParams.set('api_key', giphyApiKey);

	try {
		const data = await fetchJson(url);
		console.log('Exercise 2:', data);
	} catch (error) {
		console.error('Exercise 2 failed:', error);
	}
}

// Exercise 3: the request uses async/await and contains no then() calls.
async function fetchStarship() {
	try {
		const starship = await fetchJson('https://www.swapi.tech/api/starships/9/');
		console.log('Exercise 3:', starship.result);
	} catch (error) {
		console.error('Exercise 3 failed:', error);
	}
}

fetchHilariousGifs();
fetchSunGifs();
fetchStarship();

// Exercise 4 output:
// calling
// (two seconds later) resolved
// asyncCall logs "calling" immediately. It pauses at await while the promise
// waits two seconds, then logs "resolved" after the promise fulfills.
