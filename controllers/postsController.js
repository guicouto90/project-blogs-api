const { categoriesExist } = require('../services/categoriesService');
const { 
  validatePost, 
  findUser, 
  addPost, 
  addPostCategories, 
  getAllPosts,
  getPostById,
  findPostById, 
} = require('../services/postsService');

const newPost = async (req, res, next) => {
  try {
    validatePost(req.body);
    const { title, content, categoryIds } = req.body;
    await categoriesExist(categoryIds);
    const { email } = req;
    const userId = await findUser(email);
    const id = await addPost(title, content, userId);
    await addPostCategories(id, categoryIds);
    
    const post = { id, userId, title, content };
    return res.status(201).json(post);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const listAllPosts = async (req, res, next) => {
  try {
    const result = await getAllPosts();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const listPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    await findPostById(id);
    const result = await getPostById(id);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  newPost,
  listAllPosts,
  listPostById,
};