const express = require('express');
const { newCategorie } = require('../controllers/categoriesController');
const { validateToken } = require('../middlewares/auth');

const categoriesRouter = express.Router();

categoriesRouter.post('/', validateToken, newCategorie);

module.exports = categoriesRouter;