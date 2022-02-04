const express = require('express');
const { newUser, listAllUsers } = require('../controllers/usersController');
const { validateToken } = require('../middlewares/auth');

const usersRouter = express.Router();

usersRouter.post('/', newUser);

usersRouter.get('/', validateToken, listAllUsers);

module.exports = usersRouter;