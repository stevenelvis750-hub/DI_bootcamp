const pool = require("../config/db");

async function getAll() {
  const result = await pool.query("SELECT id, title, content FROM posts ORDER BY id");
  return result.rows;
}

async function getById(id) {
  const result = await pool.query(
    "SELECT id, title, content FROM posts WHERE id = $1",
    [id],
  );
  return result.rows[0];
}

async function create({ title, content }) {
  const result = await pool.query(
    "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING id, title, content",
    [title, content],
  );
  return result.rows[0];
}

async function update(id, fields) {
  const updates = [];
  const values = [];

  for (const field of ["title", "content"]) {
    if (fields[field] !== undefined) {
      values.push(fields[field]);
      updates.push(`${field} = $${values.length}`);
    }
  }

  values.push(id);
  const result = await pool.query(
    `UPDATE posts SET ${updates.join(", ")} WHERE id = $${values.length} RETURNING id, title, content`,
    values,
  );
  return result.rows[0];
}

async function remove(id) {
  const result = await pool.query("DELETE FROM posts WHERE id = $1 RETURNING id", [id]);
  return result.rowCount > 0;
}

module.exports = { getAll, getById, create, update, remove };