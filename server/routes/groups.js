const router = require('express').Router();
const ctrl = require('../controllers/groupController');
const { authenticate } = require('../middleware/auth');

router.post('/', authenticate, ctrl.create);
router.get('/', authenticate, ctrl.getAll);
router.post('/:id/join', authenticate, ctrl.join);
router.get('/:id/resources', authenticate, ctrl.getResources);
router.post('/:id/resources', authenticate, ctrl.addResource);

module.exports = router;
