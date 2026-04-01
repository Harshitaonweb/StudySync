const db = require('../config/db');

const create = async ({ title, description, type, difficulty, file_url, external_url, owner_id, is_public }) => {
  const { rows } = await db.query(
    `INSERT INTO resources (title, description, type, difficulty, file_url, external_url, owner_id, is_public)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [title, description, type, difficulty, file_url, external_url, owner_id, is_public ?? true]
  );
  return rows[0];
};

const findById = async (id) => {
  const { rows } = await db.query(
    `SELECT r.*, array_agg(t.name) FILTER (WHERE t.name IS NOT NULL) AS tags
     FROM resources r
     LEFT JOIN resource_tags rt ON rt.resource_id = r.id
     LEFT JOIN tags t ON t.id = rt.tag_id
     WHERE r.id = $1
     GROUP BY r.id`,
    [id]
  );
  return rows[0];
};

const findAll = async ({ page = 1, limit = 20, owner_id } = {}) => {
  const offset = (page - 1) * limit;
  const params = [limit, offset];
  let where = 'WHERE r.is_public = true';
  if (owner_id) {
    where = 'WHERE r.owner_id = $3';
    params.push(owner_id);
  }
  const { rows } = await db.query(
    `SELECT r.*, array_agg(t.name) FILTER (WHERE t.name IS NOT NULL) AS tags
     FROM resources r
     LEFT JOIN resource_tags rt ON rt.resource_id = r.id
     LEFT JOIN tags t ON t.id = rt.tag_id
     ${where}
     GROUP BY r.id
     ORDER BY r.created_at DESC
     LIMIT $1 OFFSET $2`,
    params
  );
  return rows;
};

const update = async (id, fields) => {
  const keys = Object.keys(fields);
  const values = Object.values(fields);
  const set = keys.map((k, i) => `${k} = $${i + 2}`).join(', ');
  const { rows } = await db.query(
    `UPDATE resources SET ${set}, updated_at = NOW() WHERE id = $1 RETURNING *`,
    [id, ...values]
  );
  return rows[0];
};

const remove = async (id) => {
  await db.query('DELETE FROM resources WHERE id = $1', [id]);
};

const search = async ({ q, type, difficulty, tags, page = 1, limit = 20 }) => {
  const offset = (page - 1) * limit;
  const conditions = ['r.is_public = true'];
  const params = [];
  let idx = 1;

  if (q) {
    conditions.push(`r.title ILIKE $${idx++}`);
    params.push(`%${q}%`);
  }
  if (type?.length) {
    conditions.push(`r.type = ANY($${idx++}::resource_type[])`);
    params.push(type);
  }
  if (difficulty?.length) {
    conditions.push(`r.difficulty = ANY($${idx++}::difficulty_level[])`);
    params.push(difficulty);
  }

  let tagJoin = '';
  if (tags?.length) {
    tagJoin = `JOIN resource_tags rt2 ON rt2.resource_id = r.id
               JOIN tags t2 ON t2.id = rt2.tag_id AND t2.name = ANY($${idx++})`;
    params.push(tags);
  }

  params.push(limit, offset);

  const { rows } = await db.query(
    `SELECT DISTINCT r.*, array_agg(t.name) FILTER (WHERE t.name IS NOT NULL) AS tags
     FROM resources r
     LEFT JOIN resource_tags rt ON rt.resource_id = r.id
     LEFT JOIN tags t ON t.id = rt.tag_id
     ${tagJoin}
     WHERE ${conditions.join(' AND ')}
     GROUP BY r.id
     ORDER BY r.created_at DESC
     LIMIT $${idx++} OFFSET $${idx}`,
    params
  );
  return rows;
};

module.exports = { create, findById, findAll, update, remove, search };
