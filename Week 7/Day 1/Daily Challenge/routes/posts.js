const express = require('express');

const router = express.Router();
const posts = [];
let nextId = 1;

const parsePostId = (value) => {
  if (!/^[1-9]\d*$/.test(value)) return null;

  const id = Number(value);
  return Number.isSafeInteger(id) ? id : null;
};

const isPostBody = (body) =>
  body !== null &&
  typeof body === 'object' &&
  !Array.isArray(body) &&
  typeof body.title === 'string' &&
  body.title.trim() !== '' &&
  typeof body.content === 'string' &&
  body.content.trim() !== '';

router.get('/', (req, res) => {
  res.json(posts);
});

router.get('/:id', (req, res) => {
  const id = parsePostId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: 'Post ID must be a positive integer.' });
  }

  const post = posts.find((item) => item.id === id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found.' });
  }

  res.json(post);
});

router.post('/', (req, res) => {
  if (!isPostBody(req.body)) {
    return res.status(400).json({ error: 'Non-empty title and content are required.' });
  }

  const post = {
    id: nextId++,
    title: req.body.title.trim(),
    content: req.body.content.trim(),
    timestamp: new Date().toISOString()
  };

  posts.push(post);
  res.status(201).json(post);
});

router.put('/:id', (req, res) => {
  const id = parsePostId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: 'Post ID must be a positive integer.' });
  }

  const post = posts.find((item) => item.id === id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found.' });
  }

  if (!isPostBody(req.body)) {
    return res.status(400).json({ error: 'Non-empty title and content are required.' });
  }

  post.title = req.body.title.trim();
  post.content = req.body.content.trim();
  res.json(post);
});

router.delete('/:id', (req, res) => {
  const id = parsePostId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: 'Post ID must be a positive integer.' });
  }

  const index = posts.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Post not found.' });
  }

  posts.splice(index, 1);
  res.status(204).end();
});

module.exports = router;