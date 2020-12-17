import React from "react";
import PropTypes from "prop-types";

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  noForm,
  noHeading,
  children,
}) {
  return (
    <section className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__window">
        <button
          className={`popup__close-btn popup__close-btn_${name}`}
          type="button"
          onClick={onClose}
        ></button>
        {noHeading ? (
          ""
        ) : (
          <h2 className={`popup__heading popup__heading_${name}`}>{title}</h2>
        )}

        {noForm ? (
          children
        ) : (
          <form
            noValidate
            onSubmit={onSubmit}
            className={`popup__input-container popup__input-container_${name}`}
            name={name}
            method="post"
            action=""
          >
            {children}
          </form>
        )}
      </div>
    </section>
  );
}

PopupWithForm.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
};
export default PopupWithForm;
