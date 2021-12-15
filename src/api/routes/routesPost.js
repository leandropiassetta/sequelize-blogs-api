const router = require('express').Router();
const { validateSchema } = require('../../middlewares/validateSchema');
const { validateToken } = require('../../middlewares/validateToken');
const { postSchema } = require('../../schemas/postSchema');
const { putSchema } = require('../../schemas/putSchema');

const {
  createPost,
  getAll,
  getPostById,
  updatePost,
} = require('../../controllers/postController');

router.get('/', validateToken, getAll);
router.post('/', validateToken, validateSchema(postSchema), createPost);
router.put('/:id', validateToken, validateSchema(putSchema), updatePost);
router.get('/:id', validateToken, getPostById);

module.exports = router;
