const form = document.querySelector('#sunrise-form');
const results = document.querySelector('#results');

form.addEventListener('submit', event => {
	event.preventDefault();

	const locations = [
		{
			name: 'City 1',
			latitude: document.querySelector('#city-1-latitude').value,
			longitude: document.querySelector('#city-1-longitude').value
		},
		{
			name: 'City 2',
			latitude: document.querySelector('#city-2-latitude').value,
			longitude: document.querySelector('#city-2-longitude').value
		}
	];

	results.textContent = 'Loading sunrise times...';

	const sunriseRequests = locations.map(location => {
		const url = new URL('https://api.sunrise-sunset.org/json');
		url.searchParams.set('lat', location.latitude);
		url.searchParams.set('lng', location.longitude);
		url.searchParams.set('formatted', '0');

		return fetch(url)
			.then(response => {
				if (!response.ok) {
					throw new Error(`Request failed: ${response.status}`);
				}
				return response.json();
			})
			.then(data => {
				if (data.status !== 'OK') {
					throw new Error(`Sunrise API error: ${data.status}`);
				}
				return data.results.sunrise;
			});
	});

	Promise.all(sunriseRequests)
		.then(sunriseTimes => {
			results.replaceChildren(
				...sunriseTimes.map((time, index) => {
					const paragraph = document.createElement('p');
					paragraph.textContent = `${locations[index].name} sunrise: ${new Date(time).toLocaleTimeString([], {
						hour: '2-digit',
						minute: '2-digit'
					})}`;
					return paragraph;
				})
			);
		})
		.catch(error => {
			console.error(error);
			results.textContent = 'Unable to retrieve the sunrise times.';
		});
});
