const express = require("express");
const todoRoutes = require("./server/routes/todoRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "16kb" }));
app.use("/api/todos", todoRoutes);

app.use((_request, response) => response.status(404).json({ error: "Route not found." }));

app.use((error, _request, response, _next) => {
  if (error instanceof SyntaxError && "body" in error) {
    return response.status(400).json({ error: "Request body must contain valid JSON." });
  }
  console.error(error);
  response.status(500).json({ error: "Internal server error." });
});

if (require.main === module) {
  app.listen(port, () => console.log(`Todo API listening at http://localhost:${port}`));
}

module.exports = app;