const Joi = require('@hapi/joi');
const { Users } = require('../models');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string().required(),
});

const verifyUser = async (displayName, email, password, image) => {
  const { error } = userSchema.validate({ displayName, email, password, image });

  if (error) throw error;

  const user = await Users.findOne({ where: { email } });
  if (user) {
    const error1 = { status: 409, message: 'User already registered' };
    throw error1;
  }
};

module.exports = {
  verifyUser,
};