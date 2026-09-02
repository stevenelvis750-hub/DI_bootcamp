// -----------------------------
// Exercise 1: Random Number
// -----------------------------
const randomNumber = Math.floor(Math.random() * 100) + 1;

console.log("Random number:", randomNumber);

console.log("Even numbers from 0 to random number:");
for (let i = 0; i <= randomNumber; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}

// -----------------------------
// Exercise 2: Capitalized letters
// -----------------------------
function capitalize(str) {
  const evenCaps = [];
  const oddCaps = [];

  for (let i = 0; i < str.length; i++) {
    evenCaps.push(i % 2 === 0 ? str[i].toUpperCase() : str[i]);
    oddCaps.push(i % 2 !== 0 ? str[i].toUpperCase() : str[i]);
  }

  return [evenCaps.join(""), oddCaps.join("")];
}

console.log(capitalize("abcdef")); // ['AbCdEf', 'aBcDeF']

// -----------------------------
// Exercise 3: Is palindrome?
// -----------------------------
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  const reversed = cleaned.split("").reverse().join("");
  return cleaned === reversed;
}

console.log(isPalindrome("madam")); // true
console.log(isPalindrome("hello")); // false

// -----------------------------
// Exercise 4: Biggest Number
// -----------------------------
function biggestNumberInArray(arrayNumber) {
  if (!Array.isArray(arrayNumber) || arrayNumber.length === 0) {
    return 0;
  }

  let biggest = 0;

  for (let i = 0; i < arrayNumber.length; i++) {
    const value = Number(arrayNumber[i]);

    if (!isNaN(value) && value > biggest) {
      biggest = value;
    }
  }

  return biggest;
}

console.log(biggestNumberInArray([-1, 0, 3, 100, 99, 2, 99])); // 100
console.log(biggestNumberInArray(["a", 3, 4, 2])); // 4
console.log(biggestNumberInArray([])); // 0

// -----------------------------
// Exercise 5: Unique Elements
// -----------------------------
function uniqueElements(arr) {
  return [...new Set(arr)];
}

console.log(uniqueElements([1, 2, 3, 3, 3, 3, 4, 5])); // [1,2,3,4,5]

// -----------------------------
// Exercise 6: Calendar
// -----------------------------
function createCalendar(year, month) {
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);
  const firstWeekday = (firstDayOfMonth.getDay() + 6) % 7; // Monday = 0
  const daysInMonth = lastDayOfMonth.getDate();

  if (typeof document !== "undefined") {
    const table = document.createElement("table");
    const headerRow = document.createElement("tr");

    weekdays.forEach(day => {
      const th = document.createElement("th");
      th.textContent = day;
      headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    let currentRow = document.createElement("tr");
    for (let i = 0; i < firstWeekday; i++) {
      const emptyCell = document.createElement("td");
      currentRow.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement("td");
      cell.textContent = day;

      if (currentRow.children.length % 7 === 0 && day !== 1) {
        table.appendChild(currentRow);
        currentRow = document.createElement("tr");
      }

      currentRow.appendChild(cell);
    }

    table.appendChild(currentRow);
    document.body.appendChild(table);
    return;
  }

  // Fallback for Node.js: print the calendar to the console
  const rows = [];
  let currentWeek = new Array(7).fill("");

  for (let i = 0; i < firstWeekday; i++) {
    currentWeek["sun", "mon", "tue", "wed", "thu", "fri", "sat"]= "";
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const index = firstWeekday + day - 1;
    const weekIndex = Math.floor(index / 7);
    const dayIndex = index % 7;

    if (!rows[weekIndex]) {
      rows[weekIndex] = new Array(7).fill("");
    }

    rows[weekIndex][dayIndex] = day;
  }

  console.log("Calendar for", year, "-", month);
  console.log(weekdays.join("   "));
  rows.forEach(week => {
    const line = week.map(value => String(value).padStart(2, " ")).join("   ");
    console.log(line);
  });
}

// Example:
createCalendar(2026, 9);