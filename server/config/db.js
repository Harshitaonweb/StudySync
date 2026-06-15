const { Pool } = require('pg');

let pool;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });
} else {
  // Local Homebrew Postgres — no password
  pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'studysync',
    user: process.env.USER || 'harshita',
    password: null,
  });
}

pool.on('error', (err) => {
  console.error('Unexpected DB error', err);
  process.exit(-1);
});

module.exports = pool;
