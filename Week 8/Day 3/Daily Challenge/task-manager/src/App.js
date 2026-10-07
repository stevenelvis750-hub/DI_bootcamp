import React from "react";
import { TaskProvider } from "./context/TaskContext";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/Tasklist";
import FilterButtons from "./components/FilterButtons";
import "./styles.css";

const App = () => {
  return (
    <TaskProvider>
      <div className="app">
        <h1>Task Manager</h1>
        <TaskForm />
        <TaskList />
        <FilterButtons />
      </div>
    </TaskProvider>
  );
};

export default App;
