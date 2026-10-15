import { connect } from "react-redux";
import { addTask, editTask, deleteTask, toggleTask } from "../redux/actions";
import { formatLong } from "../utils/dates";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

function TaskList({ date, tasks, addTask, editTask, deleteTask, toggleTask }) {
  const done = tasks.filter((t) => t.completed).length;

  return (
    <section className="tasks" aria-label="Tasks for the selected day">
      <h2>{formatLong(date)}</h2>
      <p className="summary">
        {tasks.length === 0
          ? "Nothing planned yet."
          : `${done} of ${tasks.length} done`}
      </p>

      {/* Every dispatch below includes `date`, so the task lands on the right day */}
      <TaskForm onSubmit={(task) => addTask(date, task)} />

      {tasks.length === 0 ? (
        <p className="empty">Add a task above to plan this day.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={(id) => toggleTask(date, id)}
              onEdit={(id, changes) => editTask(date, id, changes)}
              onDelete={(id) => deleteTask(date, id)}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

// Timed tasks first (earliest to latest), then untimed ones in the order added.
// Copy with [...] before sorting: sort() mutates, and state must never be mutated.
const sortTasks = (tasks) =>
  [...tasks].sort((a, b) => {
    if (a.time && b.time) return a.time.localeCompare(b.time);
    if (a.time) return -1;
    if (b.time) return 1;
    return 0;
  });

const mapStateToProps = (state) => ({
  date: state.selectedDate,
  tasks: sortTasks(state.tasksByDate[state.selectedDate] || []),
});

export default connect(mapStateToProps, {
  addTask,
  editTask,
  deleteTask,
  toggleTask,
})(TaskList);