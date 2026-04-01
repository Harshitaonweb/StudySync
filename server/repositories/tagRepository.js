const db = require('../config/db');

const findOrCreate = async (name) => {
  const normalized = name.toLowerCase().trim();
  const { rows } = await db.query(
    `INSERT INTO tags (name) VALUES ($1)
     ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
     RETURNING *`,
    [normalized]
  );
  return rows[0];
};

const attachToResource = async (resourceId, tagId) => {
  await db.query(
    `INSERT INTO resource_tags (resource_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
    [resourceId, tagId]
  );
};

const detachFromResource = async (resourceId) => {
  await db.query('DELETE FROM resource_tags WHERE resource_id = $1', [resourceId]);
};

const findAll = async () => {
  const { rows } = await db.query('SELECT * FROM tags ORDER BY name');
  return rows;
};

module.exports = { findOrCreate, attachToResource, detachFromResource, findAll };
