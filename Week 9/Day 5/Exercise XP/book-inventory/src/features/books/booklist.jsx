import { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectBooks,
  selectHorrorBooks,
  selectFantasyBooks,
  selectScienceFictionBooks,
} from "./booksSelectors";
import "./books.css";

// Maps each filter option to the selector that powers it
const GENRES = [
  { label: "All", selector: selectBooks },
  { label: "Horror", selector: selectHorrorBooks },
  { label: "Fantasy", selector: selectFantasyBooks },
  { label: "Science Fiction", selector: selectScienceFictionBooks },
];

export default function BookList() {
  const [activeGenre, setActiveGenre] = useState("All");

  // Hooks must be called unconditionally, so read every selector,
  // then pick the active one.
  const allBooks = useSelector(selectBooks);
  const horrorBooks = useSelector(selectHorrorBooks);
  const fantasyBooks = useSelector(selectFantasyBooks);
  const sciFiBooks = useSelector(selectScienceFictionBooks);

  const booksByGenre = {
    All: allBooks,
    Horror: horrorBooks,
    Fantasy: fantasyBooks,
    "Science Fiction": sciFiBooks,
  };

  const visibleBooks = booksByGenre[activeGenre];

  return (
    <div className="book-list">
      <h1>Book Inventory</h1>

      <div className="genre-buttons">
        {GENRES.map(({ label }) => (
          <button
            key={label}
            className={label === activeGenre ? "active" : ""}
            onClick={() => setActiveGenre(label)}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="count">
        Showing {visibleBooks.length} book{visibleBooks.length !== 1 && "s"}
      </p>

      <ul>
        {visibleBooks.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong>
            <span>{book.author}</span>
            <em>{book.genre}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}