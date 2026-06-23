import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData } from '../api';

function RegistroDePersonal() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('Administrador');

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');
  const [fecha, setFecha] = useState('');
  const [cargo, setCargo] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [confirmarIdentificacion, setConfirmarIdentificacion] = useState('');
  
  const [fotoPreview, setFotoPreview] = useState('../img/registroDePersonal kk .png');
  const [fotoNombre, setFotoNombre] = useState('');

  useEffect(() => {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    setFecha(`${año}-${mes}-${dia}`);

    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado) {
        const user = JSON.parse(usuarioLogueado);
        if (user.nombre) setAdminName(user.nombre);
    }
  }, []);

  const handleFotoChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setFotoNombre(archivo.name);
      setFotoPreview(URL.createObjectURL(archivo));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (identificacion !== confirmarIdentificacion) {
      alert("Error: El número de identificación y su confirmación no coinciden.");
      return;
    }

    const nombreCompleto = `${nombre.trim()} ${apellido.trim()}`;

    const nuevoOperario = {
      nombre: nombreCompleto,
      email: correo.toLowerCase().trim(),
      rol: cargo.toLowerCase()
    };

    try {
      await fetchData('/api/personal', {
        method: 'POST',
        body: JSON.stringify(nuevoOperario)
      });

      alert("¡Operario registrado con éxito en Kimuka!");
      navigate('/login', { replace: true }); 

    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Hubo un error al registrar el operario.");
    }
  };

  return (
    <>
      <nav className="top-nav">
        <Link to="/dashboardadmin">VOLVER AL MENÚ</Link>
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
            
            <form className="grid-form" id="form-personal" onSubmit={handleSubmit}>
              <div className="input-row">
                <div className="input-cell">
                  <label htmlFor="emp-nombre">Nombres de la Persona</label>
                  <input type="text" id="emp-nombre" placeholder="Laura Jimena" value={nombre} onChange={(e) => setNombre(e.target.value)} pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+" title="Solo letras y espacios." required />
                </div>
                <div className="input-cell">
                  <label htmlFor="emp-apellido">Apellidos de la Persona</label>
                  <input type="text" id="emp-apellido" placeholder="Valderrama Vaquero" value={apellido} onChange={(e) => setApellido(e.target.value)} pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+" title="Solo letras y espacios." required />
                </div>
              </div>

              <div className="input-row">
                <div className="input-cell">
                  <label htmlFor="emp-edad">Edad (18 - 80 años)</label>
                  <input type="number" id="emp-edad" placeholder="19" min="18" max="80" value={edad} onChange={(e) => setEdad(e.target.value)} required />
                </div>
                <div className="input-cell">
                  <label htmlFor="emp-correo">Correo Electrónico</label>
                  <input type="email" id="emp-correo" placeholder="ejemplo@gmail.com" value={correo} onChange={(e) => setCorreo(e.target.value)} pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" title="Formato de correo no válido." required />
                </div>
              </div>

              <div className="input-row">
                <div className="input-cell">
                  <label htmlFor="emp-celular">Número de Celular (Colombia)</label>
                  <input type="text" id="emp-celular" placeholder="3001234567" value={celular} onChange={(e) => setCelular(e.target.value)} pattern="3[0-9]{9}" maxLength="10" title="Debe iniciar con 3 y tener 10 dígitos." required />
                </div>
                <div className="input-cell">
                  <label htmlFor="emp-fecha">Fecha de Registro</label>
                  <input type="date" id="emp-fecha" value={fecha} disabled required />
                </div>
              </div>

              <div className="input-row">
                <div className="input-cell">
                  <label htmlFor="emp-identificacion">Número de Identificación</label>
                  <input type="password" id="emp-identificacion" placeholder="Ej: 1014XXXXXX" value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} maxLength="16" required />
                </div>
                <div className="input-cell">
                  <label htmlFor="emp-confirmar-identificacion">Confirmar Identificación</label>
                  <input type="password" id="emp-confirmar-identificacion" placeholder="Repita la identificación" value={confirmarIdentificacion} onChange={(e) => setConfirmarIdentificacion(e.target.value)} onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} maxLength="16" required />
                </div>
              </div>

              <div className="input-row">
                <div className="input-cell">
                  <label htmlFor="emp-cargo">Rol / Perfil</label>
                  <select id="emp-cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} required>
                    <option value="">-- Seleccionar --</option>
                    <option value="empleado">Empleado</option>
                    <option value="administrador">Administrador</option>
                  </select>
                </div>
                <div className="input-cell"></div>
              </div>

              <div className="input-group">
                <label htmlFor="foto-input">Fotografía Corporativa (Avatar) *</label>
                <input type="file" id="foto-input" accept="image/*" onChange={handleFotoChange} required />
              </div>

              <button type="submit" className="btn-submit margin-t-15">Registrar Operario</button>
            </form>
          </div>

          <div className="image-section-cell">
            <h3 className="avatar-preview-text">Foto-Trabajador</h3>
            <div className="portrait-wrapper">
              <img id="vista-previa" src={fotoPreview} alt="Avatar Empleado" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default RegistroDePersonal;