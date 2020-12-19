const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../middlewares/errors.js");
// Эту строчку заменить, ключ должен храниться в файле конфига
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const  authorization  = req.headers.authorization;
  console.log(authorization)
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Необходима авторизация");
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  try {

    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', function(err, decoded) {
 if(err){
     console.log(err)
 }else{
     console.log(decoded)
 }})

  } catch (err) {
    throw new UnauthorizedError("Необходима авторизация");
  }
  req.user = payload;
  next();
};