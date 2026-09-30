const express = require('express');
const store = require('../lib/store');
const game = require('../lib/game');
const { requireAuth } = require('./auth');

const router = express.Router();
router.use(requireAuth);

const MAX_WAITING_PER_USER = 3;

function findGame(req) {
  const g = store.games.get(req.params.id);
  if (!g) throw new game.GameError(404, 'Game not found');
  return g;
}

// Wraps handlers so thrown GameErrors reach the central error handler
const handle = (fn) => (req, res, next) => {
  try { fn(req, res); } catch (err) { next(err); }
};

// GET /api/games -> { open: [...games you can join], mine: [...your games] }
router.get('/', handle((req, res) => {
  const all = [...store.games.values()].sort((a, b) => b.createdAt - a.createdAt);
  res.json({
    open: all.filter((g) => g.status === 'waiting' && g.players[0].username !== req.user).map(game.summary),
    mine: all.filter((g) => g.players.some((p) => p.username === req.user)).slice(0, 20).map(game.summary),
  });
}));

// POST /api/games -> start a new game session (you are player 1, base top-left)
router.post('/', handle((req, res) => {
  const waiting = [...store.games.values()].filter(
    (g) => g.status === 'waiting' && g.players[0].username === req.user
  );
  if (waiting.length >= MAX_WAITING_PER_USER) {
    throw new game.GameError(409, `You already have ${MAX_WAITING_PER_USER} games waiting for an opponent`);
  }
  const g = game.createGame(store.newGameId(), req.user);
  store.games.set(g.id, g);
  res.status(201).json(game.publicState(g, req.user));
}));

// POST /api/games/:id/join -> you become player 2 (base bottom-right); the game starts
router.post('/:id/join', handle((req, res) => {
  const g = findGame(req);
  game.joinGame(g, req.user);
  res.json(game.publicState(g, req.user));
}));

// GET /api/games/:id -> full state from your point of view
router.get('/:id', handle((req, res) => {
  res.json(game.publicState(findGame(req), req.user));
}));

// GET /api/games/:id/moves -> your legal moves right now
router.get('/:id/moves', handle((req, res) => {
  const state = game.publicState(findGame(req), req.user);
  res.json({ yourTurn: state.yourTurn, validMoves: state.validMoves, canAttack: state.canAttack });
}));

// POST /api/games/:id/move  { direction: "up" | "down" | "left" | "right" }
router.post('/:id/move', handle((req, res) => {
  const g = findGame(req);
  game.move(g, req.user, req.body?.direction);
  res.json(game.publicState(g, req.user));
}));

// POST /api/games/:id/attack -> capture the enemy base when standing next to it
router.post('/:id/attack', handle((req, res) => {
  const g = findGame(req);
  game.attack(g, req.user);
  res.json(game.publicState(g, req.user));
}));

// POST /api/games/:id/forfeit
router.post('/:id/forfeit', handle((req, res) => {
  const g = findGame(req);
  game.forfeit(g, req.user);
  res.json(game.publicState(g, req.user));
}));

// GET /api/games/:id/winner -> check for a winner
router.get('/:id/winner', handle((req, res) => {
  const g = findGame(req);
  res.json({ finished: g.status === 'finished', winner: g.winner, reason: g.reason });
}));

module.exports = router;