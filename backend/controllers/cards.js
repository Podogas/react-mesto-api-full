const Card = require('../models/card');
const {NotFoundError} = require('../middlewares/errors.js')
// get
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

// post

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((newCard) => res.send(newCard))
    .catch(next);
};
// delete
module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params._id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки нет');
      }
      return res.send(card);
    })
    .catch(next);
};

module.exports.putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки нет');
      }
      return res.send(card);
    })
    .catch(next);
};
module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки нет');
      }
      return res.send(card);
    })
    .catch(next);
};
