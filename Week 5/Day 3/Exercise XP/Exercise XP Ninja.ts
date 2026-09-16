class Employee {
	public name: string;
	private age: number;
	protected salary: number;

	constructor(name: string, age: number, salary: number) {
		this.name = name;
		this.age = age;
		this.salary = salary;
	}

	public getAge(): number {
		return this.age;
	}

	protected calculateBonus(): number {
		return this.salary * 0.1;
	}

	public getSalaryDetails(): string {
		return `${this.name}'s salary is $${this.salary.toFixed(2)}`;
	}
}

class Manager extends Employee {
	public getSalaryDetails(): string {
		const bonus = this.calculateBonus();
		return `${this.name}'s salary is $${this.salary.toFixed(2)}, with a bonus of $${bonus.toFixed(2)}`;
	}
}

class ExecutiveManager extends Manager {
	public approveBudget(amount: number): string {
		return `${this.name} approved a budget of $${amount.toFixed(2)}`;
	}
}

const executive = new ExecutiveManager("Amina", 38, 120000);
console.log(executive.name);
console.log(executive.getAge());
console.log(executive.getSalaryDetails());
console.log(executive.approveBudget(50000));

class Shape {
	public static totalShapes = 0;

	constructor() {
		Shape.totalShapes += 1;
	}

	public static getType(): string {
		return "Shape";
	}
}

class Circle extends Shape {
	constructor(public radius: number) {
		super();
	}

	public area(): number {
		return Math.PI * this.radius ** 2;
	}

	public static getType(): string {
		return "Circle";
	}
}

class Square extends Shape {
	constructor(public side: number) {
		super();
	}

	public area(): number {
		return this.side ** 2;
	}

	public static getType(): string {
		return "Square";
	}
}

const circle = new Circle(5);
const square = new Square(4);
console.log(Circle.getType(), circle.area());
console.log(Square.getType(), square.area());
console.log(`Total shapes: ${Shape.totalShapes}`);

type Operation = (first: number, second: number) => number;

interface Calculator {
	a: number;
	b: number;
	operate(operation: Operation): number;
}

class AdvancedCalculator implements Calculator {
	constructor(public a: number, public b: number) {}

	public operate(operation: Operation): number {
		return operation(this.a, this.b);
	}

	public add(): number {
		return this.operate((first, second) => first + second);
	}

	public subtract(): number {
		return this.operate((first, second) => first - second);
	}

	public multiply(): number {
		return this.operate((first, second) => first * second);
	}
}

const calculator = new AdvancedCalculator(12, 4);
console.log(calculator.add(), calculator.subtract(), calculator.multiply());

class Device {
	constructor(public readonly serialNumber: string) {}

	public getInfo(): string {
		return `Serial number: ${this.serialNumber}`;
	}
}

class Laptop extends Device {
	constructor(
		serialNumber: string,
		public model: string,
		public price: number,
	) {
		super(serialNumber);
	}

	public getInfo(): string {
		return `${super.getInfo()}, model: ${this.model}, price: $${this.price.toFixed(2)}`;
	}
}

const laptop = new Laptop("LT-2025-001", "ThinkBook", 899);
laptop.model = "ThinkBook Pro";
laptop.price = 999;
console.log(laptop.getInfo());

interface Product {
	readonly name: string;
	price: number;
	discount?: number;
}

interface Electronics extends Product {
	warrantyPeriod: number;
}

class Smartphone implements Electronics {
	public readonly name: string;
	public price: number;
	public warrantyPeriod: number;
	public discount?: number;

	constructor(
		name: string,
		price: number,
		warrantyPeriod: number,
		discount?: number,
	) {
		this.name = name;
		this.price = price;
		this.warrantyPeriod = warrantyPeriod;
		if (discount !== undefined) {
			this.discount = discount;
		}
	}

	public priceAfterDiscount(): number {
		const discountRate = this.discount ?? 0;
		return this.price * (1 - discountRate / 100);
	}
}

const smartphone = new Smartphone("Pixel Pro", 799, 24, 10);
console.log(`${smartphone.name}: $${smartphone.priceAfterDiscount().toFixed(2)}`);
