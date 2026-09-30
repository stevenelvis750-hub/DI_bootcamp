const express = require('express');
const path = require('path');
const { router: authRouter } = require('./routes/auth');
const gamesRouter = require('./routes/games');
const { GameError } = require('./lib/game');

const app = express();

app.use(express.json({ limit: '10kb' })); // express.json is the built-in body-parser
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', authRouter);
app.use('/api/games', gamesRouter);
app.use('/api', (req, res) => res.status(404).json({ error: 'Route not found' }));

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON in request body' });
  if (err instanceof GameError) return res.status(err.status).json({ error: err.message });
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;