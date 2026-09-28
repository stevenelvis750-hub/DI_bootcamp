export class TodoList {
  constructor() {
    this.tasks = [];
  }

  addTask(description) {
    const task = { description, completed: false };
    this.tasks.push(task);
    return task;
  }

  markComplete(index) {
    const task = this.tasks[index];
    if (!task) {
      return false;
    }

    task.completed = true;
    return true;
  }

  listTasks() {
    return this.tasks.map((task, index) => ({
      number: index + 1,
      ...task,
    }));
  }
}