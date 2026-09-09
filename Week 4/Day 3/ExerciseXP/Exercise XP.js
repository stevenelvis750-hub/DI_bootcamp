const marioGame = {
	detail: 'An amazing game!',
	characters: {
		mario: {
			description: 'Small and jumpy. Likes princesses.',
			height: 10,
			weight: 3,
			speed: 12
		},
		bowser: {
			description: 'Big and green, Hates princesses.',
			height: 16,
			weight: 6,
			speed: 4
		},
		princessPeach: {
			description: 'Beautiful princess.',
			height: 12,
			weight: 2,
			speed: 2
		}
	}
};

const compactMarioJson = JSON.stringify(marioGame);
const prettyMarioJson = JSON.stringify(marioGame, null, 2);

console.log('Compact Mario JSON:', compactMarioJson);
console.log('Pretty Mario JSON:', prettyMarioJson);
debugger;

const compactOutput = document.querySelector('#compact-json');
const prettyOutput = document.querySelector('#pretty-json');
if (compactOutput && prettyOutput) {
	compactOutput.textContent = compactMarioJson;
	prettyOutput.textContent = prettyMarioJson;
}

const params = new URLSearchParams(window.location.search);
const name = params.get('name');
const message = params.get('message');
const resultSection = document.querySelector('#get-result');
const placeholder = document.querySelector('#result-placeholder');

if (resultSection && placeholder && name !== null && message !== null) {
	placeholder.remove();
	const sentData = document.createElement('dl');
	sentData.className = 'sent-data';
	sentData.innerHTML = `
		<div><dt>Name</dt><dd>${escapeHtml(name)}</dd></div>
		<div><dt>Message</dt><dd>${escapeHtml(message)}</dd></div>
	`;
	resultSection.append(sentData);
}

function escapeHtml(value) {
	const element = document.createElement('div');
	element.textContent = value;
	return element.innerHTML;
}
