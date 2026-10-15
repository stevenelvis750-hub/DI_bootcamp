export default function TodoItem({ todo, onToggle, onRemove }) {
  return (
    <li className={todo.completed ? "todo done" : "todo"}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span>{todo.text}</span>
      </label>
      <button
        className="remove"
        onClick={() => onRemove(todo.id)}
        aria-label={`Remove ${todo.text}`}
      >
        Remove
      </button>
    </li>
  );
}