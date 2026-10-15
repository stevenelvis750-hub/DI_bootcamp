import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <main className="app">
      <h1>Todo list</h1>
      <AddTodo />
      <TodoList />
    </main>
  );
}