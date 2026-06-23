import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData } from '../api';

function InicioDeSesion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 

    const emailDigitado = email.toLowerCase().trim();
    const passwordDigitada = password.trim();

    try {
      const registrosPersonal = await fetchData('/api/personal');

      const usuarioEncontrado = registrosPersonal.find((persona) => {
        const correoRegistro = (persona.email || "").toLowerCase().trim();
        return correoRegistro === emailDigitado;
      });

      if (!usuarioEncontrado) {
        alert("Error: Este correo electrónico no se encuentra registrado en el sistema Kimuka.");
        return; 
      }

      const nombreParaSesion = usuarioEncontrado.nombre;

      localStorage.setItem('kimuka_sesion_activa', nombreParaSesion);
      localStorage.setItem('usuarioLogueado', JSON.stringify({ nombre: nombreParaSesion }));

      const rolUsuario = usuarioEncontrado.rol.toLowerCase();

      if (rolUsuario === 'administrador') {
        navigate('/dashboardadmin');
      } else if (rolUsuario === 'empleado') {
        navigate('/registro-horas');
      } else {
        alert('Tu usuario no tiene un rol válido asignado en el sistema.');
      }

    } catch (error) {
      console.error("Error crítico durante el inicio de sesión:", error);
      alert("Hubo un problema de conexión con el backend de Kimuka. Asegúrate de que el servidor esté corriendo en el puerto 5000.");
    }
  };

  return (
    <>
      <nav className="top-nav">
        <Link to="/">VOLVER AL INICIO</Link>
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

              <div className="text-right">
                <Link to="/recuperar-contrasena" className="font-size-sm no-text-decor text-muted">
                  ¿Olvidó su contraseña?
                </Link>
              </div>

              <button type="submit" className="btn-submit w-100 margin-t-15">
                Ingresar de Forma Segura
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default InicioDeSesion;