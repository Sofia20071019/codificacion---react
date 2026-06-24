import React from 'react';
import Logo from '../assets/logokimuka.png';

function Header() {
  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo-principal-cell">
          <div className="logo-principal">
            <div className="logo-circle">
                <img src={Logo} alt="Logo" />
            </div>
            <h1>KIMUKA</h1>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;