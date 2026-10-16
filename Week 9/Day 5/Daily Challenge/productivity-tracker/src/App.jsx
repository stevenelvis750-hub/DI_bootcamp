import CategorySelector from "./features/categories/CategorySelector";
import TaskList from "./features/tasks/tasklist";
import AddTaskForm from "./features/tasks/addtaskform";
import "./tracker.css";

export default function App() {
  return (
    <div className="app">
      <h1>Productivity Tracker</h1>
      <div className="layout">
        <CategorySelector />
        <main>
          <AddTaskForm />
          <TaskList />
        </main>
      </div>
    </div>
  );
}