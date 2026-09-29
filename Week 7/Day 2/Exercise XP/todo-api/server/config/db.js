const { Pool } = require("pg");

const pool = new Pool({
  ...(process.env.DATABASE_URL ? { connectionString: process.env.DATABASE_URL } : {}),
  connectionTimeoutMillis: 3000,
});

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL client error:", error);
});

module.exports = pool;