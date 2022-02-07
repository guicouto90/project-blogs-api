const Joi = require('@hapi/joi');
const { Categories } = require('../models');

const categoriesSchema = Joi.object({
  name: Joi.string().required(),
});

const validateCategories = (name) => {
  const { error } = categoriesSchema.validate({ name });
  if (error) throw error;
};

const categoriesExist = async (categoryIds) => {
  await Promise.all(categoryIds.map(async (category) => {
    const categoryId = await Categories.findByPk(category);
    if (!categoryId) {
      const error1 = { status: 400, message: '"categoryIds" not found' };
      throw error1;
    }
  }));
};

module.exports = {
  validateCategories,
  categoriesExist,
};