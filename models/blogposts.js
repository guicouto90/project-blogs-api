const BlogPosts = (sequelize, DataTypes) => {
  const blogPosts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    categoryIds: DataTypes.JSON,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  },
  { timestamps: false });

  blogPosts.associate = (models) => {
    blogPosts.belongsTo(models.Users, { as: 'user', foreignKey: 'userId'});
  };

  return blogPosts;
};

module.exports = BlogPosts;