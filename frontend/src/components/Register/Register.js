import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AuthForm from "../AuthForm/AuthForm.js";

function Register({onSubmit}) {
  return (
    <AuthForm name="register" title="Регистрация" onSubmit={onSubmit}>
      <button type="submit" className="authForm__submit-btn">
        Зарегистрироваться
      </button>
      <Link to="/sign-in" className="authForm__caption-link">Уже зарегистрированы? Войти</Link>
    </AuthForm>
  );
}
AuthForm.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
};
export default Register;