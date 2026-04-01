const groupRepo = require('../repositories/groupRepository');

const create = async (req, res, next) => {
  try {
    const group = await groupRepo.create({ name: req.body.name, owner_id: req.user.id });
    res.status(201).json(group);
  } catch (e) { next(e); }
};

const getAll = async (req, res, next) => {
  try {
    res.json(await groupRepo.findAll(req.user.id));
  } catch (e) { next(e); }
};

const join = async (req, res, next) => {
  try {
    const group = await groupRepo.findById(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });
    await groupRepo.addMember(req.params.id, req.user.id);
    res.json({ message: 'Joined group' });
  } catch (e) { next(e); }
};

const getResources = async (req, res, next) => {
  try {
    const isMember = await groupRepo.isMember(req.params.id, req.user.id);
    if (!isMember) return res.status(403).json({ error: 'Not a member' });
    res.json(await groupRepo.getResources(req.params.id));
  } catch (e) { next(e); }
};

const addResource = async (req, res, next) => {
  try {
    const isMember = await groupRepo.isMember(req.params.id, req.user.id);
    if (!isMember) return res.status(403).json({ error: 'Not a member' });
    await groupRepo.addResource(req.params.id, req.body.resource_id);
    res.status(201).json({ message: 'Resource added to group' });
  } catch (e) { next(e); }
};

module.exports = { create, getAll, join, getResources, addResource };
