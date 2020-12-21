import React from "react";
import PropTypes from "prop-types";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Card({ cardData, onCardClick, onCardLike, onCardDelete }) {
  const user = React.useContext(CurrentUserContext);
  const isOwn = cardData.owner === user._id;
  const isLiked = cardData.likes.some((i) => i === user._id);
  function handleClick() {
    onCardClick(cardData);
  }
  function handleLikeClick() {
    onCardLike(cardData);
  }
  function handleCardDeletion() {
    onCardDelete(cardData);
  }
  return (
    <article className="element">
      {isOwn ? (
        <button
          className="element__trash-can"
          type="button"
          onClick={handleCardDeletion}
        ></button>
      ) : null}
      <div className="element__image-wrap" onClick={handleClick}>
        <img
          className="element__image"
          src={cardData.link}
          alt={cardData.name}
        />
      </div>
      <h3 className="element__caption">{cardData.name}</h3>
      <div className="element__like-wrapper">
        <button
          className={`element__like-button ${
            isLiked ? "element__like-button_liked" : ""
          }`}
          type="button"
          onClick={handleLikeClick}
        ></button>
        <span className="element__like-counter">{cardData.likes.length}</span>
      </div>
    </article>
  );
}
Card.propTypes = {
  cardData: PropTypes.object,
  onCardClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
  onCardDelete: PropTypes.func.isRequired,
};
export default Card;
