const form = document.querySelector('#gif-form');
const searchInput = document.querySelector('#gif-search');
const gifs = document.querySelector('#gifs');
const deleteAllButton = document.querySelector('#delete-all');

const apiKey = 'hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';

form.addEventListener('submit', event => {
	event.preventDefault();

	const search = searchInput.value.trim();
	if (!search) {
		return;
	}

	const url = new URL('https://api.giphy.com/v1/gifs/random');
	url.searchParams.set('api_key', apiKey);
	url.searchParams.set('tag', search);
	url.searchParams.set('rating', 'g');

	fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Request failed: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			const gifUrl = data.data?.images?.original?.url;
			if (!gifUrl) {
				throw new Error('No GIF was found for that search.');
			}

			const gifContainer = document.createElement('article');
			const gif = document.createElement('img');
			const deleteButton = document.createElement('button');

			gif.src = gifUrl;
			gif.alt = `Random GIF for ${search}`;
			deleteButton.type = 'button';
			deleteButton.textContent = 'DELETE';
			deleteButton.addEventListener('click', () => gifContainer.remove());

			gifContainer.append(gif, deleteButton);
			gifs.append(gifContainer);
		})
		.catch(error => {
			console.error(error);
		});
});

deleteAllButton.addEventListener('click', () => {
	gifs.replaceChildren();
});
