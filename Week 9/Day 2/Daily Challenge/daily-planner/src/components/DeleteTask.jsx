import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../features/planner/plannerSlice";

export default function DeleteTask({ taskId }) {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.planner.selectedDate);

  return (
    <button
      className="ghost"
      onClick={() => dispatch(deleteTask({ date: selectedDate, id: taskId }))}
    >
      Delete
    </button>
  );
}