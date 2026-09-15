function processValue(value: string | number): string {
	if (typeof value === "number") {
		return `$${value.toFixed(2)}`;
	}

	return value.split("").reverse().join("");
}

function sumNumbersInArray(values: Array<number | string>): number {
	return values.reduce<number>((sum, value) => {
		return typeof value === "number" ? sum + value : sum;
	}, 0);
}

type AdvancedUser = {
	name: string;
	age: number;
	address?: string;
};

function introduceAdvancedUser(user: AdvancedUser): string {
	const introduction = `${user.name} is ${user.age} years old`;

	return user.address
		? `${introduction} and lives at ${user.address}.`
		: `${introduction}.`;
}

function welcomeUser(name: string, greeting = "Hello"): string {
	return `${greeting}, ${name}!`;
}

const formattedNumber = processValue(100);
const reversedString = processValue("TypeScript");
const numbersOnlySum = sumNumbersInArray([10, "ignored", 5, "also ignored"]);
const userWithAddress = introduceAdvancedUser({
	name: "Alice",
	age: 30,
	address: "42 Main Street",
});
const userWithoutAddress = introduceAdvancedUser({ name: "Bob", age: 25 });
const defaultWelcome = welcomeUser("Alice");
const customWelcome = welcomeUser("Bob", "Good morning");

console.log(
	formattedNumber,
	reversedString,
	numbersOnlySum,
	userWithAddress,
	userWithoutAddress,
	defaultWelcome,
	customWelcome,
);
