import { memo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTasksByCategory,
  selectCompletedTasks,
  selectTasks,
  selectSelectedCategoryId,
} from "./tasksSelectors";
import { selectCategoryById } from "../categories/categoriesSelectors";
import {
  editTask,
  deleteTask,
  toggleTaskCompleted,
  updateTaskProgress,
} from "./tasksSlice";

const TaskItem = memo(function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
  onProgress,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  const save = () => {
    if (draft.trim()) onEdit(task.id, draft.trim());
    setIsEditing(false);
  };

  return (
    <li className={task.completed ? "task done" : "task"}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      {isEditing ? (
        <>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && save()}
            autoFocus
          />
          <button onClick={save}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <span className="title">{task.title}</span>
          <button className="icon-btn" onClick={() => setIsEditing(true)}>✏️</button>
        </>
      )}

      <input
        type="range"
        min="0"
        max="100"
        step="10"
        value={task.progress}
        onChange={(e) => onProgress(task.id, Number(e.target.value))}
        title={`${task.progress}%`}
      />
      <span className="percent">{task.progress}%</span>

      <button className="icon-btn" onClick={() => onDelete(task.id)}>🗑️</button>
    </li>
  );
});

export default function TaskList() {
  const dispatch = useDispatch();
  const selectedId = useSelector(selectSelectedCategoryId);
  const tasks = useSelector((state) => selectTasksByCategory(state, selectedId));
  const category = useSelector((state) => selectCategoryById(state, selectedId));
  const completedCount = useSelector(selectCompletedTasks);
  const totalCount = useSelector(selectTasks).length;

  // Step 5: stable handlers via useCallback
  const handleToggle = useCallback(
    (id) => dispatch(toggleTaskCompleted(id)),
    [dispatch]
  );

  const handleEdit = useCallback(
    (id, title) => dispatch(editTask({ id, changes: { title } })),
    [dispatch]
  );

  const handleDelete = useCallback(
    (id) => dispatch(deleteTask(id)),
    [dispatch]
  );

  const handleProgress = useCallback(
    (id, progress) => dispatch(updateTaskProgress({ id, progress })),
    [dispatch]
  );

  return (
    <section className="task-list">
      <h2>{category ? category.name : "All Tasks"}</h2>
      <p className="summary">
        {completedCount} of {totalCount} tasks completed
      </p>

      {tasks.length === 0 ? (
        <p className="empty">No tasks here yet.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onProgress={handleProgress}
            />
          ))}
        </ul>
      )}
    </section>
  );
}