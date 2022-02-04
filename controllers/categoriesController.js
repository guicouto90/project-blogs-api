const { Categories } = require('../models');
const { validateCategories } = require('../services/categoriesService');

const newCategorie = async (req, res, next) => {
  try {
    const { name } = req.body;
    validateCategories(name);
    const categorie = await Categories.create({ name });

    return res.status(201).json(categorie);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  newCategorie,
};