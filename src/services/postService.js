const { BlogPosts, Categories, Users } = require('../models');
const { verifyToken } = require('../api/auth/jwt');

const getAll = async (token) => {
  try {
    verifyToken(token);
    const posts = await BlogPosts.findAll({
      include: [
        { model: Categories, as: 'categories', through: { attributes: [] } },
        { model: Users, as: 'user' },
      ],
    });
    return posts;
  } catch (error) {
    return { message: 'Expired or invalid token' };
  }
};

const getPostById = async (token, id) => {
  try {
    verifyToken(token);
    const post = await BlogPosts.findByPk(id, {
      include: [
        { model: Categories, as: 'categories', through: { attributes: [] } },
        { model: Users, as: 'user' },
      ],
    });
    return post;
  } catch (error) {
    return { message: 'Expired or invalid token' };
  }
};

const validCategory = async (categoryIds) => {
  const categories = await Categories.findAll();
  const arrayOfCategories = categories.map((category) => category.id);
  const verifyIds = categoryIds.every((ids) => arrayOfCategories.includes(ids));

  if (verifyIds) return verifyIds;

  return { message: '"categoryIds" not found' };
};

const createPost = async (title, content, token) => {
  try {
    verifyToken(token);
    const post = await BlogPosts.create({ title, content, userId: 1 });
    return post;
  } catch (error) {
    return { message: 'Expired or invalid token' };
  }
};

module.exports = {
  getAll,
  getPostById,
  createPost,
  validCategory,
};
