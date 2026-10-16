import { describe, it, expect } from "vitest";
import {
  selectBooks,
  selectHorrorBooks,
  selectFantasyBooks,
  selectScienceFictionBooks,
} from "./booksSelectors";

const mockState = {
  books: {
    items: [
      { id: 1, title: "It", author: "Stephen King", genre: "Horror" },
      { id: 2, title: "The Hobbit", author: "Tolkien", genre: "Fantasy" },
      { id: 3, title: "Dune", author: "Herbert", genre: "Science Fiction" },
      { id: 4, title: "Dracula", author: "Stoker", genre: "Horror" },
    ],
  },
};

describe("book selectors", () => {
  it("selectBooks returns all books", () => {
    expect(selectBooks(mockState)).toHaveLength(4);
  });

  it("selectHorrorBooks returns only horror books", () => {
    const result = selectHorrorBooks(mockState);
    expect(result).toHaveLength(2);
    expect(result.every((b) => b.genre === "Horror")).toBe(true);
  });

  it("selectFantasyBooks returns only fantasy books", () => {
    expect(selectFantasyBooks(mockState)).toEqual([
      { id: 2, title: "The Hobbit", author: "Tolkien", genre: "Fantasy" },
    ]);
  });

  it("selectScienceFictionBooks returns only sci-fi books", () => {
    const result = selectScienceFictionBooks(mockState);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Dune");
  });

  it("memoizes: same state gives the same array reference", () => {
    const first = selectHorrorBooks(mockState);
    const second = selectHorrorBooks(mockState);
    expect(second).toBe(first);
  });
});