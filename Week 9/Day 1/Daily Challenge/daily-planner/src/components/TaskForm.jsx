import { useState } from "react";

const MAX_LENGTH = 100;

// Used for both adding and editing.
// - Add: no onCancel, so the form clears itself after submit.
// - Edit: pass initial values + onCancel; the parent closes the form.
export default function TaskForm({
  initial = { text: "", time: "" },
  submitLabel = "Add task",
  onSubmit,
  onCancel,
}) {
  const [text, setText] = useState(initial.text);
  const [time, setTime] = useState(initial.time || "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();

    if (!trimmed) {
      setError("A task can't be empty.");
      return;
    }
    if (trimmed.length > MAX_LENGTH) {
      setError(`Keep it under ${MAX_LENGTH} characters.`);
      return;
    }

    onSubmit({ text: trimmed, time });
    setError("");
    if (!onCancel) {
      setText("");
      setTime("");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="task-form-row">
        <input
          className="task-text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError("");
          }}
          placeholder="What do you need to do?"
          aria-label="Task description"
          aria-invalid={Boolean(error)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          aria-label="Task time (optional)"
        />
        <button type="submit">{submitLabel}</button>
        {onCancel && (
          <button type="button" className="ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}