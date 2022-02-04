const express = require('express');
const { newUser } = require('../controllers/usersController');

const usersRouter = express.Router();

usersRouter.post('/', newUser);

module.exports = usersRouter;