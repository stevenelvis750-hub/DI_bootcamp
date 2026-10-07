import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const FilterButtons = () => {
  const { dispatch } = useContext(TaskContext);

  return (
    <div style={{ marginTop: "20px" }}>
      <button onClick={() => dispatch({ type: "FILTER_TASKS", payload: "all" })}>All</button>
      <button onClick={() => dispatch({ type: "FILTER_TASKS", payload: "completed" })}>
        Completed
      </button>
      <button onClick={() => dispatch({ type: "FILTER_TASKS", payload: "active" })}>
        Active
      </button>
    </div>
  );
};

export default FilterButtons;
