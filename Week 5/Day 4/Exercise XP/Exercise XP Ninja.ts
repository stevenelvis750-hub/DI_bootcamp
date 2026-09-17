class Container<T extends object> {
	private items: T[] = [];

	add(item: T): void {
		this.items.push(item);
	}

	remove(item: T): boolean {
		const itemIndex = this.items.indexOf(item);

		if (itemIndex === -1) {
			return false;
		}

		this.items.splice(itemIndex, 1);
		return true;
	}

	list(): T[] {
		return [...this.items];
	}
}

type IdentifiedProduct = {
	id: number;
} & {
	name: string;
};

const productContainer = new Container<IdentifiedProduct>();
const firstProduct: IdentifiedProduct = { id: 1, name: "Notebook" };
const secondProduct: IdentifiedProduct = { id: 2, name: "Pen" };

productContainer.add(firstProduct);
productContainer.add(secondProduct);
console.log("Container:", productContainer.list());
productContainer.remove(firstProduct);
console.log("After removal:", productContainer.list());

interface Response<T> {
	status: number;
	data: T;
}

function parseResponse<T>(response: Response<unknown>): T {
	return response.data as T;
}

const user = parseResponse<{ id: number; username: string }>({
	status: 200,
	data: { id: 1, username: "ada" },
});
console.log("Parsed response:", user.username);

class Repository<T> {
	private items: T[] = [];

	add(item: T): void {
		this.items.push(item);
	}

	retrieve(index: number): T | undefined {
		return this.items[index] as T | undefined;
	}

	list(): T[] {
		return [...this.items];
	}
}

const numberRepository = new Repository<number>();
numberRepository.add(10);
numberRepository.add(20);
console.log("Retrieved item:", numberRepository.retrieve(0));
console.log("Repository:", numberRepository.list());
