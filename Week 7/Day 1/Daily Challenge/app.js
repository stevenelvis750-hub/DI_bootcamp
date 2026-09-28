const express = require('express');
const homeRouter = require('./routes');
const todosRouter = require('./routes/todos');
const booksRouter = require('./routes/books');
const postsRouter = require('./routes/posts');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', homeRouter);
app.use('/todos', todosRouter);
app.use('/books', booksRouter);
app.use('/posts', postsRouter);

app.use((error, req, res, next) => {
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Request body must contain valid JSON.' });
  }

  console.error(error);
  return res.status(500).json({ error: 'Internal server error.' });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});