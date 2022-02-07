const Joi = require('@hapi/joi');

const postsSchema = Joi.object({
  title: Joi.string().min(1).required().not()
.empty(),
  categoryIds: Joi.array().required().not().empty(),
  content: Joi.string().min(1).required().not()
.empty(),
});

const validatePost = (body) => {
  const { title, categoryIds, content } = body;
  const { error } = postsSchema.validate({ title, categoryIds, content });

  if (error) throw error;
};

module.exports = {
  validatePost,
};