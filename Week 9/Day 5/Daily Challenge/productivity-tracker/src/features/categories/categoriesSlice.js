import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  items: [
    { id: "c1", name: "Work", color: "#646cff" },
    { id: "c2", name: "Study", color: "#f5a623" },
    { id: "c3", name: "Personal", color: "#2ecc71" },
  ],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: (name, color = "#888888") => ({
        payload: { id: nanoid(), name, color },
      }),
    },
    editCategory: (state, action) => {
      const { id, changes } = action.payload;
      const category = state.items.find((c) => c.id === id);
      if (category) Object.assign(category, changes);
    },
    deleteCategory: (state, action) => {
      state.items = state.items.filter((c) => c.id !== action.payload);
    },
  },
});

export const { addCategory, editCategory, deleteCategory } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;