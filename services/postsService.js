const Joi = require('@hapi/joi');
const { Users, BlogPosts, Categories, PostCategories } = require('../models');

const postsSchema = Joi.object({
  title: Joi.string().min(1).required(),
  categoryIds: Joi.array().required(),
  content: Joi.string().min(1).required(),
});

const validatePost = (body) => {
  const { title, categoryIds, content } = body;
  const { error } = postsSchema.validate({ title, categoryIds, content });

  if (error) throw error;
};

const findUser = async (email) => {
  const { id } = await Users.findOne({ where: { email } });
  if (!id) {
    const error = { status: 400, message: 'UserId not found' };
    throw error;
  }

  return id;
};

const addPost = async (title, content, userId) => {
  const { id } = await BlogPosts.create({
    title, 
    content, 
    userId, 
    published: new Date().toISOString(),
    updated: new Date().toISOString(),
  });

  return id;
};

const addPostCategories = async (blogpostsId, categoryIds) => {
  await Promise.all(categoryIds.map(async (categoryId) => {
    await PostCategories.create({ blogpostsId, categoryId });
   }));
};

const getAllPosts = async () => {
  const result = await BlogPosts.findAll(
    { include: [ 
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  },
);

  return result;
};

module.exports = {
  validatePost,
  findUser,
  addPost,
  addPostCategories,
  getAllPosts,
};