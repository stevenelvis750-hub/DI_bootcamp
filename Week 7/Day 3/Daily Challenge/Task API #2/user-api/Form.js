// Shared by login.html and register.html.
// Keeps the submit button disabled until every input has something in it.
(() => {
  const form = document.querySelector('#form');
  const button = form.querySelector('button[type="submit"]');
  const message = document.querySelector('#message');
  const inputs = [...form.querySelectorAll('input')];

  const allFilled = () => inputs.every((input) => input.value.trim() !== '');
  const updateButton = () => { button.disabled = !allFilled(); };
  const show = (text, type) => {
    message.textContent = text;
    message.className = `message ${type}`;
  };

  inputs.forEach((input) => input.addEventListener('input', updateButton));
  updateButton();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!allFilled()) return;

    button.disabled = true;
    show('', '');
    const body = Object.fromEntries(inputs.map((input) => [input.name, input.value]));

    try {
      const res = await fetch(form.dataset.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      show(data.message || 'Something went wrong', res.ok ? 'success' : 'error');
      if (res.ok) form.reset();
    } catch {
      show('Could not reach the server. Please try again.', 'error');
    } finally {
      updateButton();
    }
  });
})();