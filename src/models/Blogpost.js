module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    'BlogPosts',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: DataTypes.INTEGER, primaryKey: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    }, { timestamps: false },
  );

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return BlogPost;
};
