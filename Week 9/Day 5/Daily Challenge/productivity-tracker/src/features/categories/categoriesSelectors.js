import { createSelector } from "@reduxjs/toolkit";

export const selectCategories = (state) => state.categories.items;

// Parameterized: returns category details by ID
export const selectCategoryById = createSelector(
  [selectCategories, (state, categoryId) => categoryId],
  (categories, categoryId) => categories.find((c) => c.id === categoryId)
);