const { verifyUser } = require('../services/usersService');
const { Users } = require('../models');
const { generateToken } = require('../middlewares/auth');

const newUser = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    await verifyUser(displayName, email, password, image);

    await Users.create({ displayName, email, password, image });

    const token = generateToken(email);

    return res.status(201).json({ token });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const listAllUsers = async (req, res, next) => {
  try {
    const result = await Users.findAll();

    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  newUser,
  listAllUsers,
};