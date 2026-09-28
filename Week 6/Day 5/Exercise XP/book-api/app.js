const express = require("express");

const app = express();
const port = process.env.PORT || 5000;
const books = [
  { id: 1, title: "The Pragmatic Programmer", author: "David Thomas and Andrew Hunt", publishedYear: 1999 },
  { id: 2, title: "Clean Code", author: "Robert C. Martin", publishedYear: 2008 },
  { id: 3, title: "Eloquent JavaScript", author: "Marijn Haverbeke", publishedYear: 2018 },
];
let nextId = Math.max(...books.map((book) => book.id)) + 1;

app.use(express.json({ limit: "16kb" }));

app.get("/api/books", (_request, response) => response.json(books));

app.get("/api/books/:bookId", (request, response) => {
  if (!/^\d+$/.test(request.params.bookId)) {
    return response.status(400).json({ message: "Book id must be a positive integer." });
  }
  const book = books.find((item) => item.id === Number(request.params.bookId));
  if (!book) return response.status(404).json({ message: "Book not found" });
  response.status(200).json(book);
});

app.post("/api/books", (request, response) => {
  const { title, author, publishedYear } = request.body || {};
  if (typeof title !== "string" || !title.trim() || typeof author !== "string" || !author.trim()) {
    return response.status(400).json({ message: "A non-empty title and author are required." });
  }
  if (!Number.isInteger(publishedYear) || publishedYear < 0 || publishedYear > new Date().getFullYear()) {
    return response.status(400).json({ message: "publishedYear must be a valid year." });
  }
  const book = { id: nextId++, title: title.trim(), author: author.trim(), publishedYear };
  books.push(book);
  response.status(201).json(book);
});

app.listen(port, () => console.log(`Book API listening at http://localhost:${port}`));