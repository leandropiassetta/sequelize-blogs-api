const { Categories } = require('../models');
// const { verifyToken } = require('../api/auth/jwt');

const getAll = async () => {
  // try {
  //   verifyToken(token);
  // } catch (error) {
  //   return { message: 'Expired or invalid token' };
  // }
  const categories = await Categories.findAll();

  return categories;
};

const createCategory = async (name) => {
  // try {
  //   verifyToken(token);
  // } catch (error) {
  //   return { message: 'Expired or invalid token' };
  // }
  const category = await Categories.create({ name });
  return category;
};

module.exports = {
  createCategory,
  getAll,
};
