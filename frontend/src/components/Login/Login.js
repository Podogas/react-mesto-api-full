import React from "react";
import PropTypes from "prop-types";
import AuthForm from "../AuthForm/AuthForm.js";

function Login({onSubmit}) {
  const [isValid, setIsValid] = React.useState(true);
  function onValid(isValid){
   setIsValid(isValid)
  }
  return (
    <AuthForm name="login" title="Вход" onSubmit={onSubmit} onValid={onValid}>
      <button type="submit" className={`authForm__submit-btn ${isValid ? '' : 'authForm__submit-btn_blocked'}`} >
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
