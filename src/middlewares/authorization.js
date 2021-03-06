const { BlogPosts } = require('../models');

const authorizationUser = async (req, res, next) => {
  const { id } = req.params;
  const tokenId = req.user.id;
  const postUser = await BlogPosts.findOne({ where: { id } });

  if (!postUser) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  if (Number(tokenId) !== postUser.userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  next();
};

module.exports = { authorizationUser };
