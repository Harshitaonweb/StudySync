const router = require('express').Router();
const ctrl = require('../controllers/resourceController');
const { authenticate } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { z } = require('zod');

const resourceSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  type: z.enum(['PDF', 'VIDEO', 'NOTE', 'CODE']),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  tags: z.array(z.string()).optional(),
  file_url: z.string().url().optional().nullable(),
  external_url: z.string().url().optional().nullable(),
  is_public: z.boolean().optional(),
});

router.get('/', ctrl.getAll);
router.post('/', authenticate, validate(resourceSchema), ctrl.create);
router.get('/:id', ctrl.getOne);
router.put('/:id', authenticate, validate(resourceSchema.partial()), ctrl.update);
router.delete('/:id', authenticate, ctrl.remove);

module.exports = router;
