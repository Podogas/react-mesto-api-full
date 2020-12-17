import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";

function InfoTooltip({ isOpen, onClose, content }) {
  return (
    <PopupWithForm
      name="signStatus"
      isOpen={isOpen}
      onClose={onClose}
      noForm={true}
      noHeading={true}
      children
    >
      <img src={content.imageSrc} alt={content.alt} className="popup__signStatus-image" />
      <p className="popup__signStatus-caption">{content.text}</p>
    </PopupWithForm>
  );
}

export default InfoTooltip;
