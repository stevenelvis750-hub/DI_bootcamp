// Exercise 1: Scope

// #1 Prediction: 3. `a` is local to funcOne and is changed from 5 to 3.
function funcOne() {
	let a = 5;
	if (a > 1) {
		a = 3;
	}
	console.log(`inside the funcOne function ${a}`);
}

funcOne();

// #1.2 With const, assigning a = 3 causes a TypeError because const cannot
// be reassigned.

// #2 Predictions: 0, then 5. funcTwo changes the global `a`, which funcThree
// reads. With const instead of let, funcTwo causes a TypeError on assignment.
{
	let a = 0;
	function funcTwo() {
		a = 5;
	}
	function funcThree() {
		console.log(`inside the funcThree function ${a}`);
	}

	funcThree();
	funcTwo();
	funcThree();
}

// #3 Prediction: "hello". funcFour writes to the global window.a property,
// and funcFive reads that global property. This example requires a browser.
function funcFour() {
	window.a = "hello";
}

function funcFive() {
	console.log(`inside the funcFive function ${a}`);
}

if (typeof window !== "undefined") {
	funcFour();
	funcFive();
}

// #4 Prediction: "test". The local a shadows the outer a inside funcSix.
// Changing either declaration from let to const still prints "test", because
// no reassignment occurs.
{
	let a = 1;
	function funcSix() {
		let a = "test";
		console.log(`inside the funcSix function ${a}`);
	}

	funcSix();
}

// #5 Predictions: 5, then 2. The block's a is separate from the outer a.
// Changing let to const still prints the same values because neither a is
// reassigned.
{
	let a = 2;
	if (true) {
		let a = 5;
		console.log(`in the if block ${a}`);
	}
	console.log(`outside of the if block ${a}`);
}

// Exercise 2: Ternary operator
const winBattle = () => true;
const experiencePoints = winBattle() ? 10 : 1;
console.log(experiencePoints);

// Exercise 3: Is it a string?
const isString = (value) => typeof value === "string";
console.log(isString("hello"));
console.log(isString([1, 2, 4, 0]));

// Exercise 4: Find the sum
const sum = (firstNumber, secondNumber) => firstNumber + secondNumber;
console.log(sum(4, 6));

// Exercise 5: Kg and grams
function kilogramsToGrams(weightInKilograms) {
	return weightInKilograms * 1000;
}
console.log(kilogramsToGrams(2));

const kilogramsToGramsExpression = function (weightInKilograms) {
	return weightInKilograms * 1000;
};
console.log(kilogramsToGramsExpression(2));

// A declaration is hoisted and can be called before its definition; an
// expression is assigned to a variable and is not usable before that line.
const kilogramsToGramsArrow = (weightInKilograms) => weightInKilograms * 1000;
console.log(kilogramsToGramsArrow(2));

const addToPage = (selector, text) => {
	if (typeof document === "undefined") {
		return;
	}

	const element = document.querySelector(selector);
	if (element) {
		const paragraph = document.createElement("p");
		paragraph.textContent = text;
		element.appendChild(paragraph);
	}
};

// Exercise 6: Fortune teller
(function (numberOfChildren, partnerName, geographicLocation, jobTitle) {
	addToPage(
		"#fortune-output",
		`You will be a ${jobTitle} in the ${geographicLocation}, and have the intact with the best of the best in world-wide who is ${partnerName} with international holders that are more than ${numberOfChildren} businesses holder.`
	);
})(2, "Elvis", "World-wide", "Multi Billionaire");

// Exercise 7: Welcome
(function (userName) {
	if (typeof document === "undefined") {
		return;
	}

	const navbar = document.querySelector("#navbar");
	if (navbar) {
		const profile = document.createElement("div");
		profile.className = "profile";
		profile.innerHTML = `<img src="https://i.pravatar.cc/80?img=12" alt="Profile picture of ${userName}"><span>${userName}</span>`;
		navbar.appendChild(profile);
	}
})("John");

// Exercise 8: Juice Bar, Part II extends Part I by collecting six ingredients
// before displaying the completed juice.
function makeJuice(size) {
	const ingredients = [];

	function addIngredients(firstIngredient, secondIngredient, thirdIngredient) {
		ingredients.push(firstIngredient, secondIngredient, thirdIngredient);
	}

	function displayJuice() {
		addToPage(
			"#juice-output",
			`The client wants a ${size} drink juice, containing ${ingredients.join(", ")}.`
		);
	}

	addIngredients("apple", "ginger", "lemon");
	addIngredients("mint", "spinach", "banana");
	displayJuice();
}

makeJuice("large");
