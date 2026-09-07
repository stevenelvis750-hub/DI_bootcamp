// Exercise 1: Dog age to human years
const data = [
	{
		name: "Butters",
		age: 3,
		type: "dog"
	},
	{
		name: "Cuty",
		age: 5,
		type: "rabbit"
	},
	{
		name: "Lizzy",
		age: 6,
		type: "dog"
	},
	{
		name: "Red",
		age: 1,
		type: "cat"
	},
	{
		name: "Joey",
		age: 3,
		type: "dog"
	},
	{
		name: "Rex",
		age: 10,
		type: "dog"
	}
];

let dogYearsWithLoop = 0;
for (const animal of data) {
	if (animal.type === "dog") {
		dogYearsWithLoop += animal.age * 7;
	}
}

const dogYearsWithReduce = data.reduce((total, animal) => {
	return animal.type === "dog" ? total + animal.age * 7 : total;
}, 0);

console.log("Dog years with loop:", dogYearsWithLoop);
console.log("Dog years with reduce:", dogYearsWithReduce);

// Exercise 2: Email
const userEmail3 = " cannotfillemailformcorrectly@gmail.com ";
const cleanedEmail = userEmail3.trim();

console.log(cleanedEmail);

// Exercise 3: Employees
const users = [
	{ firstName: "Bradley", lastName: "Bouley", role: "Full Stack Resident" },
	{ firstName: "Chloe", lastName: "Alnaji", role: "Full Stack Resident" },
	{ firstName: "Jonathan", lastName: "Baughn", role: "Enterprise Instructor" },
	{ firstName: "Michael", lastName: "Herman", role: "Lead Instructor" },
	{ firstName: "Robert", lastName: "Hajek", role: "Full Stack Resident" },
	{ firstName: "Wes", lastName: "Reid", role: "Instructor" },
	{ firstName: "Zach", lastName: "Klabunde", role: "Instructor" }
];

const usersByName = users.reduce((result, user) => {
	result[`${user.firstName} ${user.lastName}`] = user.role;
	return result;
}, {});

console.log(usersByName);

// Exercise 4: Array to object
const letters = ["x", "y", "z", "z"];

const letterCountsWithLoop = {};
for (const letter of letters) {
	letterCountsWithLoop[letter] = (letterCountsWithLoop[letter] || 0) + 1;
}

const letterCountsWithReduce = letters.reduce((counts, letter) => {
	counts[letter] = (counts[letter] || 0) + 1;
	return counts;
}, {});

console.log(letterCountsWithLoop);
console.log(letterCountsWithReduce);
