const packageJson = {
  name: "grid-conquest",
  version: "1.0.0",
  description: "Turn-based multiplayer strategy game: Express REST API + HTML/CSS/JS frontend",
  main: "server.js",
  scripts: {
    start: "node server.js",
    test: "node test/smoke.test.js"
  },
  engines: { node: ">=18" },
  dependencies: {
    express: "^4.19.2"
  }
};

module.exports = packageJson;