const jwt = require('jsonwebtoken');

const secret = '@p!-B0g&Pr0j3ct';

const generateToken = (email) => {
  const jwtConfig = {
    expiresIn: 3600,
    algorithm: 'HS256',
  };

  const token = jwt.sign({ email }, secret, jwtConfig);

  return token;
};

const validateToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { email } = jwt.verify(authorization, secret);
    req.email = email;

    next();
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  generateToken,
  validateToken,
};