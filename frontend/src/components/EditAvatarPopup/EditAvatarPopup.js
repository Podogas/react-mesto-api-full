import React from "react";
import PropTypes from "prop-types";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
function EditProfilePopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [disabled, setDisabled] = React.useState("disabled");
  const [classNames, setClassNames] = React.useState(
    "popup__submit-btn popup__submit-btn_edit-avatar popup__submit-btn_blocked"
  );
  function handleValidation() {
    setErrorMessage({
      urlErr: avatarRef.current.validationMessage,
    });
    if (avatarRef.current.validity.valid) {
      setDisabled("");
      setClassNames("popup__submit-btn popup__submit-btn_edit-avatar");
    } else {
      setDisabled("disabled");
      setClassNames(
        "popup__submit-btn popup__submit-btn_edit-avatar popup__submit-btn_blocked"
      );
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        type="url"
        name="avatarUrl"
        id="avatarUrlInput"
        placeholder="Ссылка на картинку"
        required
        className="popup__input-item popup__input-item_edit-avatar"
        onChange={handleValidation}
      />
      <span className="popup__input-error-message" id="avatarUrlInput-err">
        {errorMessage.urlErr}
      </span>
      <button type="submit" disabled={disabled} className={classNames}>
        Сохранить
      </button>
    </PopupWithForm>
  );
}
EditProfilePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateAvatar: PropTypes.func.isRequired,
};
export default EditProfilePopup;
