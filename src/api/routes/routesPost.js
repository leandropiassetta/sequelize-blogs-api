const router = require('express').Router();
const { validateSchema } = require('../../middlewares/validateSchema');
const { postSchema } = require('../../schemas/postSchema');

const {
  createPost,
  getAll,
  getPostById,
} = require('../../controllers/postController');

router.get('/', getAll);
router.post('/', validateSchema(postSchema), createPost);
router.get('/:id', getPostById);

module.exports = router;
