const db = require('../config/db');

const findByEmail = async (email) => {
  const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0];
};

const findById = async (id) => {
  const { rows } = await db.query(
    'SELECT id, name, email, created_at FROM users WHERE id = $1',
    [id]
  );
  return rows[0];
};

const create = async ({ name, email, password_hash }) => {
  const { rows } = await db.query(
    'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
    [name, email, password_hash]
  );
  return rows[0];
};

module.exports = { findByEmail, findById, create };
