import { createStore } from "redux";
import plannerReducer, { initialState } from "./reducer";

const STORAGE_KEY = "daily-planner-v1";

// Persistence: only tasks are saved. The app always opens on today.
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {}; // corrupted or blocked storage: start fresh
  }
}

const preloadedState = { ...initialState, tasksByDate: loadTasks() };

const store = createStore(
  plannerReducer,
  preloadedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(store.getState().tasksByDate)
    );
  } catch {
    // storage full or unavailable: the app still works, it just won't persist
  }
});

export default store;