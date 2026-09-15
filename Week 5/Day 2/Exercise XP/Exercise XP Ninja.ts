type MappedType<T> = T extends number
	? number
	: T extends string
		? number
		: never;

function mapType<T extends number | string>(value: T): MappedType<T> {
	if (typeof value === "number") {
		return (value * value) as MappedType<T>;
	}

	return value.length as MappedType<T>;
}

function getProperty<ObjectType, Key extends keyof ObjectType>(
	object: ObjectType,
	key: Key,
): ObjectType[Key] {
	return object[key];
}

interface HasNumericProperty {
	[key: string]: number;
}

function multiplyProperty<Key extends string>(
	object: HasNumericProperty,
	key: Key,
	factor: number,
): number {
	return object[key]! * factor;
}

const squaredNumber = mapType(5);
const stringLength = mapType("TypeScript");

const user = { name: "Alice", age: 30 };
const userName = getProperty(user, "name");
const userAge = getProperty(user, "age");

const dimensions = { width: 10, height: 5 };
const doubledWidth = multiplyProperty(dimensions, "width", 2);

console.log(squaredNumber, stringLength, userName, userAge, doubledWidth);
