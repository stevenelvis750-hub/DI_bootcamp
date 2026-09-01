const people = ["Greg", "Mary", "Devon", "James"];

// 1. Remove "Greg"
people.shift();

console.log(people);


// 2. Replace "James" with "Jason"
people[2] = "Jason";

console.log(people);


// 3. Add your name to the end
people.push("Steven");

console.log(people);


// 4. Console.log Mary's index
console.log(people.indexOf("Mary"));


// 5. Make a copy WITHOUT Mary or your name
const peopleCopy = people.slice(1, 3);

console.log(peopleCopy);


// 6. Find the index of "Foo"
console.log(people.indexOf("Foo"));


// 7. Create a variable called last
const last = people[people.length - 1];

console.log(last);


#Exercise 2
const colors = ["blue", "red", "green", "purple", "black"];

for (let i = 0; i < colors.length; i++) {
    console.log("My #" + (i + 1) + " choice is " + colors[i]);
}


#Exercise 3
let number = Number(prompt("Enter a number:"));

while (number < 10) {
    number = Number(prompt("Enter a new number:"));
}

console.log("Your number is " + number);


#Exercise 4
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


#Exercise 5
const family = {
    father: "John",
    mother: "Mary",
    son: "David",
    daughter: "Sarah"
};



#Exercise 6
const details = {
    my: "name",
    is: "Rudolf",
    the: "reindeer"
};

let sentence = "";

for (let key in details) {
    sentence += key + " " + details[key] + " ";
}

console.log(sentence);


#Exercise 7
const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

let firstLetters = [];

for (let name of names) {
    firstLetters.push(name[0]);
}

firstLetters.sort();

console.log(firstLetters.join(""));