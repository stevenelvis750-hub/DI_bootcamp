const form = document.querySelector('#person-form');
const output = document.querySelector('#json-output');

form.addEventListener('submit', (event) => {
	event.preventDefault();

	const person = {
		name: form.elements.name.value.trim(),
		lastName: form.elements.lastName.value.trim()
	};

	const jsonString = JSON.stringify(person);
	const outputLine = document.createElement('p');
	outputLine.className = 'json-line';
	outputLine.textContent = jsonString;
	output.append(outputLine);
	form.reset();
});
