const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET || 'embuscadoentendimento';

const createToken = (user) => {
  const payload = { ...user };

  const jwtConfig = {
    expiresIn: '5h',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, secret, jwtConfig);

  return token;
};

const verifyToken = (token) => {
  const payload = jwt.verify(token, secret);

  return payload;
};

module.exports = {
  createToken,
  verifyToken,
};

/* outra forma de configurar o jwt */

// const createJWT = (id, userEmail) => {
//   const jwtConfig = {
//     expiresIn: '4d',
//     algorithm: 'HS256',
//   };

// const jsonwebtoken = jwt.sign({ payload: { id, userEmail } }, secret, jwtConfig);
// return jsonwebtoken;
// };

// const verifyJWT = (token) => {
//   const payload = jwt.verify(token, secret);
//   return payload;
// };
