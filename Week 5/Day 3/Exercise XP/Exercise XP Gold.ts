class Employee {
	protected name: string;
	protected salary: number;

	constructor(name: string, salary: number) {
		this.name = name;
		this.salary = salary;
	}

	public getDetails(): string {
		return `${this.name} earns $${this.salary.toFixed(2)}`;
	}
}

class Manager extends Employee {
	public department: string;

	constructor(name: string, salary: number, department: string) {
		super(name, salary);
		this.department = department;
	}

	public getDetails(): string {
		return `${super.getDetails()} and manages the ${this.department} department`;
	}
}

const manager = new Manager("Maya", 85000, "Engineering");
console.log(manager.getDetails());

class Car {
	constructor(
		public readonly make: string,
		private readonly model: string,
		public year: number,
	) {}

	public getCarDetails(): string {
		return `${this.make} ${this.model} (${this.year})`;
	}
}

const car = new Car("Toyota", "Corolla", 2024);
car.year = 2025;
console.log(car.getCarDetails());

// These assignments are rejected by TypeScript because both properties are readonly.
// car.make = "Honda";
// car.model = "Civic";

class MathUtils {
	public static readonly PI = 3.14159;

	public static circumference(radius: number): number {
		return 2 * MathUtils.PI * radius;
	}
}

console.log(MathUtils.circumference(5));

interface Operation {
	operate(first: number, second: number): number;
}

class Addition implements Operation {
	public operate(first: number, second: number): number {
		return first + second;
	}
}

class Multiplication implements Operation {
	public operate(first: number, second: number): number {
		return first * second;
	}
}

const addition = new Addition();
const multiplication = new Multiplication();
console.log(addition.operate(6, 4));
console.log(multiplication.operate(6, 4));

interface Shape {
	color: string;
	getArea(): number;
}

interface Rectangle extends Shape {
	readonly width: number;
	readonly height: number;
	getPerimeter(): number;
}

class ColoredRectangle implements Rectangle {
	constructor(
		public color: string,
		public readonly width: number,
		public readonly height: number,
	) {}

	public getArea(): number {
		return this.width * this.height;
	}

	public getPerimeter(): number {
		return 2 * (this.width + this.height);
	}
}

const rectangle = new ColoredRectangle("blue", 8, 5);
console.log(`Area: ${rectangle.getArea()}`);
console.log(`Perimeter: ${rectangle.getPerimeter()}`);
