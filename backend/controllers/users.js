const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {
  NotFoundError
} = require("../middlewares/errors.js");
// Эту строчку заменить, ключ должен храниться в файле конфига
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next)
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
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      });
    })

    .then((user) => res.send(user))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const jwt = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      console.log(jwt)
      res.headers.authorization(jwt)

    })
    .catch(next);
};


module.exports.getProfile = (req, res) => {
  res.status(200).send(req.user);
}








module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Такого пользователя нет" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
      } else if (err.name === "CastError") {
        return res
          .status(404)
          .send({ message: "Такого ресурса не существует" });
      }
      return res.status(500).send({ message: "Ошибка сервера" });
    });
};
module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Такого пользователя нет" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
      } else if (err.name === "CastError") {
        return res
          .status(404)
          .send({ message: "Такого ресурса не существует" });
      }
      return res.status(500).send({ message: "Ошибка сервера" });
    });
};
