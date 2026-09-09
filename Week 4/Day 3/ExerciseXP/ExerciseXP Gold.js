const submittedData = document.querySelector('#submitted-data');
const params = new URLSearchParams(window.location.search);
const name = params.get('name')?.trim();
const lastname = params.get('lastname')?.trim();

if (submittedData && name && lastname) {
	const nameLine = document.createElement('p');
	nameLine.className = 'detail';
	nameLine.innerHTML = `<strong>Name</strong> ${escapeHtml(name)}`;

	const lastnameLine = document.createElement('p');
	lastnameLine.className = 'detail';
	lastnameLine.innerHTML = `<strong>Last name</strong> ${escapeHtml(lastname)}`;

	submittedData.append(nameLine, lastnameLine);
} else if (submittedData) {
	const errorMessage = document.createElement('p');
	errorMessage.className = 'error-message';
	errorMessage.textContent = 'No form details were submitted yet.';
	submittedData.append(errorMessage);
}

function escapeHtml(value) {
	const element = document.createElement('div');
	element.textContent = value;
	return element.innerHTML;
}
