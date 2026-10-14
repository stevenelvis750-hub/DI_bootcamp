import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../features/planner/plannerSlice";

export default function AddTask() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.planner.selectedDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    dispatch(addTask(selectedDate, trimmed));
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-task">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task for this day"
        aria-label="New task"
      />
      <button type="submit">Add task</button>
    </form>
  );
}