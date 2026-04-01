const router = require('express').Router();
const { search } = require('../controllers/resourceController');

router.get('/', search);

module.exports = router;
