import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';

function InicioDeSesion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.auth.login(email, password);
      const user = response.data;

      localStorage.setItem('kimuka_sesion_activa', user.nombre);
      localStorage.setItem('usuarioLogueado', JSON.stringify(user));

      if (user.idRol === 'ROL-001') {
        navigate('/dashboardadmin');
      } else {
        navigate('/registro-horas');
      }
    } catch (error) {
      alert(error.message || 'Credenciales inválidas. Verifica tu correo y contraseña.');
    }
  };

  return (
    <>
      <nav className="top-nav">
        <Link to="/">VOLVER</Link>
      </nav>

      <main className="content-wrapper flex-center">
        <div className="panel-registro max-w-500">
          <div className="form-section-cell w-100">
            <div className="text-center margin-b-25">
              <img src="../img/logo kimuka.png" alt="Logo" className="logo-img-auth" />
            </div>
            <h2 className="form-title text-center margin-t-10 font-size-xl">Acceso al Sistema</h2>

            <form className="grid-form" id="form-login" onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="user-email">Correo Electrónico Corporativo</label>
                <input
                  type="email"
                  id="user-email"
                  placeholder="hola@sitioincreible.co"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="user-pass">Contraseña Corporativa</label>
                <input
                  type="password"
                  id="user-pass"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-submit w-100 margin-t-15">
                Ingresar de Forma Segura
              </button>

              <div className="text-center margin-t-20" style={{ borderTop: '1px solid #333', paddingTop: '15px' }}>
                <p className="text-muted font-size-sm" style={{ margin: 0 }}>
                  ¿Tienes problemas para acceder?{' '}
                  <Link to="/recuperar-contrasena" style={{ color: '#f39c12', fontWeight: 'bold', textDecoration: 'none' }}>
                    Recuperar contraseña aquí
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default InicioDeSesion;
