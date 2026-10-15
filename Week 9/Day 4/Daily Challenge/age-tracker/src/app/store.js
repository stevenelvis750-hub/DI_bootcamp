import { configureStore } from "@reduxjs/toolkit";
import ageReducer from "../features/age/ageslice";

export const store = configureStore({
  reducer: {
    age: ageReducer,
  },
});