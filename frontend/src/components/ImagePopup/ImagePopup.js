import React from "react";
import PropTypes from "prop-types";

function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup__photo-browsing ${card ? "popup_opened" : ""}`}
    >
      <div className="popup__window popup__window_photo-browsing">
        <button
          className="popup__close-btn popup__close-btn_photo-browsing"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup__image-photo-browsing"
          alt={card.name}
          src={card.link}
        />
        <span className="popup__caption-photo-browsing">{card.name}</span>
      </div>
    </section>
  );
}
ImagePopup.propTypes = {
  card: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onClose: PropTypes.func.isRequired,
};
export default ImagePopup;
