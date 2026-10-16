import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/tasksSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    categories: categoriesReducer,
    ui: uiReducer,
  },
});