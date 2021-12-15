const router = require('express').Router();
const { validateSchema } = require('../../middlewares/validateSchema');
const { validateToken } = require('../../middlewares/validateToken');
const { categorySchema } = require('../../schemas/categorySchema');
const {
  createCategory,
  getAll,
} = require('../../controllers/categoryController');

router.get('/', validateToken, getAll);
router.post('/', validateToken, validateSchema(categorySchema), createCategory);

module.exports = router;
