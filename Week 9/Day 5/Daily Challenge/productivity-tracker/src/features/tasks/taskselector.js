import { createSelector } from "@reduxjs/toolkit";

export const selectTasks = (state) => state.tasks.items;
export const selectSelectedCategoryId = (state) => state.ui.selectedCategoryId;

// Returns tasks belonging to a specific category ("all" returns everything)
export const selectTasksByCategory = createSelector(
  [selectTasks, (state, categoryId) => categoryId],
  (tasks, categoryId) =>
    categoryId === "all"
      ? tasks
      : tasks.filter((task) => task.categoryId === categoryId)
);

// Count of completed tasks
export const selectCompletedTasks = createSelector([selectTasks], (tasks) =>
  tasks.filter((task) => task.completed).length
);