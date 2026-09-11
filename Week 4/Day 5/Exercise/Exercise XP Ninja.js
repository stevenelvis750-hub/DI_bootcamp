const apiKey = 'YOUR_GIPHY_API_KEY';
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const gifsContainer = document.querySelector('#gifs-container');
const deleteButton = document.querySelector('#delete-gifs');
const statusMessage = document.querySelector('#status-message');

searchForm.addEventListener('submit', event => {
	event.preventDefault();

	const category = searchInput.value.trim();
	if (!category) {
		statusMessage.textContent = 'Enter a category to search.';
		return;
	}

	searchGifs(category);
});

deleteButton.addEventListener('click', () => {
	gifsContainer.replaceChildren();
	statusMessage.textContent = 'All GIFs deleted.';
});

async function searchGifs(category) {
	statusMessage.textContent = 'Loading GIFs...';

	try {
		const url = new URL('https://api.giphy.com/v1/gifs/search');
		url.searchParams.set('api_key', apiKey);
		url.searchParams.set('q', category);
		url.searchParams.set('limit', '12');
		url.searchParams.set('rating', 'g');

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Giphy request failed: ${response.status} ${response.statusText}`);
		}

		const result = await response.json();
		const gifs = result.data ?? [];

		if (gifs.length === 0) {
			statusMessage.textContent = 'No GIFs found for that category.';
			return;
		}

		gifsContainer.replaceChildren(
			...gifs.map(gif => {
				const image = document.createElement('img');
				image.src = gif.images.original.url;
				image.alt = gif.title || `${category} GIF`;
				image.loading = 'lazy';
				return image;
			})
		);
		statusMessage.textContent = `${gifs.length} GIFs found.`;
	} catch (error) {
		console.error(error);
		statusMessage.textContent = 'Unable to load GIFs. Check the API key and try again.';
	}
}

// Exercise 2: the timer starts after one second, then both promises start together.
// The fast promise finishes first, but Promise.all logs results in array order:
// ==CONCURRENT START with Promise.all==
// starting slow promise
// starting fast promise
// fast promise is done
// slow promise is done
// slow
// fast

// Exercise 3: after five seconds, both async jobs start in parallel. The fast job
// logs "fast" after one more second, and the slow job logs "slow" one second later.

// Exercise 4: after thirteen seconds, both promises start in parallel. The fast
// promise logs "fast" after one second, followed by "slow" after two seconds.
