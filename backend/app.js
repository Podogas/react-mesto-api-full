/*  */
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const usersRoutes = require('./routes/users.js');
const cardsRoutes = require('./routes/cards.js');
const authRoutes = require('./routes/auth.js');
const auth = require('./middlewares/auth.js');
const NotFoundError = require('./errors/Not-found.js');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
/* https://podogas.students.nomoreparties.space */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
app.use('*', cors());
app.use(helmet());
app.use(cookieParser());
app.use(requestLogger);
app.use(bodyParser.json());

app.use('/', authRoutes);
// ниже вызываем роуты защищенные авторизацией
app.use(auth);
app.use('/', usersRoutes);
app.use('/', cardsRoutes);

app.all('/*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});
app.use(errorLogger);
app.listen(PORT, () => {});
