import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';

function RegistroDePersonal() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('ADMINISTRADOR');
  const [roles, setRoles] = useState([]);

  const [pNombre, setPNombre] = useState('');
  const [sNombre, setSNombre] = useState('');
  const [pApellido, setPApellido] = useState('');
  const [sApellido, setSApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [idRol, setIdRol] = useState('');

  useEffect(() => {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado) {
      const user = JSON.parse(usuarioLogueado);
      if (user.nombre) setAdminName(user.nombre.toUpperCase());
    }

    api.roles.listar()
      .then((res) => setRoles(res.data || []))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmarPassword) {
      alert('Error: Las contraseñas no coinciden.');
      return;
    }

    try {
      await api.usuarios.crear({
        pNombre: pNombre.trim(),
        sNombre: sNombre.trim() || null,
        pApellido: pApellido.trim(),
        sApellido: sApellido.trim() || null,
        correo: correo.toLowerCase().trim(),
        password: password.trim(),
        idRol,
      });

      alert('¡Usuario registrado con éxito en Kimuka!');
      navigate('/empleados', { replace: true });
    } catch (error) {
      alert(error.message || 'Error al registrar el usuario.');
    }
  };

  return (
    <>
      <nav className="top-nav">
        <Link to="/empleados">VOLVER</Link>
      </nav>

      <header className="main-header">
        <div className="header-container">
          <div className="logo-principal-cell">
            <div className="logo-principal">
              <div className="logo-circle">
                <img src="../img/logo kimuka.png" alt="Logo" />
              </div>
              <h1>Kimuka - Personal</h1>
            </div>
          </div>
          <div className="header-actions-cell">
            <button className="btn-login">{adminName}</button>
            <button className="btn-login">
              <Link to="/cierre-admin">Cerrar Sesión</Link>
            </button>
          </div>
        </div>
      </header>

      <main className="content-wrapper">
        <div className="panel-registro">
          <div className="form-section-cell">
            <h2 className="form-title">Registrar Nuevo Empleado</h2>

            <form className="grid-form" onSubmit={handleSubmit}>
              <div className="input-row">
                <div className="input-cell">
                  <label>Primer Nombre</label>
                  <input type="text" placeholder="Laura" value={pNombre} onChange={(e) => setPNombre(e.target.value.replace(/[0-9]/g, ''))} required />
                </div>
                <div className="input-cell">
                  <label>Segundo Nombre</label>
                  <input type="text" placeholder="Jimena" value={sNombre} onChange={(e) => setSNombre(e.target.value.replace(/[0-9]/g, ''))} />
                </div>
              </div>

              <div className="input-row">
                <div className="input-cell">
                  <label>Primer Apellido</label>
                  <input type="text" placeholder="Valderrama" value={pApellido} onChange={(e) => setPApellido(e.target.value.replace(/[0-9]/g, ''))} required />
                </div>
                <div className="input-cell">
                  <label>Segundo Apellido</label>
                  <input type="text" placeholder="Vaquero" value={sApellido} onChange={(e) => setSApellido(e.target.value.replace(/[0-9]/g, ''))} />
                </div>
              </div>

              <div className="input-row">
                <div className="input-cell">
                  <label>Correo Electrónico</label>
                  <input type="email" placeholder="ejemplo@gmail.com" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                </div>
                <div className="input-cell">
                  <label>Rol / Perfil</label>
                  <select value={idRol} onChange={(e) => setIdRol(e.target.value)} required>
                    <option value="">-- Seleccionar --</option>
                    {roles.map((r) => (
                      <option key={r.idRol} value={r.idRol}>{r.nombreRol}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-row">
                <div className="input-cell">
                  <label>Contraseña</label>
                  <input type="password" placeholder="Identificación" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="input-cell">
                  <label>Confirmar Contraseña</label>
                  <input type="password" placeholder="Repita la identificación" value={confirmarPassword} onChange={(e) => setConfirmarPassword(e.target.value)} required />
                </div>
              </div>

              <button type="submit" className="btn-submit margin-t-15">Registrar Usuario</button>
            </form>
          </div>

          <div className="image-section-cell">
            <h3 className="avatar-preview-text">Foto-Trabajador</h3>
            <div className="portrait-wrapper">
              <img src="../img/registroDePersonal kk .png" alt="Avatar Empleado" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default RegistroDePersonal;
