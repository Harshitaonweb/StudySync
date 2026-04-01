const resourceRepo = require('../repositories/resourceRepository');
const resourceService = require('../services/resourceService');

const create = async (req, res, next) => {
  try {
    const resource = await resourceService.create({ ...req.body, owner_id: req.user.id });
    res.status(201).json(resource);
  } catch (e) { next(e); }
};

const getAll = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const resources = await resourceRepo.findAll({ page: +page || 1, limit: +limit || 20 });
    res.json(resources);
  } catch (e) { next(e); }
};

const getOne = async (req, res, next) => {
  try {
    const resource = await resourceRepo.findById(req.params.id);
    if (!resource) return res.status(404).json({ error: 'Not found' });
    if (!resource.is_public && resource.owner_id !== req.user?.id)
      return res.status(403).json({ error: 'Forbidden' });
    res.json(resource);
  } catch (e) { next(e); }
};

const update = async (req, res, next) => {
  try {
    const resource = await resourceService.update(req.params.id, req.user.id, req.body);
    res.json(resource);
  } catch (e) { next(e); }
};

const remove = async (req, res, next) => {
  try {
    await resourceService.remove(req.params.id, req.user.id);
    res.status(204).send();
  } catch (e) { next(e); }
};

const search = async (req, res, next) => {
  try {
    const { q, type, difficulty, tags, page, limit } = req.query;
    const results = await resourceRepo.search({
      q,
      type: type ? [].concat(type) : undefined,
      difficulty: difficulty ? [].concat(difficulty) : undefined,
      tags: tags ? [].concat(tags) : undefined,
      page: +page || 1,
      limit: +limit || 20,
    });
    res.json(results);
  } catch (e) { next(e); }
};

module.exports = { create, getAll, getOne, update, remove, search };
