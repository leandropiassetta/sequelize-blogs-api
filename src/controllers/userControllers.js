const userServices = require('../services/userService');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const newUser = await userServices.createUser(
    displayName,
    email,
    password,
    image
  );
  console.log(newUser);
  if (!newUser.message) {
    return res.status(201).json(newUser);
  }

  return res.status(409).json({ message: newUser.message });
};

const getUsers = async (_req, res) => {
  const users = await userServices.getUsers();

  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const token = authorization;

  const user = await userServices.getUserById(id, token);

  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  return res.status(200).json(user);
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
};
