/*  */
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const usersRoutes = require("./routes/users.js");
const cardsRoutes = require("./routes/cards.js");
const authRoutes = require("./routes/auth.js");
const auth = require("./middlewares/auth.js");
const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError
} = require("./middlewares/errors.js");
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT = 3001 } = process.env;
const cors = require('cors');
const app = express();
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use('*', cors())
app.use(cookieParser());
app.use(requestLogger);
app.use(bodyParser.json());

app.use("/", authRoutes);
// ниже вызываем роуты защищенные авторизацией
app.use(auth);
app.use("/", usersRoutes);
app.use("/", cardsRoutes);
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
});

app.listen(PORT, () => {});
console.log(`app runing on ${PORT}`)