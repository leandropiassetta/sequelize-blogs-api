const postsCategoriesModel = (sequelize, _DataTypes) => {
  const postCategory = sequelize.define('PostCategories', 
  {}, 
  { timestamps: false });
  
  postCategory.associate = (models) => {
    models.Categories.belongsToMany(models.BlogPosts, {
      through: 'PostsCategories',
      as: 'posts',
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPosts.belongsToMany(models.Categories, {
      through: 'PostsCategories',
      as: 'categories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return postCategory;
};

module.exports = postsCategoriesModel;