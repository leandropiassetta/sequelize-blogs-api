const { Categories } = require('../models');

const getAll = async () => {
  const categories = await Categories.findAll();

  return categories;
};

const createCategory = async (name) => {
  const category = await Categories.create({ name });
  return category;
};

module.exports = {
  createCategory,
  getAll,
};
