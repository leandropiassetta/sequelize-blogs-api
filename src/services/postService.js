const { BlogPosts, Categories, Users } = require('../models');
const { verifyToken } = require('../api/auth/jwt');

const getAll = async () => {
  const posts = await BlogPosts.findAll({
    include: [
      { model: Categories, as: 'categories', through: { attributes: [] } },
      { model: Users, as: 'user' },
    ],
  });
  return posts;
};

const getPostById = async (id) => {
  const post = await BlogPosts.findByPk(id, {
    include: [
      { model: Categories, as: 'categories', through: { attributes: [] } },
      { model: Users, as: 'user' },
    ],
  });
  return post;
};

const verifyUser = async (id, userId) => {
  const postUser = await BlogPosts.findOne({ where: { id } });

  if (userId !== postUser.userId) {
    throw new Error('Unauthorized user');
  }
};

const updatePost = async (token, id, title, content) => {
  let userId = '';

  const { id: tokenId } = verifyToken(token);
  userId = tokenId;

  try {
    await verifyUser(id, userId);
  } catch (error) {
    return error;
  }

  await BlogPosts.update({ title, content }, { where: { id } });

  return BlogPosts.findByPk(id, {
    include: [
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });
};

const validCategory = async (categoryIds) => {
  const categories = await Categories.findAll();
  const arrayOfCategories = categories.map((category) => category.id);
  const verifyIds = categoryIds.every((ids) => arrayOfCategories.includes(ids));

  if (verifyIds) return verifyIds;

  return { message: '"categoryIds" not found' };
};

const createPost = async (title, content, token) => {
  let userId = '';

  const { id } = verifyToken(token);
  userId = id;

  const post = await BlogPosts.create({ title, content, userId });
  return post;
};

module.exports = {
  getAll,
  getPostById,
  updatePost,
  validCategory,
  createPost,
};
