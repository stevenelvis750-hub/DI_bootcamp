import { createSelector } from "@reduxjs/toolkit";

// Input selector: all books
export const selectBooks = (state) => state.books.items;

// Helper that builds a memoized genre selector
const makeGenreSelector = (genre) =>
  createSelector([selectBooks], (books) =>
    books.filter((book) => book.genre === genre)
  );

export const selectHorrorBooks = makeGenreSelector("Horror");
export const selectFantasyBooks = makeGenreSelector("Fantasy");
export const selectScienceFictionBooks = makeGenreSelector("Science Fiction");
