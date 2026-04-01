const tagRepo = require('../repositories/tagRepository');

const getAll = async (req, res, next) => {
  try {
    res.json(await tagRepo.findAll());
  } catch (e) { next(e); }
};

const create = async (req, res, next) => {
  try {
    const tag = await tagRepo.findOrCreate(req.body.name);
    res.status(201).json(tag);
  } catch (e) { next(e); }
};

module.exports = { getAll, create };
