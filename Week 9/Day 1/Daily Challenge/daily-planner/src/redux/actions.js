import {
  SELECT_DATE,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
} from "./actionTypes";

// Unique even after a page reload (a simple counter would restart at 1
// and collide with tasks loaded from localStorage).
const makeId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export const selectDate = (date) => ({
  type: SELECT_DATE,
  payload: { date },
});

export const addTask = (date, { text, time }) => ({
  type: ADD_TASK,
  payload: { date, task: { id: makeId(), text, time, completed: false } },
});

// `changes` holds only the fields being edited, e.g. { text, time }
export const editTask = (date, id, changes) => ({
  type: EDIT_TASK,
  payload: { date, id, changes },
});

export const deleteTask = (date, id) => ({
  type: DELETE_TASK,
  payload: { date, id },
});

export const toggleTask = (date, id) => ({
  type: TOGGLE_TASK,
  payload: { date, id },
});