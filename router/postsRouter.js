const express = require('express');
const { 
  newPost, 
  listAllPosts, 
  listPostById, 
  updatePostById,
  deletePostById, 
} = require('../controllers/postsController');
const { validateToken } = require('../middlewares/auth');

const postsRouter = express.Router();

postsRouter.post('/', validateToken, newPost);

postsRouter.get('/', validateToken, listAllPosts);

postsRouter.get('/:id', validateToken, listPostById);

postsRouter.put('/:id', validateToken, updatePostById);

postsRouter.delete('/:id', validateToken, deletePostById);

module.exports = postsRouter;