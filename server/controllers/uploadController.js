const uploadService = require('../services/uploadService');

const getSignedUrl = async (req, res, next) => {
  try {
    const { filename, contentType } = req.body;
    if (!filename || !contentType) return res.status(400).json({ error: 'filename and contentType required' });
    const result = await uploadService.getUploadUrl(filename, contentType);
    res.json(result);
  } catch (e) { next(e); }
};

module.exports = { getSignedUrl };
