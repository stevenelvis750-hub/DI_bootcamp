// Exercise 1
function printFullName({ first, last }) {
	return `Your full name is ${first} ${last}`;
}

console.log(printFullName({ first: "Steven", last: "Elvis" }));

// Exercise 2
function keysAndValues(object) {
	const keys = Object.keys(object).sort();
	const values = keys.map((key) => object[key]);

	return [keys, values];
}

console.log(keysAndValues({ a: 1, b: 2, c: 3 }));

// Exercise 3
class Counter {
	constructor() {
		this.count = 0;
	}

	increment() {
		this.count++;
	}
}

const counterOne = new Counter();
counterOne.increment();
counterOne.increment();

const counterTwo = counterOne;
counterTwo.increment();

console.log(counterOne.count);
