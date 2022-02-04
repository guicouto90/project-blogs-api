const Joi = require('@hapi/joi');
const { Users } = require('../models');

const loginSchema = Joi.object({
  email: Joi.string().email().required().not()
.empty(),
  password: Joi.string().length(6).required().not()
.empty(),
});

const validateLogin = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });
  
  if (error) throw error;

  const valid = await Users.findOne({ where: { email } });

  console.log(valid);
  if (!valid || valid.password !== password) {
    console.log('POR QUE?');
    const error1 = { status: 400, message: 'Invalid fields' };
    throw error1;
  }
};

module.exports = {
  validateLogin,
};