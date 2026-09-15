function validateUnionType(value: any, allowedTypes: string[]): boolean {
	return allowedTypes.includes(typeof value);
}

const userName = "Alice";
const userAge = 30;
const isActive = true;
const scores = [95, 88, 76];

console.log(validateUnionType(userName, ["string", "number"]));
console.log(validateUnionType(userAge, ["string", "number"]));
console.log(validateUnionType(isActive, ["string", "number"]));
console.log(validateUnionType(scores, ["object"]));
