import {
  SELECT_DATE,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
} from "./actionTypes";
import { todayKey } from "../utils/dates";

// State shape:
// {
//   selectedDate: "2026-10-13",
//   tasksByDate: {
//     "2026-10-13": [{ id, text, time, completed }, ...],
//     "2026-10-14": [...]
//   }
// }
export const initialState = {
  selectedDate: todayKey(),
  tasksByDate: {},
};

// Helper: return a new tasksByDate with one day's list replaced.
const updateDay = (tasksByDate, date, updateFn) => ({
  ...tasksByDate,
  [date]: updateFn(tasksByDate[date] || []),
});

export default function plannerReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_DATE:
      return { ...state, selectedDate: action.payload.date };

    case ADD_TASK: {
      const { date, task } = action.payload;
      return {
        ...state,
        tasksByDate: updateDay(state.tasksByDate, date, (tasks) => [
          ...tasks,
          task,
        ]),
      };
    }

    case EDIT_TASK: {
      const { date, id, changes } = action.payload;
      return {
        ...state,
        tasksByDate: updateDay(state.tasksByDate, date, (tasks) =>
          tasks.map((t) => (t.id === id ? { ...t, ...changes } : t))
        ),
      };
    }

    case DELETE_TASK: {
      const { date, id } = action.payload;
      return {
        ...state,
        tasksByDate: updateDay(state.tasksByDate, date, (tasks) =>
          tasks.filter((t) => t.id !== id)
        ),
      };
    }

    case TOGGLE_TASK: {
      const { date, id } = action.payload;
      return {
        ...state,
        tasksByDate: updateDay(state.tasksByDate, date, (tasks) =>
          tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        ),
      };
    }

    default:
      return state;
  }
}