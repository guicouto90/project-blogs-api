const express = require('express');
const { 
  newPost, 
  listAllPosts, 
  listPostById, 
  updatePostById, 
} = require('../controllers/postsController');
const { validateToken } = require('../middlewares/auth');

const postsRouter = express.Router();

postsRouter.post('/', validateToken, newPost);

postsRouter.get('/', validateToken, listAllPosts);

postsRouter.get('/:id', validateToken, listPostById);

postsRouter.put('/:id', validateToken, updatePostById);

module.exports = postsRouter;