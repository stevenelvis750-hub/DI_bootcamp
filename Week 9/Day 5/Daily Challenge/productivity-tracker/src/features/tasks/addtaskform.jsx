import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "./tasksSlice";
import { selectCategories } from "../categories/categoriesSelectors";
import { selectSelectedCategoryId } from "./tasksSelectors";

export default function AddTaskForm() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const selectedId = useSelector(selectSelectedCategoryId);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");

  // Use the chosen category, else the selected filter, else the first category
  const targetCategory =
    categoryId || (selectedId !== "all" ? selectedId : categories[0]?.id);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!title.trim() || !targetCategory) return;
      dispatch(addTask(title.trim(), targetCategory));
      setTitle("");
    },
    [dispatch, title, targetCategory]
  );

  return (
    <form onSubmit={handleSubmit} className="inline-form">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
      />
      <select
        value={targetCategory || ""}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <button type="submit" disabled={!targetCategory}>Add Task</button>
    </form>
  );
}