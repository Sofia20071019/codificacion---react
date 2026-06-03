import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function InicioDeSesion() {
  // Estados para capturar lo que el usuario escribe o selecciona
  const [rol, setRol] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Hook de React Router para movernos de página por código
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // 1. Jalamos la lista de personal registrado en el sistema
    const registrosPersonal = JSON.parse(localStorage.getItem('kimuka_personal')) || [];

    // Limpiamos los textos para evitar fallos por espacios o mayúsculas
    const emailDigitado = email.toLowerCase().trim();
    const passwordDigitada = password.trim();

    // 2. Buscamos al operario que coincida exactamente con el correo ingresado
    const usuarioEncontrado = registrosPersonal.find((persona) => {
      const correoRegistro = (persona.email || persona.correo || "").toLowerCase().trim();
      return correoRegistro === emailDigitado;
    });

    // ====================================================================
    // VALIDADOR DE REGISTRO REAL Y CONTRASEÑA
    // ====================================================================
    if (!usuarioEncontrado) {
      alert(" Error: Este correo electrónico no se encuentra registrado en el sistema Kimuka.");
      return; // Detiene la ejecución aquí para que no redirija
    }

    if (usuarioEncontrado.password !== passwordDigitada) {
      alert(" Error: La contraseña ingresada es incorrecta. Inténtelo de nuevo.");
      return; // Detiene la ejecución si la clave no coincide
    }

    if (usuarioEncontrado.rol !== rol) {
      alert(` Advertencia: El perfil seleccionado no coincide con su rol asignado (${usuarioEncontrado.rol}).`);
      return; // Detiene la ejecución si el rol seleccionado en el formulario está mal
    }
    // ====================================================================

    // 3. SI PASÓ LAS VALIDACIONES: Unimos el NOMBRE y el APELLIDO del registro real
    const primerNombre = usuarioEncontrado.nombre || usuarioEncontrado.nombres || '';
    const primerApellido = usuarioEncontrado.apellido || usuarioEncontrado.apellidos || '';
    const nombreParaSesion = `${primerNombre} ${primerApellido}`.trim();

    // Guardamos el nombre real definitivo en la sesión activa
    localStorage.setItem('kimuka_sesion_activa', nombreParaSesion);

    // 4. Retraso controlado para garantizar la escritura antes de navegar a la ruta correspondiente
    setTimeout(() => {
      if (rol === 'administrador') {
        navigate('/cierre-admin');
      } else if (rol === 'empleado') {
        navigate('/registro-horas');
      } else {
        alert('Por favor, seleccione un perfil válido.');
      }
    }, 100);
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
                <label htmlFor="rol-selector">Seleccione Perfil Organizacional</label>
                <select 
                  id="rol-selector" 
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                  required
                >
                  <option value="">-- Seleccionar Rol --</option>
                  <option value="administrador">Administrador</option>
                  <option value="empleado">Empleado</option>
                </select>
              </div>

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