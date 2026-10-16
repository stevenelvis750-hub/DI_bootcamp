import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "./categoriesSelectors";
import { addCategory, editCategory, deleteCategory } from "./categoriesSlice";
import { selectCategory } from "../ui/uiSlice";
import { selectSelectedCategoryId } from "../tasks/tasksSelectors";

export default function CategorySelector() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const selectedId = useSelector(selectSelectedCategoryId);
  const [newName, setNewName] = useState("");

  const handleSelect = useCallback(
    (id) => dispatch(selectCategory(id)),
    [dispatch]
  );

  const handleAdd = useCallback(
    (e) => {
      e.preventDefault();
      const name = newName.trim();
      if (!name) return;
      dispatch(addCategory(name));
      setNewName("");
    },
    [dispatch, newName]
  );

  const handleRename = useCallback(
    (category) => {
      const name = window.prompt("Rename category:", category.name);
      if (name && name.trim()) {
        dispatch(editCategory({ id: category.id, changes: { name: name.trim() } }));
      }
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (category) => {
      if (window.confirm(`Delete "${category.name}" and all its tasks?`)) {
        dispatch(deleteCategory(category.id));
      }
    },
    [dispatch]
  );

  return (
    <aside className="category-selector">
      <h2>Categories</h2>

      <button
        className={selectedId === "all" ? "chip active" : "chip"}
        onClick={() => handleSelect("all")}
      >
        All
      </button>

      {categories.map((category) => (
        <div key={category.id} className="category-row">
          <button
            className={selectedId === category.id ? "chip active" : "chip"}
            style={{ borderColor: category.color }}
            onClick={() => handleSelect(category.id)}
          >
            {category.name}
          </button>
          <button className="icon-btn" onClick={() => handleRename(category)} title="Rename">
            ✏️
          </button>
          <button className="icon-btn" onClick={() => handleDelete(category)} title="Delete">
            🗑️
          </button>
        </div>
      ))}

      <form onSubmit={handleAdd} className="inline-form">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New category"
        />
        <button type="submit">Add</button>
      </form>
    </aside>
  );
}