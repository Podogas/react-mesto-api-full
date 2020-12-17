import React from "react";
import PropTypes from "prop-types";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
function ConfirmDeletionPopup({ isOpen, onClose, onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
    onClose();
  }
  return (
    <PopupWithForm
      name="confirm-deletion"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <button type="submit" className="popup__submit-btn">
        Да
      </button>
    </PopupWithForm>
  );
}
ConfirmDeletionPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
export default ConfirmDeletionPopup;
