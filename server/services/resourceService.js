const resourceRepo = require('../repositories/resourceRepository');
const tagRepo = require('../repositories/tagRepository');

const syncTags = async (resourceId, tagNames = []) => {
  await tagRepo.detachFromResource(resourceId);
  for (const name of tagNames) {
    const tag = await tagRepo.findOrCreate(name);
    await tagRepo.attachToResource(resourceId, tag.id);
  }
};

const create = async (data) => {
  const { tags, ...rest } = data;
  const resource = await resourceRepo.create(rest);
  if (tags?.length) await syncTags(resource.id, tags);
  return resourceRepo.findById(resource.id);
};

const update = async (id, userId, data) => {
  const existing = await resourceRepo.findById(id);
  if (!existing) throw Object.assign(new Error('Resource not found'), { status: 404 });
  if (existing.owner_id !== userId) throw Object.assign(new Error('Forbidden'), { status: 403 });

  const { tags, ...fields } = data;
  if (Object.keys(fields).length) await resourceRepo.update(id, fields);
  if (tags) await syncTags(id, tags);
  return resourceRepo.findById(id);
};

const remove = async (id, userId) => {
  const existing = await resourceRepo.findById(id);
  if (!existing) throw Object.assign(new Error('Resource not found'), { status: 404 });
  if (existing.owner_id !== userId) throw Object.assign(new Error('Forbidden'), { status: 403 });
  await resourceRepo.remove(id);
};

module.exports = { create, update, remove };
