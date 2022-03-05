const { addLogin } = require('../services/loginsServices');

const newLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const token = await addLogin(email, password);

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  newLogin,
};