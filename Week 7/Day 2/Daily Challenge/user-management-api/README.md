# User Management API

## Setup

Create a PostgreSQL database and configure `DATABASE_URL`, then apply the schema and start the server:

```powershell
$env:DATABASE_URL = "postgres://username:password@localhost:5432/postgres"
psql $env:DATABASE_URL -f server/config/schema.sql
npm install
npm start
```

The API listens on port 3000 by default. Set `PORT` to change it.

## Routes

- `POST /register` with `username`, `password`, and optional `email`, `first_name`, `last_name`
- `POST /login` with `username` and `password`
- `GET /users`
- `GET /users/:id`
- `PUT /users/:id` with one or more of `email`, `username`, `first_name`, `last_name`, or `password`

Passwords require at least 8 characters and are hashed with bcrypt. User creation and credential storage run in one PostgreSQL transaction. User read routes never return password hashes.