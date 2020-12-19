const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../middlewares/errors.js");
// Эту строчку заменить, ключ должен храниться в файле конфига
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const  authorization  = req.headers.authorization;


  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Необходима авторизация");
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');

  } catch (err) {
    throw new UnauthorizedError("Необходима авторизация");
  }
  req.user = payload;
  next();
};