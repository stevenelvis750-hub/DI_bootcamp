import { createSlice, nanoid } from "@reduxjs/toolkit";
import { toDateKey } from "../../utils/date";

const initialState = {
  selectedDate: toDateKey(),
  // { "2026-10-14": [{ id, text }, ...], ... }
  tasksByDate: {},
};

const plannerSlice = createSlice({
  name: "planner",
  initialState,
  reducers: {
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
    addTask: {
      reducer(state, action) {
        const { date, task } = action.payload;
        if (!state.tasksByDate[date]) state.tasksByDate[date] = [];
        state.tasksByDate[date].push(task);
      },
      prepare(date, text) {
        return { payload: { date, task: { id: nanoid(), text } } };
      },
    },
    editTask(state, action) {
      const { date, id, text } = action.payload;
      const task = state.tasksByDate[date]?.find((t) => t.id === id);
      if (task) task.text = text;
    },
    deleteTask(state, action) {
      const { date, id } = action.payload;
      const list = state.tasksByDate[date];
      if (!list) return;
      state.tasksByDate[date] = list.filter((t) => t.id !== id);
    },
  },
});

export const { setSelectedDate, addTask, editTask, deleteTask } = plannerSlice.actions;
export default plannerSlice.reducer;