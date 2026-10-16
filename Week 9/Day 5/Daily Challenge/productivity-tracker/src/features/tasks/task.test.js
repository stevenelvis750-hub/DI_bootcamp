import { describe, it, expect } from "vitest";
import { selectTasksByCategory, selectCompletedTasks } from "./tasksSelectors";
import { selectCategoryById } from "../categories/categoriesSelectors";

const state = {
  tasks: {
    items: [
      { id: "t1", title: "A", categoryId: "c1", progress: 100, completed: true },
      { id: "t2", title: "B", categoryId: "c1", progress: 0, completed: false },
      { id: "t3", title: "C", categoryId: "c2", progress: 100, completed: true },
    ],
  },
  categories: {
    items: [
      { id: "c1", name: "Work" },
      { id: "c2", name: "Study" },
    ],
  },
};

describe("selectors", () => {
  it("selectTasksByCategory filters by category", () => {
    expect(selectTasksByCategory(state, "c1")).toHaveLength(2);
  });

  it("selectTasksByCategory returns everything for 'all'", () => {
    expect(selectTasksByCategory(state, "all")).toHaveLength(3);
  });

  it("selectCompletedTasks counts completed tasks", () => {
    expect(selectCompletedTasks(state)).toBe(2);
  });

  it("selectCategoryById returns the matching category", () => {
    expect(selectCategoryById(state, "c2").name).toBe("Study");
  });
});