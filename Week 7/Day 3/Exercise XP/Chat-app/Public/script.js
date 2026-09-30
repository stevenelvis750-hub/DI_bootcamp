(() => {
  const socket = io();
  const $ = (sel) => document.querySelector(sel);
 
  const el = {
    login: $('#login'), loginForm: $('#login-form'), username: $('#username'), loginError: $('#login-error'),
    app: $('#app'), meName: $('#me-name'), meAvatar: $('#me-avatar'),
    roomList: $('#room-list'), newRoomForm: $('#new-room-form'), newRoom: $('#new-room'),
    theme: $('#theme'), mute: $('#mute'),
    roomTitle: $('#room-title'), conn: $('#conn'), leave: $('#leave'),
    messages: $('#messages'), composer: $('#composer'), input: $('#msg-input'), send: $('#send'),
    dmChip: $('#dm-chip'), dmName: $('#dm-name'), dmCancel: $('#dm-cancel'),
    userList: $('#user-list'), userCount: $('#user-count'),
    emojiBtn: $('#emoji-btn'), emojiPanel: $('#emoji-panel'),
    sidebar: $('#sidebar'), usersPanel: $('#users-panel'),
    toggleSidebar: $('#toggle-sidebar'), toggleUsers: $('#toggle-users'), toast: $('#toast'),
  };
 
  const state = {
    me: null, room: null, dm: null, unread: 0,
    muted: localStorage.getItem('chat-muted') === '1',
  };
  const baseTitle = document.title;
 
  /* ---------- Helpers ---------- */
  const hue = (name) => [...name].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7);
  const initial = (name) => name.trim()[0].toUpperCase();
  const time = (ts) => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
 
  function avatar(name, small) {
    const a = document.createElement('div');
    a.className = 'avatar' + (small ? ' sm' : '');
    a.style.background = `hsl(${hue(name)} 55% 45%)`;
    a.textContent = initial(name);
    return a;
  }
 
  function showToast(text) {
    el.toast.textContent = text;
    el.toast.classList.remove('hidden');
    clearTimeout(showToast.t);
    showToast.t = setTimeout(() => el.toast.classList.add('hidden'), 3000);
  }
 
  /* ---------- Rendering ---------- */
  function clearMessages() { el.messages.textContent = ''; }
 
  function pushNode(node) {
    const nearBottom = el.messages.scrollHeight - el.messages.scrollTop - el.messages.clientHeight < 120;
    el.messages.querySelector('.empty')?.remove();
    el.messages.appendChild(node);
    if (nearBottom || node.classList.contains('own')) el.messages.scrollTop = el.messages.scrollHeight;
  }
 
  function addMessage({ user, text, ts, from, to }, isPrivate = false) {
    const sender = isPrivate ? from : user;
    const div = document.createElement('div');
    div.className = 'msg' + (sender === state.me ? ' own' : '') + (isPrivate ? ' private' : '');
 
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
 
    const meta = document.createElement('div');
    meta.className = 'meta';
    const name = document.createElement('strong');
    name.textContent = isPrivate
      ? (sender === state.me ? `You → ${to}` : `${from} (private)`)
      : sender;
    const stamp = document.createElement('span');
    stamp.textContent = time(ts);
    meta.append(name, stamp);
 
    const body = document.createElement('div');
    body.className = 'text';
    body.textContent = text; // textContent prevents HTML injection
 
    bubble.append(meta, body);
    div.append(avatar(sender, true), bubble);
    pushNode(div);
  }
 
  function addSystem(text) {
    const div = document.createElement('div');
    div.className = 'system';
    div.textContent = text;
    pushNode(div);
  }
 
  function renderRooms(list) {
    el.roomList.textContent = '';
    list.forEach(({ name, count }) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = name === state.room ? 'active' : '';
      const label = document.createElement('span');
      label.textContent = `# ${name}`;
      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = count;
      btn.append(label, badge);
      btn.addEventListener('click', () => joinRoom(name));
      li.appendChild(btn);
      el.roomList.appendChild(li);
    });
  }
 
  function renderUsers(list) {
    el.userCount.textContent = list.length;
    el.userList.textContent = '';
    list.forEach((name) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'user-btn' + (name === state.dm ? ' active' : '');
      const label = document.createElement('span');
      label.textContent = name === state.me ? `${name} (you)` : name;
      btn.append(avatar(name, true), label);
      if (name !== state.me) btn.addEventListener('click', () => setDm(state.dm === name ? null : name));
      else btn.disabled = true;
      li.appendChild(btn);
      el.userList.appendChild(li);
    });
  }
 
  function setDm(name) {
    state.dm = name;
    el.dmChip.classList.toggle('hidden', !name);
    el.dmName.textContent = name || '';
    el.input.placeholder = name ? `Private message to ${name}…` : 'Type a message…';
    el.userList.querySelectorAll('.user-btn').forEach((b) => {
      b.classList.toggle('active', !!name && b.textContent.startsWith(name));
    });
    if (name) el.input.focus();
    el.usersPanel.classList.remove('open');
  }
 
  function setInRoom(inRoom) {
    el.input.disabled = !inRoom;
    el.send.disabled = !inRoom;
    el.leave.disabled = !inRoom;
  }
 
  /* ---------- Notifications ---------- */
  let audioCtx;
  function beep() {
    if (state.muted) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.frequency.value = 660;
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.25);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch { /* audio not available */ }
  }
 
  function notifyNew(title, body) {
    beep();
    if (document.hidden) {
      state.unread += 1;
      document.title = `(${state.unread}) ${baseTitle}`;
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body });
      }
    }
  }
 
  function clearUnread() {
    state.unread = 0;
    document.title = baseTitle;
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden) clearUnread(); });
  window.addEventListener('focus', clearUnread);
 
  function updateMuteButton() {
    el.mute.textContent = state.muted ? '🔕 Sound off' : '🔔 Sound on';
  }
 
  /* ---------- Actions ---------- */
  function joinRoom(name) {
    socket.emit('join', name, (res) => {
      if (!res.ok) return showToast(res.error);
      state.room = res.room;
      clearMessages();
      res.history.forEach((m) => addMessage(m));
      addSystem(res.history.length ? `You joined #${res.room} — showing the last ${res.history.length} message(s)` : `You joined #${res.room}`);
      el.roomTitle.textContent = `# ${res.room}`;
      renderUsers(res.users);
      setInRoom(true);
      el.sidebar.classList.remove('open');
      el.input.focus();
    });
  }
 
  function leaveRoom() {
    socket.emit('leave', () => {
      state.room = null;
      clearMessages();
      const empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = 'You left the room. Pick another one to keep chatting.';
      el.messages.appendChild(empty);
      el.roomTitle.textContent = 'No room selected';
      renderUsers([]);
      setDm(null);
      setInRoom(false);
    });
  }
 
  function login(name, done) {
    socket.emit('login', name, (res) => done(res));
  }
 
  /* ---------- Events: UI ---------- */
  el.loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    el.loginError.textContent = '';
    login(el.username.value, (res) => {
      if (!res.ok) { el.loginError.textContent = res.error; return; }
      state.me = res.username;
      el.meName.textContent = state.me;
      el.meAvatar.replaceWith(Object.assign(avatar(state.me), { id: 'me-avatar' }));
      el.login.classList.add('hidden');
      el.app.classList.remove('hidden');
      renderRooms(res.rooms);
      joinRoom('general');
      if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission();
    });
  });
 
  el.composer.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = el.input.value.trim();
    if (!text || !state.room) return;
    const cb = (res) => { if (!res.ok) showToast(res.error); };
    if (state.dm) socket.emit('private', { to: state.dm, text }, cb);
    else socket.emit('message', text, cb);
    el.input.value = '';
  });
 
  el.newRoomForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (el.newRoom.value.trim()) joinRoom(el.newRoom.value);
    el.newRoom.value = '';
  });
 
  el.leave.addEventListener('click', leaveRoom);
  el.dmCancel.addEventListener('click', () => setDm(null));
 
  el.theme.value = localStorage.getItem('chat-theme') || 'dark';
  document.documentElement.dataset.theme = el.theme.value;
  el.theme.addEventListener('change', () => {
    document.documentElement.dataset.theme = el.theme.value;
    localStorage.setItem('chat-theme', el.theme.value);
  });
 
  updateMuteButton();
  el.mute.addEventListener('click', () => {
    state.muted = !state.muted;
    localStorage.setItem('chat-muted', state.muted ? '1' : '0');
    updateMuteButton();
  });
 
  // Emoji picker
  '😀 😂 😊 😍 😎 🤔 😢 😡 👍 👎 👏 🙏 🎉 🔥 ❤️ 💯 🚀 👀 ✅ ❌ 😴 🤝 💡 🍕'.split(' ').forEach((emo) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = emo;
    b.addEventListener('click', () => {
      el.input.setRangeText(emo, el.input.selectionStart ?? el.input.value.length, el.input.selectionEnd ?? el.input.value.length, 'end');
      el.input.focus();
    });
    el.emojiPanel.appendChild(b);
  });
  el.emojiBtn.addEventListener('click', (e) => { e.stopPropagation(); el.emojiPanel.classList.toggle('hidden'); });
  document.addEventListener('click', (e) => { if (!el.emojiPanel.contains(e.target)) el.emojiPanel.classList.add('hidden'); });
 
  // Mobile drawers
  el.toggleSidebar.addEventListener('click', () => { el.sidebar.classList.toggle('open'); el.usersPanel.classList.remove('open'); });
  el.toggleUsers.addEventListener('click', () => { el.usersPanel.classList.toggle('open'); el.sidebar.classList.remove('open'); });
 
  /* ---------- Events: socket ---------- */
  socket.on('message', (m) => {
    if (m.room !== state.room) return;
    addMessage(m);