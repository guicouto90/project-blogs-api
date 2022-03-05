const Joi = require('@hapi/joi');
const { Users } = require('../models');
const { generateToken } = require('../middlewares/auth');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string().required(),
});

const verifyUser = (displayName, email, password, image) => {
  const { error } = userSchema.validate({ displayName, email, password, image });

  if (error) throw error;
};

const findUserByEmail = async (email) => {
  const user = await Users.findOne({ where: { email } });
  if (user) {
    const error1 = { status: 409, message: 'User already registered' };
    throw error1;
  }
};

const addUser = async (displayName, email, password, image) => {
  verifyUser(displayName, email, password, image);
  await findUserByEmail(email);
  await Users.create({ displayName, email, password, image });

  const token = generateToken(email);

  return token;
};

const findAllUsers = async () => {
  const results = Users.findAll();

  return results;
};

const findUserById = async (id) => {
  const user = await Users.findByPk(id);
  if (!user) {
    const error = { status: 404, message: 'User does not exist' };
    throw error;
  }
  return user;
};

const eraseUser = async (email) => {
  await Users.destroy({ where: { email } });
};

module.exports = {
  verifyUser,
  addUser,
  findUserByEmail,
  findAllUsers,
  findUserById,
  eraseUser,
};