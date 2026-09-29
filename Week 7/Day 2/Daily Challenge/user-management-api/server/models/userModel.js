const pool = require("../config/db");

const publicUserColumns = "id, email, username, first_name, last_name";

async function create({ email, username, first_name, last_name, passwordHash }) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const userResult = await client.query(
      "INSERT INTO users (email, username, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, email, username, first_name, last_name",
      [email, username, first_name, last_name],
    );
    const user = userResult.rows[0];
    await client.query(
      "INSERT INTO hashpwd (user_id, username, password) VALUES ($1, $2, $3)",
      [user.id, username, passwordHash],
    );
    await client.query("COMMIT");
    return user;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function findCredentialsByUsername(username) {
  const result = await pool.query(
    `SELECT u.${publicUserColumns.split(", ").join(", u.")}, h.password
     FROM users AS u
     JOIN hashpwd AS h ON h.user_id = u.id AND h.username = u.username
     WHERE u.username = $1`,
    [username],
  );
  return result.rows[0];
}

async function getAll() {
  const result = await pool.query(`SELECT ${publicUserColumns} FROM users ORDER BY id`);
  return result.rows;
}

async function getById(id) {
  const result = await pool.query(
    `SELECT ${publicUserColumns} FROM users WHERE id = $1`,
    [id],
  );
  return result.rows[0];
}

async function update(id, fields) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const existing = await client.query("SELECT id FROM users WHERE id = $1", [id]);
    if (existing.rowCount === 0) {
      await client.query("ROLLBACK");
      return undefined;
    }

    const columnNames = {
      email: "email",
      username: "username",
      first_name: "first_name",
      last_name: "last_name",
    };
    const values = [];
    const assignments = [];
    for (const [field, column] of Object.entries(columnNames)) {
      if (fields[field] !== undefined) {
        values.push(fields[field]);
        assignments.push(`${column} = $${values.length}`);
      }
    }
    if (assignments.length > 0) {
      values.push(id);
      await client.query(
        `UPDATE users SET ${assignments.join(", ")} WHERE id = $${values.length}`,
        values,
      );
    }
    if (fields.username !== undefined) {
      await client.query("UPDATE hashpwd SET username = $1 WHERE user_id = $2", [fields.username, id]);
    }
    if (fields.passwordHash !== undefined) {
      await client.query("UPDATE hashpwd SET password = $1 WHERE user_id = $2", [fields.passwordHash, id]);
    }
    const result = await client.query(
      `SELECT ${publicUserColumns} FROM users WHERE id = $1`,
      [id],
    );
    await client.query("COMMIT");
    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

module.exports = { create, findCredentialsByUsername, getAll, getById, update };