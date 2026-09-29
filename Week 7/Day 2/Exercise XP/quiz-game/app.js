const express = require("express");
const path = require("node:path");
const quizRoutes = require("./server/routes/quizRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "16kb" }));
app.use("/api/quiz", quizRoutes);

app.use((request, response) => {
  if (request.path.startsWith("/api/")) {
    return response.status(404).json({ error: "API route not found." });
  }
  response.status(404).send("Page not found.");
});

app.use((error, _request, response, _next) => {
  if (error instanceof SyntaxError && "body" in error) {
    return response.status(400).json({ error: "Request body must contain valid JSON." });
  }
  console.error(error);
  response.status(500).json({ error: "Internal server error." });
});

if (require.main === module) {
  app.listen(port, () => console.log(`Quiz game listening at http://localhost:${port}`));
}

module.exports = app;