class Employee {
	private name: string;
	private salary: number;
	public position: string;
	protected department: string;

	constructor(
		name: string,
		salary: number,
		position: string,
		department: string,
	) {
		this.name = name;
		this.salary = salary;
		this.position = position;
		this.department = department;
	}

	public getEmployeeInfo(): string {
		return `${this.name} works as a ${this.position}`;
	}
}

const employee = new Employee("Noah", 72000, "Developer", "Technology");
console.log(employee.getEmployeeInfo());

class Product {
	constructor(
		public readonly id: number,
		public name: string,
		public price: number,
	) {}

	public getProductInfo(): string {
		return `${this.name}: $${this.price.toFixed(2)}`;
	}
}

const product = new Product(101, "Wireless Keyboard", 49.99);
console.log(product.getProductInfo());

// This assignment is rejected by TypeScript because id is readonly.
// product.id = 102;

class Animal {
	constructor(public name: string) {}

	public makeSound(): string {
		return "The animal makes a sound";
	}
}

class Dog extends Animal {
	public makeSound(): string {
		return "bark";
	}
}

const dog = new Dog("Buddy");
console.log(`${dog.name} says ${dog.makeSound()}`);

class Calculator {
	public static add(a: number, b: number): number {
		return a + b;
	}

	public static subtract(a: number, b: number): number {
		return a - b;
	}
}

console.log(Calculator.add(10, 5));
console.log(Calculator.subtract(10, 5));

interface User {
	readonly id: number;
	name: string;
	email: string;
}

interface PremiumUser extends User {
	membershipLevel?: string;
}

function printUserDetails(user: PremiumUser): void {
	const membership = user.membershipLevel ?? "Standard";
	console.log(`${user.name} (${user.email}) - ${membership}`);
}

const user: PremiumUser = {
	id: 1,
	name: "Ava",
	email: "ava@example.com",
	membershipLevel: "Gold",
};

printUserDetails(user);
