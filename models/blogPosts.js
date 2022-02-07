const BlogPosts = (sequelize, DataTypes) => {
  const blogPosts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    categoryIds: DataTypes.JSON,
  },
  { timestamps: false });

  return blogPosts;
};

module.exports = BlogPosts;