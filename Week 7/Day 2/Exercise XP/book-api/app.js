const express = require("express");
const { port } = require("./server/config");
const booksRouter = require("./server/routes/books");

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use("/api/books", booksRouter);

app.use((_request, response) => response.status(404).json({ message: "Route not found" }));

app.use((error, _request, response, _next) => {
  if (error instanceof SyntaxError && "body" in error) {
    return response.status(400).json({ message: "Request body must contain valid JSON." });
  }
  console.error(error);
  response.status(500).json({ message: "Internal server error." });
});

if (require.main === module) {
  app.listen(port, () => console.log(`Book API listening at http://localhost:${port}`));
}

module.exports = app;