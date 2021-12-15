const router = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
} = require('../../controllers/userControllers');

const { validateSchema } = require('../../middlewares/validateSchema');
const { validateToken } = require('../../middlewares/validateToken');
const { usersSchema } = require('../../schemas/userSchema');

router.get('/', validateToken, getUsers);
router.get('/:id', validateToken, getUserById);
router.post('/', validateSchema(usersSchema), createUser);

module.exports = router;
