const db = require('../config/db');

const create = async ({ name, owner_id }) => {
  const client = await require('../config/db').connect();
  try {
    await client.query('BEGIN');
    const { rows } = await client.query(
      'INSERT INTO groups (name, owner_id) VALUES ($1, $2) RETURNING *',
      [name, owner_id]
    );
    const group = rows[0];
    await client.query(
      'INSERT INTO group_members (group_id, user_id, role) VALUES ($1, $2, $3)',
      [group.id, owner_id, 'ADMIN']
    );
    await client.query('COMMIT');
    return group;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};

const findAll = async (userId) => {
  const { rows } = await db.query(
    `SELECT g.* FROM groups g
     JOIN group_members gm ON gm.group_id = g.id
     WHERE gm.user_id = $1`,
    [userId]
  );
  return rows;
};

const findById = async (id) => {
  const { rows } = await db.query('SELECT * FROM groups WHERE id = $1', [id]);
  return rows[0];
};

const addMember = async (groupId, userId) => {
  await db.query(
    `INSERT INTO group_members (group_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
    [groupId, userId]
  );
};

const isMember = async (groupId, userId) => {
  const { rows } = await db.query(
    'SELECT 1 FROM group_members WHERE group_id = $1 AND user_id = $2',
    [groupId, userId]
  );
  return rows.length > 0;
};

const getResources = async (groupId) => {
  const { rows } = await db.query(
    `SELECT r.*, array_agg(t.name) FILTER (WHERE t.name IS NOT NULL) AS tags
     FROM resources r
     JOIN group_resources gr ON gr.resource_id = r.id
     LEFT JOIN resource_tags rt ON rt.resource_id = r.id
     LEFT JOIN tags t ON t.id = rt.tag_id
     WHERE gr.group_id = $1
     GROUP BY r.id`,
    [groupId]
  );
  return rows;
};

const addResource = async (groupId, resourceId) => {
  await db.query(
    `INSERT INTO group_resources (group_id, resource_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
    [groupId, resourceId]
  );
};

module.exports = { create, findAll, findById, addMember, isMember, getResources, addResource };
