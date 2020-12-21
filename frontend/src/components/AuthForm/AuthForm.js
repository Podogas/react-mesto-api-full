import React from "react";


function AuthForm({ name, title, children, onSubmit}) {
  const emailRef = React.useRef();
  const passRef = React.useRef();
  const [validity, setValidity] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  function handleValidation() {
    setErrorMessage({
      emailErr: emailRef.current.validationMessage,
      passErr: passRef.current.validationMessage,
    });
    if(emailRef.current.validity.valid && passRef.current.validity.valid) {
      if(!passRef.current.value.includes(' ')){
        setValidity(true)
      } else {
        setValidity(false);
        setErrorMessage({
      emailErr: emailRef.current.validationMessage,
      passErr: 'Пароль не может содержать пробел',
    });
      }
    } 
    else{
      setValidity(false)
    }
  }
  function submit(e) {
    e.preventDefault();
    if(validity){
      onSubmit(passRef.current.value , emailRef.current.value)
    }
    


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
