// Exercise 1: Nested functions
// Prediction: landscape() returns ____/''''\____. The inner functions share
// the result variable from landscape(), so each call adds to the same string.
const landscape = () => {
	let result = "";

	const flat = (x) => {
		for (let count = 0; count < x; count++) {
			result = result + "_";
		}
	};

	const mountain = (x) => {
		result = result + "/";
		for (let counter = 0; counter < x; counter++) {
			result = result + "'";
		}
		result = result + "\\";
	};

	flat(4);
	mountain(4);
	flat(4);

	return result;
};

console.log(landscape());

// Exercise 2: Closure
// Prediction: 13. addTo(10) returns a function that remembers x = 10.
const addTo = (x) => (y) => x + y;
const addToTen = addTo(10);
console.log(addToTen(3));

// Exercise 3: Currying
// Prediction: 31. The first call supplies a = 30 and returns a function
// waiting for b; the second call supplies b = 1.
const curriedSum = (a) => (b) => a + b;
console.log(curriedSum(30)(1));

// Exercise 4: Currying
// Prediction: 17. curriedSum(5) creates a function that adds 5 to its input.
const add5 = curriedSum(5);
console.log(add5(12));

// Exercise 5: Composing
// Prediction: 16. Composition applies g first, so add5(10) is 15, then
// add1(15) is 16.
const compose = (f, g) => (a) => f(g(a));
const add1 = (num) => num + 1;
const addFive = (num) => num + 5;
console.log(compose(add1, addFive)(10));
