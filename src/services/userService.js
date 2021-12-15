const { Users } = require('../models');
const { createToken } = require('../api/auth/jwt');

const createUser = async (displayName, email, password, image) => {
  const user = await Users.findOne({
    where: { email },
  });

  if (user) {
    return { message: 'User already registered' };
  }

  const { id } = await Users.create({ displayName, email, password, image });
  const token = createToken({ id, email });

  return { token };
};

const getUsers = async () => {
  const users = await Users.findAll({
    attributes: {
      exclude: ['password'],
    },
  });

  return users;
};

const getUserById = async (id) => {
  const user = await Users.findByPk(id);
  return user;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
};
