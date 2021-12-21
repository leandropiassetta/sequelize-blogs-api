const {
  BlogPosts,
  Categories,
  Users /* PostCategory */,
} = require('../models');

const getAll = async () => {
  const posts = await BlogPosts.findAll({
    include: [
      { model: Users, as: 'user' },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

const getPostById = async (id) => {
  const post = await BlogPosts.findByPk(id, {
    include: [
      { model: Users, as: 'user' },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });
  return post;
};

const verifyCategoryAndUpdate = async (id, title, content, categories) => {
  if (!categories) {
    await BlogPosts.update({ title, content }, { where: { id: Number(id) } });
  } else {
    throw new Error('Categories cannot be edited');
  }
};

const updatePost = async (id, { title, content, categories }) => {
  try {
    await verifyCategoryAndUpdate(id, title, content, categories);
    return BlogPosts.findOne({
      include: [
        {
          model: Categories,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
      where: { id },
    });
  } catch (error) {
    return error;
  }
};

const validCategory = async ({ categoryIds }) => {
  const categories = await Categories.findAll();
  const arrayOfCategories = categories.map((category) => category.id);
  const verifyIds = categoryIds.every((ids) => arrayOfCategories.includes(ids));

  if (verifyIds) return verifyIds;

  return { message: '"categoryIds" not found' };
};

const createPost = async (dataPost, userId) => {
  const formatPost = { ...dataPost, userId };
  const post = await BlogPosts.create(formatPost);

  return post;
};

module.exports = {
  getAll,
  getPostById,
  updatePost,
  validCategory,
  createPost,
};
