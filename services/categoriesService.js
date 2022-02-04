const Joi = require('@hapi/joi');

const categoriesSchema = Joi.object({
  name: Joi.string().required(),
});

const validateCategories = (name) => {
  const { error } = categoriesSchema.validate({ name });
  if (error) throw error;
};

module.exports = {
  validateCategories,
};