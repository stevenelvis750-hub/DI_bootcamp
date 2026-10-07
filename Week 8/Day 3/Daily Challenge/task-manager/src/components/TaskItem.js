import React, { useContext, useRef, useState } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskItem = ({ task }) => {
  const { dispatch } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  const handleToggle = () => {
    dispatch({ type: "TOGGLE_TASK", payload: task.id });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch({ type: "EDIT_TASK", payload: { id: task.id, text: inputRef.current.value } });
    setIsEditing(false);
  };

  return (
    <li style={{ marginBottom: "10px" }}>
      {isEditing ? (
        <>
          <input type="text" defaultValue={task.text} ref={inputRef} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span
            onClick={handleToggle}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            {task.text}
          </span>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </li>
  );
};

export default TaskItem;
