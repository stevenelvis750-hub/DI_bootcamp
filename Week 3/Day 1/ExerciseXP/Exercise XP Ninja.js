// Exercise 1: List of people

const people = ["Greg", "Mary", "Devon", "James"];

// Part I - Review about arrays
people.shift();
people[people.indexOf("James")] = "Jason";
people.push("YourName");

console.log(people.indexOf("Mary"));

const peopleCopy = people.slice(1, 3);
console.log(peopleCopy);

console.log(people.indexOf("Foo"));

const last = people[people.length - 1];
console.log(last);

// Part II - Loops
for (let i = 0; i < people.length; i++) {
  console.log(people[i]);
}

for (let i = 0; i < people.length; i++) {
  console.log(people[i]);
  if (people[i] === "Devon") {
    break;
  }
}

// Exercise 2: Your favorite colors

const colors = ["blue", "red", "green", "yellow", "purple"];

for (let i = 0; i < colors.length; i++) {
  console.log(`My #${i + 1} choice is ${colors[i]}`);
}

const suffixes = ["st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th"];
for (let i = 0; i < colors.length; i++) {
  const suffix = suffixes[i] || "th";
  console.log(`My ${i + 1}${suffix} choice is ${colors[i]}`);
}

// Exercise 3: Repeat the question

let number = Number(prompt("Please enter a number"));

while (number < 10) {
  number = Number(prompt("Enter a number that is 10 or greater"));
}

// Exercise 4: Building Management

const building = {
  numberOfFloors: 4,
  numberOfAptByFloor: {
    firstFloor: 3,
    secondFloor: 4,
    thirdFloor: 9,
    fourthFloor: 2,
  },
  nameOfTenants: ["Sarah", "Dan", "David"],
  numberOfRoomsAndRent: {
    sarah: [3, 990],
    dan: [4, 1000],
    david: [1, 500],
  },
};

console.log(building.numberOfFloors);
console.log(
  building.numberOfAptByFloor.firstFloor +
    building.numberOfAptByFloor.thirdFloor
);
console.log(
  building.nameOfTenants[1],
  building.numberOfRoomsAndRent.dan[0]
);

const sarahRent = building.numberOfRoomsAndRent.sarah[1];
const davidRent = building.numberOfRoomsAndRent.david[1];
const danRent = building.numberOfRoomsAndRent.dan[1];

if (sarahRent + davidRent > danRent) {
  building.numberOfRoomsAndRent.dan[1] = 1200;
}

// Exercise 5: Family

const family = {
  father: "Ahmed",
  mother: "Sara",
  son: "Youssef",
  daughter: "Lina",
};

for (const key in family) {
  console.log(key);
}

for (const key in family) {
  console.log(family[key]);
}

// Exercise 6: Rudolf

const details = {
  my: "name",
  is: "Rudolf",
  the: "reindeer",
};

let sentence = "";
for (const key in details) {
  sentence += `${key} ${details[key]} `;
}
console.log(sentence.trim());

// Exercise 7: Secret Group

const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];
const sortedNames = [...names].sort();
let secretSociety = "";

for (let i = 0; i < sortedNames.length; i++) {
  secretSociety += sortedNames[i][0];
}

console.log(secretSociety);
