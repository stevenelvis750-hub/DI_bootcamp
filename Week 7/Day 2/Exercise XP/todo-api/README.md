# Todo API

PostgreSQL-backed Express API for creating and managing todo tasks.

## Setup

Set `DATABASE_URL` to a PostgreSQL connection string, install dependencies, apply the table schema, and start the API:

```powershell
$env:DATABASE_URL = "postgres://username:password@localhost:5432/postgres"
npm install
psql $env:DATABASE_URL -f server/config/schema.sql
npm start
```

The server listens on port 3000 by default. Set `PORT` to use another port.

## Routes

- `POST /api/todos` with `{ "title": "Buy milk" }` and optional boolean `completed`
- `GET /api/todos`
- `GET /api/todos/:id`
- `PUT /api/todos/:id` with a non-empty `title`, `completed`, or both
- `DELETE /api/todos/:id`

Run `npm test` for the CRUD and validation checks.