r · JS
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
 
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;
 
app.use(express.static(path.join(__dirname, 'public')));
 
/* ---------- State (in memory) ---------- */
const DEFAULT_ROOMS = ['general', 'random', 'tech'];
const HISTORY_LIMIT = 50;
const MAX_ROOMS = 50;
const MAX_MESSAGE_LENGTH = 500;
 
const rooms = new Map();   // roomName -> { history: [] }
const users = new Map();   // socket.id -> { username, room }
DEFAULT_ROOMS.forEach((r) => rooms.set(r, { history: [] }));
 
/* ---------- Helpers ---------- */
const usernameTaken = (name) =>
  [...users.values()].some((u) => u.username.toLowerCase() === name.toLowerCase());
 
const socketIdOf = (name) =>
  [...users.entries()].find(([, u]) => u.username.toLowerCase() === name.toLowerCase())?.[0];
 
const usersIn = (room) =>
  [...users.values()].filter((u) => u.room === room).map((u) => u.username).sort((a, b) => a.localeCompare(b));
 
const roomList = () =>
  [...rooms.keys()].map((name) => ({ name, count: usersIn(name).length }));
 
const cleanRoomName = (raw) =>
  String(raw || '').trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9_-]/g, '').slice(0, 20);
 
const broadcastRooms = () => io.emit('rooms', roomList());
 
function leaveCurrentRoom(socket) {
  const user = users.get(socket.id);
  if (!user || !user.room) return;
 
  const room = user.room;
  socket.leave(room);
  user.room = null;
 
  io.to(room).emit('system', { room, text: `${user.username} left the room`, ts: Date.now() });
  io.to(room).emit('users', { room, users: usersIn(room) });
 
  // Remove empty custom rooms (default rooms stay)
  if (!DEFAULT_ROOMS.includes(room) && usersIn(room).length === 0) rooms.delete(room);
  broadcastRooms();
}
 
/* ---------- Socket handlers ---------- */
io.on('connection', (socket) => {
  socket.on('login', (rawName, ack) => {
    if (typeof ack !== 'function') return;
    const name = String(rawName || '').trim();
 
    if (!/^[A-Za-z0-9_ -]{2,20}$/.test(name)) {
      return ack({ ok: false, error: 'Username must be 2-20 characters (letters, numbers, spaces, _ or -).' });
    }
    if (usernameTaken(name)) {
      return ack({ ok: false, error: 'That username is already in use. Pick another one.' });
    }
    users.set(socket.id, { username: name, room: null });
    ack({ ok: true, username: name, rooms: roomList() });
  });
 
  socket.on('join', (rawRoom, ack) => {
    if (typeof ack !== 'function') return;
    const user = users.get(socket.id);
    if (!user) return ack({ ok: false, error: 'Please choose a username first.' });
 
    const name = cleanRoomName(rawRoom);
    if (!name) return ack({ ok: false, error: 'Room name can use letters, numbers, - and _.' });
    if (user.room === name) return ack({ ok: false, error: 'You are already in this room.' });
    if (!rooms.has(name) && rooms.size >= MAX_ROOMS) {
      return ack({ ok: false, error: 'Too many rooms right now. Join an existing one.' });
    }
 
    leaveCurrentRoom(socket);
    if (!rooms.has(name)) rooms.set(name, { history: [] });
 
    socket.join(name);
    user.room = name;
 
    socket.to(name).emit('system', { room: name, text: `${user.username} joined the room`, ts: Date.now() });
    io.to(name).emit('users', { room: name, users: usersIn(name) });
    broadcastRooms();
 
    ack({ ok: true, room: name, history: rooms.get(name).history, users: usersIn(name) });
  });
 
  socket.on('leave', (ack) => {
    leaveCurrentRoom(socket);
    if (typeof ack === 'function') ack({ ok: true });
  });
 
  socket.on('message', (rawText, ack) => {
    const user = users.get(socket.id);
    if (!user || !user.room) return typeof ack === 'function' && ack({ ok: false, error: 'Join a room first.' });
 
    const text = String(rawText || '').trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!text) return typeof ack === 'function' && ack({ ok: false, error: 'Message is empty.' });
 
    const msg = { user: user.username, text, room: user.room, ts: Date.now() };
    const history = rooms.get(user.room).history;
    history.push(msg);
    if (history.length > HISTORY_LIMIT) history.shift();
 
    io.to(user.room).emit('message', msg);
    if (typeof ack === 'function') ack({ ok: true });
  });
 
  socket.on('private', (payload, ack) => {
    const user = users.get(socket.id);
    if (!user) return typeof ack === 'function' && ack({ ok: false, error: 'Please log in first.' });
 
    const to = String(payload?.to || '');
    const text = String(payload?.text || '').trim().slice(0, MAX_MESSAGE_LENGTH);
    const targetId = socketIdOf(to);
 
    if (!text) return typeof ack === 'function' && ack({ ok: false, error: 'Message is empty.' });
    if (!targetId || targetId === socket.id) {
      return typeof ack === 'function' && ack({ ok: false, error: `${to} is not available.` });
    }
 
    const msg = { from: user.username, to: users.get(targetId).username, text, ts: Date.now() };
    io.to(targetId).emit('private', msg);
    socket.emit('private', msg); // echo back to sender
    if (typeof ack === 'function') ack({ ok: true });
  });
 
  socket.on('disconnect', () => {
    leaveCurrentRoom(socket);
    users.delete(socket.id);
  });
});
 
if (require.main === module) {
  server.listen(PORT, () => console.log(`Chat server running on http://localhost:${PORT}`));
}
 
module.exports = { server, io };