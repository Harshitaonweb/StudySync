const router = require('express').Router();
const { getAll, create } = require('../controllers/tagController');
const { authenticate } = require('../middleware/auth');

router.get('/', getAll);
router.post('/', authenticate, create);

module.exports = router;
