import { useDispatch } from "react-redux";
import { toggleTodo, removeTodo } from "../features/todos/todoSlice";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();

  return (
    <li className={todo.completed ? "todo done" : "todo"}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch(toggleTodo(todo.id))}
        />
        <span>{todo.text}</span>
      </label>
      <button onClick={() => dispatch(removeTodo(todo.id))} aria-label={`Remove ${todo.text}`}>
        Remove
      </button>
    </li>
  );
}