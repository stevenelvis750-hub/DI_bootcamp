import DatePicker from "./components/DatePicker";
import TaskList from "./components/TaskList";
import "./App.css";

export default function App() {
  return (
    <main className="app">
      <h1>Daily Planner</h1>
      <DatePicker />
      <TaskList />
    </main>
  );
}