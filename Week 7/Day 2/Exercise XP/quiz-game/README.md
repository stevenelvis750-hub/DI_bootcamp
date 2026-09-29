# Stack Check Quiz

Express serves the quiz interface and JSON API. PostgreSQL stores questions, answer options, and the correct option for each question. Quiz sessions and scores are kept in server memory for the duration of a session.

## Setup

Create a PostgreSQL database, then from this directory configure the connection, create and seed the tables, and start the server:

```powershell
$env:DATABASE_URL = "postgres://username:password@localhost:5432/postgres"
npm install
psql $env:DATABASE_URL -f server/config/schema.sql
npm start
```

The app listens on port 3000 by default. Set `PORT` to use another port.

## API

- `POST /api/quiz/start` starts a quiz and returns its first question without the answer.
- `POST /api/quiz/answer` accepts `{ "sessionId": "...", "optionId": 1 }` and returns correctness and the explanation.
- `POST /api/quiz/next` advances to the next question or returns the final score.