import { useState } from "react";
import TaskForm from "./TaskForm";

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <li className="task editing">
        <TaskForm
          initial={{ text: task.text, time: task.time }}
          submitLabel="Save changes"
          onSubmit={(changes) => {
            onEdit(task.id, changes);
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
        />
      </li>
    );
  }

  return (
    <li className={task.completed ? "task done" : "task"}>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        {task.time && <span className="task-time">{task.time}</span>}
        <span className="task-label">{task.text}</span>
      </label>
      <div className="task-actions">
        <button className="ghost" onClick={() => setEditing(true)}>
          Edit
        </button>
        <button
          className="danger"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.text}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}