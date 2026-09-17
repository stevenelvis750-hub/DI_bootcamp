interface User {
	name: string;
	email: string;
}

interface Admin {
	adminLevel: number;
}

type AdminUser = User & Admin;

function getProperty(object: AdminUser, propertyName: string): unknown {
	if (propertyName in object) {
		return object[propertyName as keyof AdminUser];
	}

	return undefined;
}

const adminUser: AdminUser = {
	name: "Ada Lovelace",
	email: "ada@example.com",
	adminLevel: 3,
};

console.log("Admin name:", getProperty(adminUser, "name"));
console.log("Missing property:", getProperty(adminUser, "role"));

function castToType<T>(value: unknown, converter: (value: unknown) => T): T {
	return converter(value);
}

const castNumber = castToType("42", Number);
const castBoolean = castToType("true", Boolean);

console.log("Casted number:", castNumber);
console.log("Casted boolean:", castBoolean);

function getArrayLength<T extends number | string>(items: T[]): number {
	return (items as Array<T>).length;
}

console.log("Number array length:", getArrayLength([1, 2, 3]));
console.log("String array length:", getArrayLength(["a", "b"]));

export interface Storage<T> {
	add(item: T): void;
	get(index: number): T | undefined;
}

class Box<T> implements Storage<T> {
	private items: T[] = [];

	add(item: T): void {
		this.items.push(item);
	}

	get(index: number): T | undefined {
		return this.items[index];
	}
}

const numberBox = new Box<number>();
numberBox.add(10);
console.log("Number from box:", numberBox.get(0));

const stringBox = new Box<string>();
stringBox.add("stored value");
console.log("String from box:", stringBox.get(0));

interface Item<T> {
	value: T;
}

class Queue<T> {
	private items: Item<T>[] = [];

	add(item: Item<T>): void {
		this.items.push(item);
	}

	remove(): Item<T> | undefined {
		return this.items.shift();
	}
}

const numberQueue = new Queue<number>();
numberQueue.add({ value: 100 });
console.log("Removed from number queue:", numberQueue.remove());

const stringQueue = new Queue<string>();
stringQueue.add({ value: "queued value" });
console.log("Removed from string queue:", stringQueue.remove());
