const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi)
const linkRegExp = /^https?:\/\/(www\.)?[-a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]*/;

const {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(linkRegExp),
  }).unknown(true),
}), createCard);
cardsRouter.delete('/cards/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.objectId(),
  }),
}), deleteCard);
cardsRouter.put('/cards/:_id/likes', celebrate({
  params: Joi.object().keys({
    _id: Joi.objectId(),
  }),
}), putLike);
cardsRouter.delete('/cards/:_id/likes', celebrate({
  params: Joi.object().keys({
    _id: Joi.objectId(),
  }),
}), deleteLike);
module.exports = cardsRouter;
