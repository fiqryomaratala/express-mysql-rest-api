import db from "../db.js";
import bcrypt from "bcryptjs";

// GET all users
export async function getUsers() {
  const [rows] = await db.query(
    "SELECT id, name, email, created_at, updated_at FROM users"
  );
  return rows;
}

// GET one user by ID
export async function getUserById(id) {
  const [rows] = await db.query(
    "SELECT id, name, email, created_at, updated_at FROM users WHERE id = ?",
    [id]
  );
  return rows[0] || null;
}

// CREATE user
export async function createUser({ name, email, password }) {
  const hash = await bcrypt.hash(password, 10);
  const [result] = await db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hash]
  );
  return await getUserById(result.insertId);
}

// UPDATE user
export async function updateUser(id, data) {
  const fields = [];
  const values = [];

  if (data.name) {
    fields.push("name = ?");
    values.push(data.name);
  }
  if (data.email) {
    fields.push("email = ?");
    values.push(data.email);
  }
  if (data.password) {
    const hash = await bcrypt.hash(data.password, 10);
    fields.push("password = ?");
    values.push(hash);
  }

  if (!fields.length) return await getUserById(id);

  values.push(id);
  await db.query(
    `UPDATE users SET ${fields.join(", ")}, updated_at = NOW() WHERE id = ?`,
    values
  );
  return await getUserById(id);
}

// DELETE user
export async function deleteUser(id) {
  const [res] = await db.query("DELETE FROM users WHERE id = ?", [id]);
  return res.affectedRows > 0;
}
