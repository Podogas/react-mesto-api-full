const mongoose = require('mongoose');
const {
  UnauthorizedError,
  NotFoundError
} = require("../middlewares/errors.js");

const linkRegExp = /^https?:\/\/(www\.)?[-a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]*/;
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return linkRegExp.test(v);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes:
  [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

cardSchema.static.ownerCardDeletion = function(cardId, ownerId) {
  return ( this.findById(cardId)
    .then((card) => {
      if(!card) {
        return Promise.reject(new NotFoundError("Карточка не найдена"));
      }
      if(card.owner._id === userId) {
        return card.remove()
      }
      return Promise.reject(new UnauthorizedError("Нет прав для удаления"));
    })
    )

}

module.exports = mongoose.model('card', cardSchema);
