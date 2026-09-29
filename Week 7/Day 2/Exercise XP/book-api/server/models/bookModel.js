const books = [
  { id: 1, title: "The Pragmatic Programmer", author: "David Thomas and Andrew Hunt", publishedYear: 1999 },
  { id: 2, title: "Clean Code", author: "Robert C. Martin", publishedYear: 2008 },
];
let nextId = 3;

function getAll() {
  return books;
}

function getById(id) {
  return books.find((book) => book.id === id);
}

function create({ title, author, publishedYear }) {
  const book = { id: nextId++, title, author, publishedYear };
  books.push(book);
  return book;
}

function update(id, fields) {
  const book = getById(id);
  if (!book) return undefined;
  Object.assign(book, fields);
  return book;
}

function remove(id) {
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) return false;
  books.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove };