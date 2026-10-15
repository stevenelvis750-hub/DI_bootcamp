import { useState } from "react";
import { connect } from "react-redux";
import { addTodo } from "../redux/actions";

function AddTodo({ addTodo }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    addTodo(trimmed);
    setText("");
  };

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs doing?"
        aria-label="New todo"
      />
      <button type="submit">Add todo</button>
    </form>
  );
}

const mapDispatchToProps = { addTodo };

export default connect(null, mapDispatchToProps)(AddTodo);