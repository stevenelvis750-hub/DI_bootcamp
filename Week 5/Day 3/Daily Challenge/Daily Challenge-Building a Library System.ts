interface Book {
	title: string;
	author: string;
	isbn: string;
	publishedYear: number;
	genre?: string;
}

class Library {
	private books: Book[] = [];

	public addBook(book: Book): void {
		this.books.push(book);
	}

	public getBookDetails(isbn: string): Book | undefined {
		return this.books.find((book) => book.isbn === isbn);
	}

	protected getAllBooks(): Book[] {
		return [...this.books];
	}
}

class DigitalLibrary extends Library {
	constructor(public readonly website: string) {
		super();
	}

	public listBooks(): string[] {
		return this.getAllBooks().map((book) => book.title);
	}
}

const digitalLibrary = new DigitalLibrary("https://example-library.com");

digitalLibrary.addBook({
	title: "The Midnight Library",
	author: "Matt Haig",
	isbn: "9780525559474",
	publishedYear: 2020,
	genre: "Fiction",
});

digitalLibrary.addBook({
	title: "Clean Code",
	author: "Robert C. Martin",
	isbn: "9780132350884",
	publishedYear: 2008,
	genre: "Technology",
});

digitalLibrary.addBook({
	title: "The Little Prince",
	author: "Antoine de Saint-Exupery",
	isbn: "9780156012195",
	publishedYear: 1943,
});

console.log(`Digital library: ${digitalLibrary.website}`);
console.log(digitalLibrary.getBookDetails("9780132350884"));
console.log(digitalLibrary.getBookDetails("unknown-isbn"));
console.log("All book titles:", digitalLibrary.listBooks());
