import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../features/planner/plannerSlice";

export default function EditTask({ task, onDone }) {
  const [text, setText] = useState(task.text);
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.planner.selectedDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    dispatch(editTask({ date: selectedDate, id: task.id, text: trimmed }));
    onDone();
  };

  return (
    <form onSubmit={handleSubmit} className="edit-task">
      <input
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Edit task"
      />
      <button type="submit">Save changes</button>
      <button type="button" className="ghost" onClick={onDone}>
        Cancel
      </button>
    </form>
  );
}