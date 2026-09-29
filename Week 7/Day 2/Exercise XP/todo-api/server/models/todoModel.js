const pool = require("../config/db");

async function getAll() {
  const result = await pool.query("SELECT id, title, completed FROM tasks ORDER BY id");
  return result.rows;
}

async function getById(id) {
  const result = await pool.query(
    "SELECT id, title, completed FROM tasks WHERE id = $1",
    [id],
  );
  return result.rows[0];
}

async function create({ title, completed }) {
  const result = await pool.query(
    "INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING id, title, completed",
    [title, completed],
  );
  return result.rows[0];
}

async function update(id, fields) {
  const assignments = [];
  const values = [];
  for (const field of ["title", "completed"]) {
    if (fields[field] !== undefined) {
      values.push(fields[field]);
      assignments.push(`${field} = $${values.length}`);
    }
  }
  values.push(id);
  const result = await pool.query(
    `UPDATE tasks SET ${assignments.join(", ")} WHERE id = $${values.length} RETURNING id, title, completed`,
    values,
  );
  return result.rows[0];
}

async function remove(id) {
  const result = await pool.query("DELETE FROM tasks WHERE id = $1 RETURNING id", [id]);
  return result.rowCount > 0;
}

module.exports = { getAll, getById, create, update, remove };