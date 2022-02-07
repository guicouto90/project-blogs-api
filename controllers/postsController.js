const { Users, BlogPosts } = require('../models');
const { categoriesExist } = require('../services/categoriesService');
const { validatePost } = require('../services/postsService');

const newPost = async (req, res, next) => {
  try {
    validatePost(req.body);
    const { title, content, categoryIds } = req.body;
    await categoriesExist(categoryIds);
    const { email } = req;
    const user = await Users.findOne({ where: { email } });
    const userId = user.id;
    const { id } = await BlogPosts.create({ title, content, userId, categoryIds });
    const post = { id, userId, title, content };
    return res.status(201).json(post);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  newPost,
};