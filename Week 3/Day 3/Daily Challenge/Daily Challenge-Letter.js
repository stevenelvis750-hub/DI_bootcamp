const input = document.getElementById("lettersOnly");

input.addEventListener("input", () => {
  input.value = input.value.replace(/[^a-zA-Z]/g, "");
});
