const Joi = require('@hapi/joi');
const { Users, BlogPosts, Categories, PostsCategories } = require('../models');
const { categoriesExist } = require('./categoriesService');

const postsSchema = Joi.object({
  title: Joi.string().min(1).required(),
  categoryIds: Joi.array().required(),
  content: Joi.string().min(1).required(),
});

const putSchema = Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
});

const validatePost = (body) => {
  const { title, categoryIds, content } = body;
  const { error } = postsSchema.validate({ title, categoryIds, content });

  if (error) throw error;
};

const validatePut = (body) => {
  const { title, categoryIds, content } = body;
  if (categoryIds) {
    const error1 = { status: 400, message: 'Categories cannot be edited' };
    throw error1;
  }
  const { error } = putSchema.validate({ title, content });

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

const addPostCategories = async (postId, categoryIds) => {
  await Promise.all(categoryIds.map(async (categoryId) => {
    await PostsCategories.create({ postId, categoryId });
   }));
};

const addPost = async (body, email) => {
  const { title, content, categoryIds } = body;
  validatePost(body);
  await categoriesExist(categoryIds);
  const userId = await findUser(email);
  const { id } = await BlogPosts.create({
    title, 
    content, 
    userId, 
    published: new Date().toISOString(),
    updated: new Date().toISOString(),
  });
  await addPostCategories(id, categoryIds);
  const post = { id, userId, title, content };

  return post;
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

const findPostById = async (id) => {
  const result = await BlogPosts.findByPk(id);
  if (!result) {
    const error = { status: 404, message: 'Post does not exist' };
    throw error;
  }

  return result;
};

const getPostById = async (id) => {
  await findPostById(id);
  const result = await BlogPosts.findByPk(id,
    { include: [ 
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ] });

  return result;
};

const validateUser = async (id, email) => {
  const { userId } = await findPostById(id);
  const user = await Users.findOne({ where: { email } });
  if (user.id !== userId) {
    const error = { status: 401, message: 'Unauthorized user' };
    throw error;
  }
};

// REF: https://stackoverflow.com/questions/69836342/how-to-use-both-include-and-attributes-in-findbypk-statement-in-sequelize
const editPost = async (body, id, email) => {
  const { title, content } = body;
  validatePut(body);
  await validateUser(id, email);
  await BlogPosts.update(
    { title, 
      content,
      updated: new Date().toISOString(),
    }, { where: { id } },
);

  const result = await BlogPosts.findByPk(id,
    { 
      include: { model: Categories, as: 'categories', through: { attributes: [] } },
      attributes: { exclude: ['id', 'published', 'updated'] },
    });
  return result;
};

const erasePost = async (id, email) => {
  await validateUser(id, email);
  await BlogPosts.destroy({ where: { id } });
};

const findByQuery = async (q) => {
  const posts = await getAllPosts();
  const result = posts.filter((post) => post.title.includes(q) || post.content.includes(q));

  return result || posts;
};

module.exports = {
  validatePost,
  findUser,
  addPost,
  addPostCategories,
  getAllPosts,
  getPostById,
  findPostById,
  validatePut,
  validateUser,
  editPost,
  erasePost,
  findByQuery,
};