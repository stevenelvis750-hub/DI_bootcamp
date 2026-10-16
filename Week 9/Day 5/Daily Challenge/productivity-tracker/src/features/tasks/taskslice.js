import { createSlice, nanoid } from "@reduxjs/toolkit";
import { deleteCategory } from "../categories/categoriesSlice";

const initialState = {
  items: [
    { id: "t1", title: "Finish project report", categoryId: "c1", progress: 40, completed: false },
    { id: "t2", title: "Reply to emails", categoryId: "c1", progress: 100, completed: true },
    { id: "t3", title: "Read Redux docs", categoryId: "c2", progress: 60, completed: false },
    { id: "t4", title: "Practice selectors", categoryId: "c2", progress: 0, completed: false },
    { id: "t5", title: "Go for a walk", categoryId: "c3", progress: 100, completed: true },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: (title, categoryId) => ({
        payload: { id: nanoid(), title, categoryId, progress: 0, completed: false },
      }),
    },
    editTask: (state, action) => {
      const { id, changes } = action.payload;
      const task = state.items.find((t) => t.id === id);
      if (task) Object.assign(task, changes);
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    updateTaskProgress: (state, action) => {
      const { id, progress } = action.payload;
      const task = state.items.find((t) => t.id === id);
      if (task) {
        task.progress = Math.min(100, Math.max(0, progress));
        task.completed = task.progress === 100;
      }
    },
    toggleTaskCompleted: (state, action) => {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        task.progress = task.completed ? 100 : 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteCategory, (state, action) => {
      state.items = state.items.filter((t) => t.categoryId !== action.payload);
    });
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  updateTaskProgress,
  toggleTaskCompleted,
} = tasksSlice.actions;
export default tasksSlice.reducer;