console.log("Hello, World!");

const age: number = 25;
const name: string = "Alice";
console.log(age, name);

let id: string | number = 12345;
console.log(id);
id = "user-12345";
console.log(id);

function describeNumber(value: number): string {
	if (value > 0) {
		return "The number is positive.";
	} else if (value < 0) {
		return "The number is negative.";
	}

	return "The number is zero.";
}

console.log(describeNumber(10));
console.log(describeNumber(-3));
console.log(describeNumber(0));

function getDetails(userName: string, userAge: number): [string, number, string] {
	return [
		userName,
		userAge,
		`Hello, ${userName}! You are ${userAge} years old.`,
	];
}

const details = getDetails("Alice", 25);
console.log(details);

type Person = {
	name: string;
	age: number;
};

function createPerson(personName: string, personAge: number): Person {
	return { name: personName, age: personAge };
}

const person = createPerson("Bob", 30);
console.log(person);

function setInputValue(elementId: string, value: string): void {
	const input = document.getElementById(elementId) as HTMLInputElement;
	input.value = value;
}

if (typeof document !== "undefined") {
	setInputValue("name-input", "Alice");
}

function getAction(role: string): string {
	switch (role) {
		case "admin":
			return "Manage users and settings";
		case "editor":
			return "Edit content";
		case "viewer":
			return "View content";
		case "guest":
			return "Limited access";
		default:
			return "Invalid role";
	}
}

console.log(getAction("admin"));
console.log(getAction("editor"));
console.log(getAction("viewer"));
console.log(getAction("guest"));
console.log(getAction("unknown"));

function greet(): string;
function greet(userName: string): string;
function greet(userName = "there"): string {
	return `Hello, ${userName}!`;
}

console.log(greet("Alice"));
console.log(greet());
