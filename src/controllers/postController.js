const postService = require('../services/postService');

const createPost = async (req, res) => {
  const userId = req.user.id;
  const dataPost = req.body;

  const validationOfCategories = await postService.validCategory(dataPost);

  if (validationOfCategories.message) {
    return res.status(400).json(validationOfCategories);
  }

  const post = await postService.createPost(dataPost, userId);

  return res.status(201).json(post);
};

const getAll = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const posts = await postService.getAll(token);

  return res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await postService.getPostById(id);

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  return res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const dataPost = req.body;

  const post = await postService.updatePost(id, dataPost);

  if (post.message) {
    return res.status(400).json({ messsage: post.message });
  }

  return res.status(200).json(post);
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  await postService.deletePost(id);

  return res.status(204).end();
};

module.exports = {
  getAll,
  getPostById,
  updatePost,
  createPost,
  deletePost,
};
