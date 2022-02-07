const express = require('express');
const { newPost, listAllPosts } = require('../controllers/postsController');
const { validateToken } = require('../middlewares/auth');

const postsRouter = express.Router();

postsRouter.post('/', validateToken, newPost);

postsRouter.get('/', validateToken, listAllPosts);

module.exports = postsRouter;