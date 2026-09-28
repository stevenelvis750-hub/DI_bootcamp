function returnNumbers(value) {
  return (value.match(/\d/g) || []).join("");
}

module.exports = returnNumbers;