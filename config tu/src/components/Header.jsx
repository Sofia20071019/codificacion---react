import React from 'react';

function Header() {
  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo-principal-cell">
          <div className="logo-principal">
            <div className="logo-circle">
                <img src="../img/logokimuka.png" alt="Logo" />
            </div>
            <h1>KIMUKA</h1>
          </div>
        </div>
        {/* ... resto del header ... */}
      </div>
    </header>
  );
}

export default Header;