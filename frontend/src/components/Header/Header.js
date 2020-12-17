import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from 'react-router-dom'; 
function Header({onClick, email}) {
  const { pathname } = useLocation();
  let linkSettings = {
    linkPath: '',
    linkText: ''
}
if (pathname === '/sign-in') {
  linkSettings = {
    linkPath: '/sign-up',
    linkText: 'Регистрация'}
} else if (pathname === '/sign-up') {
    linkSettings = {
    linkPath: '/sign-in',
    linkText: 'Войти'}
} else {
      linkSettings = {
    linkPath: '/sign-in',
    linkText: 'Выйти'}
}

  return (
    <header className="header">
      <div className="header__logo"></div>
      <div>
      <p className="header__email" >{email} </p>
      <Link to={linkSettings.linkPath} className="header__loginLink" onClick={onClick}>{linkSettings.linkText}</Link>
      </div>
    </header>
  );
}
Header.propTypes = {
  unsignedNav: PropTypes.node,
  }
export default Header;
