const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// GET route
app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello From Express" });
});

// POST route
app.post("/api/world", (req, res) => {
  console.log("Request body:", req.body);
  res.send({
    message: `I received your POST request. This is what you sent me: ${req.body.input}`
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
