import React from "react";
import PropTypes from "prop-types";
import AuthForm from "../AuthForm/AuthForm.js";

function Login({onSubmit}) {
  return (
    <AuthForm name="login" title="Вход" onSubmit={onSubmit}>
      <button type="submit" className="authForm__submit-btn">
        Войти
      </button>
      {/*Здесь пустой див для того что бы после переключения на 
      страницу регистрации и обратно футер не скакал вверх вниз*/}
      <div className="authForm__caption-link"></div>
    </AuthForm>
  );
}
AuthForm.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
};
export default Login;
