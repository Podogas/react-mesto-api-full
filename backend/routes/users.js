const users = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const linkRegExp = /^https?:\/\/(www\.)?[-a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]*/;

const {
  getUsers,
  getUserById,
  getProfile,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

users.get('/users', getUsers);

users.get('/users/me', getProfile);
users.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }).unknown(true),
}), updateProfile);
users.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(linkRegExp),
  }).unknown(true),
}), updateAvatar);
users.get('/users/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
}), getUserById);
module.exports = users;
