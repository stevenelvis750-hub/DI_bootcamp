type Person = {
	name: string;
	age: number;
};

type Address = {
	street: string;
	city: string;
};

type PersonWithAddress = Person & Address;

const personWithAddress: PersonWithAddress = {
	name: "Ada Lovelace",
	age: 36,
	street: "1 Analytical Engine Lane",
	city: "London",
};

console.log("Person with address:", personWithAddress);

function describeValue(value: number | string): string {
	if (typeof value === "number") {
		return "This is a number";
	}

	return "This is a string";
}

console.log(describeValue(42));
console.log(describeValue("TypeScript"));

const someValue: any = "This value is cast to a string";
const stringValue = someValue as string;
console.log("String value:", stringValue.toUpperCase());

function getFirstElement(elements: (number | string)[]): string {
	return elements[0] as string;
}

console.log("First string:", getFirstElement(["first", 2, "third"]));

function logLength<T extends { length: number }>(value: T): void {
	console.log("Length:", value.length);
}

logLength("Hello");
logLength([1, 2, 3]);

type Manager = {
	position: "Manager";
	department: string;
};

type Developer = {
	position: "Developer";
	department: string;
};

type Job = Manager | Developer;
type Employee = Person & Job;

function describeEmployee(employee: Employee): string {
	if (employee.position === "Manager") {
		return `${employee.name} is a manager in the ${employee.department} department.`;
	}

	return `${employee.name} is a developer in the ${employee.department} department.`;
}

const manager: Employee = {
	name: "Grace Hopper",
	age: 47,
	position: "Manager",
	department: "Engineering",
};

const developer: Employee = {
	name: "Linus Torvalds",
	age: 30,
	position: "Developer",
	department: "Platform",
};

console.log(describeEmployee(manager));
console.log(describeEmployee(developer));

function formatInput<T extends { toString(): string }>(input: T): string {
	const formattedInput = input.toString() as string;
	return formattedInput.trim();
}

console.log("Formatted input:", formatInput(12345));
console.log("Formatted input:", formatInput("  ready  "));
