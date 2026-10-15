import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import "./App.css";

export default function App() {
  return (
    <main className="app">
      <h1>Todos</h1>
      <AddTodo />
      <TodoList />
    </main>
  );
}