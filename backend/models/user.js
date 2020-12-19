const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { UnauthorizedError } = require("../middlewares/errors.js");

const linkRegExp = /^https?:\/\/(www\.)?[-a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]*/g;
const validateEmail = (email) => validator.isEmail(email);
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    default: "Жак-Ив Кусто",
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: false,
    default: "Исследователь",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: false,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: {
      validator(v) {
        return linkRegExp.test(v);
      },
    },
  },
  email: {
    type: String,
    required: true,
    validate: [validateEmail, "Указан некорректный Email"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  console.log(email, password)
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError("Неправильные почта или пароль")
        )
        .catch();
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError("Неправильные почта или пароль")
          ).catch()
        }
        return user
        ;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
