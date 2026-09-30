# Task API

Express CRUD API that stores tasks in `tasks.json`.

## Run

```powershell
npm install
npm start
```

The API listens on port 3000 by default. Set `PORT` to use another port.

## Routes

- `GET /tasks`
- `GET /tasks/:id`
- `POST /tasks` with `{ "title": "Prepare notes" }` and optional boolean `completed`
- `PUT /tasks/:id` with a non-empty `title`, boolean `completed`, or both
- `DELETE /tasks/:id`

Run `npm test` to verify CRUD, persistence, and validation behavior.