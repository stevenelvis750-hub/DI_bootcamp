const express = require('express');
const path = require('path');
const usersRouter = require('./routes/users');
const { HttpError } = require('./lib/errors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public'))); // serves login.html and register.html
app.get('/', (req, res) => res.redirect('/register.html'));

app.use('/', usersRouter);

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ message: 'Invalid JSON in request body' });
  if (err instanceof HttpError) return res.status(err.status).json({ message: err.message, ...(err.details && { errors: err.details }) });
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`User API running on http://localhost:${PORT}`));
}

module.exports = app;