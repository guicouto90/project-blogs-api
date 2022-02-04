const express = require('express');
const { newUser, listAllUsers, listUserById } = require('../controllers/usersController');
const { validateToken } = require('../middlewares/auth');

const usersRouter = express.Router();

usersRouter.post('/', newUser);

usersRouter.get('/', validateToken, listAllUsers);

usersRouter.get('/:id', validateToken, listUserById);

module.exports = usersRouter;