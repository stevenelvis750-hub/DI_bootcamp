const _ = require("lodash");
const { add, multiply } = require("./math");

const numbers = [2, 4, 6];
console.log(`2 + 4 = ${add(2, 4)}`);
console.log(`3 * 5 = ${multiply(3, 5)}`);
console.log(`Sum of ${numbers.join(", ")} = ${_.sum(numbers)}`);
console.log(`Average = ${_.mean(numbers)}`);