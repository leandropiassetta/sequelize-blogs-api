const { Users } = require('../models');
const { createToken } = require('../api/auth/jwt');

const loginUser = async (email) => {
  const user = await Users.findOne({
    where: { email },
  });

  if (!user) {
    return { message: 'Invalid fields' };
  }

  const token = createToken({ id: user.id, email });

  return token;
};

module.exports = { loginUser };
