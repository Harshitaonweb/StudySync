const { Pool } = require('pg');

const { Pool } = require('pg');

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        password: process.env.DB_PASSWORD || undefined,
      }
    : {
        host: 'localhost',
        port: 5432,
        database: 'studysync',
        user: process.env.USER || 'harshita',
      }
);

pool.on('error', (err) => {
  console.error('Unexpected DB error', err);
  process.exit(-1);
});

module.exports = pool;
