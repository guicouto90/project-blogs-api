const { 
  addPost, 
  getAllPosts,
  getPostById,
  editPost,
  erasePost,
  findByQuery, 
} = require('../services/postsService');

const newPost = async (req, res, next) => {
  try {    
    const post = await addPost(req.body, req.email);
    
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
    const result = await getPostById(id);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const updatePostById = async (req, res, next) => {
  try {
    const result = await editPost(req.body, req.params.id, req.email);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const deletePostById = async (req, res, next) => {
  try {
    await erasePost(req.params.id, req.email);

    return res.status(204).json({});
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const listByQuery = async (req, res, next) => {
  try {
    const { q } = req.query;
    const result = await findByQuery(q);

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
  updatePostById,
  deletePostById,
  listByQuery,
};