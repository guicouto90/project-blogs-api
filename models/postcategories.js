const PostCategories = (sequelize, _DataTypes) => {
  const postCategories = sequelize.define('PostCategories', {}, { timestamps: false });

  postCategories.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories, {
      as: 'categories',
      through: postCategories,
      foreignKey: 'blogpostsId',
      otherKey: 'categoryId',
    });

    models.Categories.belongsToMany(models.BlogPosts, {
      as: 'blogposts',
      through: postCategories,
      foreignKey: 'categoryId',
      otherKey: 'blogpostsId',
    });
  };

  return postCategories;
};

module.exports = PostCategories;