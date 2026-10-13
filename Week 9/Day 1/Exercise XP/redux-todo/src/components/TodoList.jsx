import { connect } from "react-redux";
import { toggleTodo, removeTodo } from "../redux/actions";
import TodoItem from "./TodoItem";

function TodoList({ todos, toggleTodo, removeTodo }) {
  if (todos.length === 0) {
    return <p className="empty">No todos yet. Add your first one above.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onRemove={removeTodo}
        />
      ))}
    </ul>
  );
}

const mapStateToProps = (state) => ({ todos: state.todos });
const mapDispatchToProps = { toggleTodo, removeTodo };

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);