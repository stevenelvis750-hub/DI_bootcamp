// Exercise 1: is_Blank
function isBlank(str) {
  return str.trim() === "";
}

console.log(isBlank(""));
console.log(isBlank("abc"));

// Exercise 2: Abbrev_name
function abbrevName(name) {
  const parts = name.split(" ");
  return parts[0] + " " + parts[1][0] + ".";
}

console.log(abbrevName("Steven Elvis"));

// Exercise 3: SwapCase
function swapCase(str) {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === char.toUpperCase()) {
      result += char.toLowerCase();
    } else {
      result += char.toUpperCase();
    }
  }

  return result;
}

console.log(swapCase("The Quick Brown Fox"));

// Exercise 4: Omnipresent value
function isOmnipresent(array, value) {
  return array.every((subArray) => subArray.includes(value));
}

console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 1));
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 6));

// Exercise 5: Red table
if (typeof document !== "undefined") {
  const table = document.body.firstElementChild;

  for (let row = 0; row < table.rows.length; row++) {
    for (let col = 0; col < table.rows[row].cells.length; col++) {
      if (row === col) {
        table.rows[row].cells[col].style.backgroundColor = "red";
      }
    }
  }
} else {
  console.log("Browser DOM is not available. Red-table exercise skipped in Node.js.");
}