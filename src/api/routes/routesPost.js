const router = require('express').Router();
const { validateSchema } = require('../../middlewares/validateSchema');
const { validateToken } = require('../../middlewares/validateToken');
const { verifyExistCategory } = require('../../middlewares/validatePut');
const { authorizationUser } = require('../../middlewares/authorization');

const { postSchema } = require('../../schemas/postSchema');

const {
  createPost,
  getAll,
  getPostById,
  updatePost,
  deletePost,
} = require('../../controllers/postController');

const middlewaresRoutesPut = [
  validateToken,
  verifyExistCategory,
  authorizationUser,
  deletePost,
];

const middlewaresRoutesDelete = [
  validateToken,
  authorizationUser,
];

router.get('/', validateToken, getAll);
router.get('/:id', validateToken, getPostById);
router.post('/', validateToken, validateSchema(postSchema), createPost);
router.put('/:id', middlewaresRoutesPut, updatePost);
router.delete('/:id', middlewaresRoutesDelete, deletePost);

module.exports = router;
