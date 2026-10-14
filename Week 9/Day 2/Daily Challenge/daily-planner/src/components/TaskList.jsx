import { useState } from "react";
import { useSelector } from "react-redux";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";

const EMPTY = []; // stable reference so useSelector doesn't re-render needlessly

export default function TaskList() {
  const tasks = useSelector(
    (state) => state.planner.tasksByDate[state.planner.selectedDate] ?? EMPTY
  );
  const [editingId, setEditingId] = useState(null);

  if (tasks.length === 0) {
    return <p className="empty">Nothing planned for this day. Add a task above.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task">
          {editingId === task.id ? (
            <EditTask task={task} onDone={() => setEditingId(null)} />
          ) : (
            <>
              <span>{task.text}</span>
              <div className="actions">
                <button className="ghost" onClick={() => setEditingId(task.id)}>
                  Edit
                </button>
                <DeleteTask taskId={task.id} />
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}