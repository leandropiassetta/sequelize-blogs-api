const {
  BlogPosts,
  Categories,
  Users /* PostCategory */,
} = require('../models');

const createPost = async (dataPost, userId) => {
  console.log(userId);
  const formatPost = { ...dataPost, userId };
  const post = await BlogPosts.create(formatPost);

  return post;
};

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

const validCategory = async ({ categoryIds }) => {
  const categories = await Categories.findAll();
  const arrayOfCategories = categories.map((category) => category.id);
  const verifyIds = categoryIds.every((ids) => arrayOfCategories.includes(ids));

  if (verifyIds) return verifyIds;

  return { message: '"categoryIds" not found' };
};

const updatePost = async (id, { title, content }) => {
  try {
    await BlogPosts.update({ title, content }, { where: { id } });
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

// const checkForPost = async (id) => {
//   console.log('aqui');
//   try {
//     console.log('chegando');
//     await BlogPosts.findOne({ where: { id } });
//   } catch (error) {
//     return { message: 'Post does not exist' };
//   }
// };

const deletePost = async (id) => {
  // await checkForPost(id);

  await BlogPosts.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getPostById,
  updatePost,
  validCategory,
  createPost,
  deletePost,
};
