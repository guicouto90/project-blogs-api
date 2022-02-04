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

module.exports = {
  generateToken,
};