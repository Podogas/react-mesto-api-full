import React, { useState } from "react";
import PropTypes from "prop-types";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const user = React.useContext(CurrentUserContext);

  const [name, setName] = useState("");
  React.useEffect(() => {
    setName(user.name);
    setDescription(user.about);
  }, [user.name, user.about]);
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const profileNameRef = React.useRef();
  const profileDesctiptionRef = React.useRef();
  const [disabled, setDisabled] = React.useState("");
  const [classNames, setClassNames] = React.useState(
    "popup__submit-btn popup__submit-btn_edit-avatar"
  );
  function handleValidation() {
    setErrorMessage({
      nameErr: profileNameRef.current.validationMessage,
      aboutErr: profileDesctiptionRef.current.validationMessage,
    });
    if (
      profileNameRef.current.validity.valid &&
      profileDesctiptionRef.current.validity.valid
    ) {
      setDisabled("");
      setClassNames("popup__submit-btn popup__submit-btn_edit-avatar");
    } else {
      setDisabled("disabled");
      setClassNames(
        "popup__submit-btn popup__submit-btn_edit-avatar popup__submit-btn_blocked"
      );
    }
  }

  function handleNameChange(e) {
    setName(e.target.value);
    handleValidation();
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
    handleValidation();
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={profileNameRef}
        type="text"
        name="name"
        id="profileNameInput"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        className="popup__input-item popup__input-item_edit-profile"
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="popup__input-error-message" id="profileNameInput-err">
        {errorMessage.nameErr}
      </span>
      <input
        ref={profileDesctiptionRef}
        type="text"
        name="about"
        id="profileJobInput"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        className="popup__input-item popup__input-item_edit-profile"
        value={description || ""}
        onChange={handleDescriptionChange}
      />
      <span className="popup__input-error-message" id="profileJobInput-err">
        {errorMessage.aboutErr}
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
  onUpdateUser: PropTypes.func.isRequired,
};
export default EditProfilePopup;
