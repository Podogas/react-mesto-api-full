import React from "react";


function AuthForm({ name, title, children, onSubmit}) {
  const emailRef = React.useRef();
  const passRef = React.useRef();
  const [errorMessage, setErrorMessage] = React.useState("");
  function handleValidation() {
    setErrorMessage({
      emailErr: emailRef.current.validationMessage,
      passErr: passRef.current.validationMessage,
    });
  }
  function submit(e) {
    e.preventDefault();
    onSubmit(passRef.current.value , emailRef.current.value)
  }
  return (
    <section className={"authForm"}>
      <div className="authForm__window">
        <h2 className={`authForm__heading authForm__heading_${name}`}>
          {title}
        </h2>
        <form
          noValidate
          className={`authForm__input-container authForm__input-container_${name}`}
          name={name}
          method="post"
          action=""
          onSubmit={submit}
        >
          <input
            ref={emailRef}
            type="email"
            name="email"
            id="emailInput"
            placeholder="Email"
            required
            className="authForm__input-item"
            onChange={handleValidation}
          />
          <span
            className="authForm__input-error-message"
            id="authFormInput-err"
          >
            {errorMessage.emailErr}
          </span>
          <input
            ref={passRef}
            type="password"
            name="pass"
            id="passInput"
            placeholder="Пароль"
            required
            className="authForm__input-item"
            onChange={handleValidation}
          />
          <span
            className="authForm__input-error-message"
            id="authFormInput-err"
          >
            {errorMessage.passErr}
          </span>
         
          {children}
        </form>
      </div>
    </section>
  );
}

export default AuthForm;
