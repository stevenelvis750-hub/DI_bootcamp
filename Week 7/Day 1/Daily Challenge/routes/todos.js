const express = require('express');

const router = express.Router();
const todos = [];
let nextId = 1;

router.get('/', (req, res) => {
  res.json(todos);
});

router.post('/', (req, res) => {
  const { title } = req.body;

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'A non-empty title is required.' });
  }

  const todo = {
    id: nextId++,
    title: title.trim(),
    completed: false
  };

  todos.push(todo);
  res.status(201).json(todo);
});

router.put('/:id', (req, res) => {
  const todo = todos.find((item) => item.id === Number(req.params.id));

  if (!todo) {
    return res.status(404).json({ error: 'To-do item not found.' });
  }

  const { title, completed } = req.body;
  if (
    (title !== undefined && (typeof title !== 'string' || title.trim() === '')) ||
    (completed !== undefined && typeof completed !== 'boolean') ||
    (title === undefined && completed === undefined)
  ) {
    return res.status(400).json({ error: 'Provide a non-empty title or a boolean completed value.' });
  }

  if (title !== undefined) todo.title = title.trim();
  if (completed !== undefined) todo.completed = completed;
  res.json(todo);
});

router.delete('/:id', (req, res) => {
  const index = todos.findIndex((item) => item.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'To-do item not found.' });
  }

  todos.splice(index, 1);
  res.status(204).end();
});

module.exports = router;