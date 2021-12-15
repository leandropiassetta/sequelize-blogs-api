const postService = require('../services/postService');

const getAll = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const posts = await postService.getAll(token);

  // if (posts.message) {
  //   return res.status(401).json(posts);
  // }

  return res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const token = authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const post = await postService.getPostById(token, id);

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  // if (post.message) {
  //   return res.status(401).json(post);
  // }

  return res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { authorization } = req.headers;
  const token = authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const post = await postService.updatePost(token, id, title, content);

  // if (post.message) {
  //   return res.status(401).json({ message: post.message });
  // }

  return res.status(200).json(post);
};

const createPost = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization;
  const { title, content, categoryIds } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const validationOfCategories = await postService.validCategory(categoryIds);

  if (validationOfCategories.message) {
    return res.status(400).json(validationOfCategories);
  }

  const post = await postService.createPost(title, content, token);

  // if (post.message) {
  //   return res.status(401).json(post);
  // }

  return res.status(201).json(post);
};

module.exports = {
  getAll,
  getPostById,
  updatePost,
  createPost,
};
