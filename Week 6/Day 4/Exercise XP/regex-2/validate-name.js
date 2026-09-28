function isValidFullName(name) {
  return /^[A-Z][a-zA-Z]* [A-Z][a-zA-Z]*$/.test(name.trim());
}

module.exports = isValidFullName;