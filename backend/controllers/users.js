const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFoundError, ConflictError } = require('../middlewares/errors.js');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя нет');
      }
      return res.send(user);
    })
    .catch(next);
};
module.exports.createUser = (req, res, next) => {
  const { email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
      }).catch((err) => {
        console.log(err);
        res.send(err);
        return Promise.reject(
          new ConflictError('Такой пользователь уже зарегистрирован'),
        );
      });
    })

    .then((user) => {
      if (!user) {

      }
      res.send(user);
    })
    .catch(next);

  /*= > {
      if (err.code === 11000) {
        const error = new ConflictError(
          'Пользователь с данным e-mail уже зарегистрирован',
        );
        next(error);
      }
      next(err);
    }); */
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ data: { ...user.toJSON(), token } });
    })
    .catch(next);
};

module.exports.getProfile = (req, res) => {
  res.status(200).send(req.user);
};

module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Такого пользователя нет' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (err.name === 'CastError') {
        return res
          .status(404)
          .send({ message: 'Такого ресурса не существует' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};
module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Такого пользователя нет' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (err.name === 'CastError') {
        return res
          .status(404)
          .send({ message: 'Такого ресурса не существует' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};
