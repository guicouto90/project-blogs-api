const express = require('express');
const { newPost } = require('../controllers/postsController');
const { validateToken } = require('../middlewares/auth');

const postsRouter = express.Router();

postsRouter.post('/', validateToken, newPost);

module.exports = postsRouter;