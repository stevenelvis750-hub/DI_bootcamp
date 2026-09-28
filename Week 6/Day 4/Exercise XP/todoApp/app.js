import { TodoList } from "./todo.js";

const todoList = new TodoList();
todoList.addTask("Read the module guide");
todoList.addTask("Practice ES modules");
todoList.addTask("Run the examples");
todoList.markComplete(0);
todoList.markComplete(2);

console.log("Todo list:", todoList.listTasks());