const express = require("express");
const authRoutes = require("./server/routes/auth");
const userRoutes = require("./server/routes/users");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "16kb" }));
app.use(authRoutes);
app.use("/users", userRoutes);

app.use((_request, response) => response.status(404).json({ error: "Route not found." }));

app.use((error, _request, response, _next) => {
  if (error instanceof SyntaxError && "body" in error) {
    return response.status(400).json({ error: "Request body must contain valid JSON." });
  }
  if (error.code === "23505") {
    return response.status(409).json({ error: "Username or email is already registered." });
  }
  console.error(error);
  response.status(500).json({ error: "Internal server error." });
});

if (require.main === module) {
  app.listen(port, () => console.log(`User API listening at http://localhost:${port}`));
}

module.exports = app;