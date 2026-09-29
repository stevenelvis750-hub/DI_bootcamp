# Blog API

This API stores posts in PostgreSQL. Configure `DATABASE_URL` before starting it, for example:

```powershell
$env:DATABASE_URL = "postgres://username:password@localhost:5432/postgres"
psql $env:DATABASE_URL -f server/config/schema.sql
npm start
```

The API listens on port 3000 by default. Set `PORT` to use another port. Routes are `GET /posts`, `GET /posts/:id`, `POST /posts`, `PUT /posts/:id`, and `DELETE /posts/:id`.