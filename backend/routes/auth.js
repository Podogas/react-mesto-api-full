const authRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const linkRegExp = /^https?:\/\/(www\.)?[-a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]*/;

const {
  login,
  createUser,
} = require('../controllers/users');

authRoutes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

authRoutes.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    avatar: Joi.string().pattern(linkRegExp),
  }),
}), createUser);

module.exports = authRoutes;
