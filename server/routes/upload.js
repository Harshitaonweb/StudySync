const router = require('express').Router();
const { getSignedUrl } = require('../controllers/uploadController');
const { authenticate } = require('../middleware/auth');

router.post('/signed-url', authenticate, getSignedUrl);

module.exports = router;
