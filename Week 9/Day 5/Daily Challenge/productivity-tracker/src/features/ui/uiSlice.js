import { createSlice } from "@reduxjs/toolkit";
import { deleteCategory } from "../categories/categoriesSlice";

const uiSlice = createSlice({
  name: "ui",
  initialState: { selectedCategoryId: "all" },
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategoryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    // If the selected category is deleted, fall back to "all"
    builder.addCase(deleteCategory, (state, action) => {
      if (state.selectedCategoryId === action.payload) {
        state.selectedCategoryId = "all";
      }
    });
  },
});

export const { selectCategory } = uiSlice.actions;
export default uiSlice.reducer;