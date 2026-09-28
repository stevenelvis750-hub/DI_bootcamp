# Exercise XP Gold APIs

Each API is an independent Express project. Run `npm install` once in each project folder, then start it with `npm start`.

## CRUD API

Folder: `crud-api-intermediate`  
Default: `http://localhost:5000`

- `GET /api/posts`
- `GET /api/posts/:id`
- `POST /api/posts` with `title`, `body`, and optional `userId`
- `PUT /api/posts/:id` with `title`, `body`, and optional `userId`
- `DELETE /api/posts/:id`

This API proxies JSONPlaceholder. That service simulates writes; created, updated, and deleted posts are not persisted.

## User Login

Folder: `user-login`  
Default: `http://localhost:5000`

- `POST /api/register` with `name`, `email`, and a password of at least 8 characters containing uppercase, lowercase, a number, and a symbol
- `POST /api/login` with `email` and `password`
- `GET /api/profile` with `Authorization: Bearer <token>`

Accounts and failed-login counters are in memory and reset on restart. Passwords are bcrypt-hashed. Login locks for 15 minutes after five failed attempts. Set `JWT_SECRET` to a persistent secret before using this beyond local practice; the default secret is generated at startup.

## Todo API

Folder: `todo-list-api`  
Default: `http://localhost:5000`

- `POST /api/todos` with `title` and optional boolean `completed`
- `GET /api/todos`
- `GET /api/todos/:id`
- `PUT /api/todos/:id` with `title` and/or `completed`
- `DELETE /api/todos/:id`

Todos are stored in memory and reset when the server restarts. To run multiple APIs at once, set a different `PORT` for each process.