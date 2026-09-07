// Exercise 1: Analyzing map
const mapResult = [1, 2, 3].map((num) => {
	if (typeof num === "number") return num * 2;
	return;
});

// Output: [2, 4, 6]
console.log(mapResult);

// Exercise 2: Analyzing reduce
const reduceResult = [[0, 1], [2, 3]].reduce(
	(acc, cur) => acc.concat(cur),
	[1, 2]
);

// Output: [1, 2, 0, 1, 2, 3]
console.log(reduceResult);

// Exercise 3: The map index
const arrayNum = [1, 2, 4, 5, 8, 9];
const newArray = arrayNum.map((num, i) => {
	console.log("Value and index:", num, i);
	return num * 2;
});

// i is the zero-based index: 0, 1, 2, 3, 4, then 5.
console.log("Mapped values:", newArray);

// Exercise 4: Nested arrays
const array = [[1], [2], [3], [[[4]]], [[[5]]]];
const flattenedArray = array.flat(2);
const flattenedArrayInOneLine = [[1], [2], [3], [[[4]]], [[[5]]]].flat(2);

// Output: [1, 2, 3, [4], [5]]
console.log(flattenedArray);
console.log(flattenedArrayInOneLine);

const greeting = [
	["Hello", "young", "grasshopper!"],
	["you", "are"],
	["learning", "fast!"]
];
const greetingLines = greeting.map((line) => line.join(" "));
const greetingString = greetingLines.join(" ");

console.log(greetingLines);
console.log(greetingString);

const trapped = [[[[[[[[[[[[[[[[[[[[[[[[[[3]]]]]]]]]]]]]]]]]]]]]]]]]];
const freedNumber = trapped.flat(Infinity);

// Output: [3]
console.log(freedNumber);
