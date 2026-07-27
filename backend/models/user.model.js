import pool from "../db/db.js";

export const findUserByEmail = async (email) => {
  const [rows] = await pool.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  return rows[0];
};

export const createUser = async (name, email, password) => {
  const [result] = await pool.execute(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );

  return result;
};

export const saveRefreshToken = async (userId, refreshToken) => {
  await pool.execute(
    "UPDATE users SET refresh_token = ? WHERE id = ?",
    [refreshToken, userId]
  );
};

export const getRefreshToken = async (userId) => {
  const [rows] = await pool.execute(
    "SELECT refresh_token FROM users WHERE id = ?",
    [userId]
  );

  return rows[0]?.refresh_token;
};

export const removeRefreshToken = async (userId) => {
  await pool.execute(
    "UPDATE users SET refresh_token = NULL WHERE id = ?",
    [userId]
  );
};