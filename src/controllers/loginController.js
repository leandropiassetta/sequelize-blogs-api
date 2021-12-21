const userService = require('../services/loginService');

const loginUser = async (req, res) => {
  const { email } = req.body;

  const token = await userService.loginUser(email);

  if (!token.message) {
    return res.status(200).json({ token });
  }

  return res.status(400).json({ message: token.message });
};

module.exports = { loginUser };
