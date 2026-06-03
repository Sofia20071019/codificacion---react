import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; //  Importamos useNavigate

function RegistroDePersonal() {
  const navigate = useNavigate(); // Inicializamos el hook de navegación

  // --- ESTADOS PARA CAPTURAR LOS DATOS DEL FORMULARIO ---
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');
  const [fecha, setFecha] = useState('');
  const [cargo, setCargo] = useState('');
  const [password, setPassword] = useState('');
  
  // Estado para almacenar la URL temporal de la foto de vista previa
  const [fotoPreview, setFotoPreview] = useState('../img/registroDePersonal kk .png');

  // --- MANEJADOR DEL CAMBIO DE IMAGEN ---
  const handleFotoChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const urlTemporal = URL.createObjectURL(archivo);
      setFotoPreview(urlTemporal);
    }
  };

  // --- CONTROLADOR DEL ENVÍO DEL FORMULARIO ---
  const handleSubmit = (e) => {
    e.preventDefault(); 

    // 1. Creamos el objeto del operario
    const nuevoOperario = {
      id: 'OP-' + Date.now(),
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      edad: edad,
      email: correo.toLowerCase().trim(),
      celular: celular,
      fechaRegistro: fecha,
      rol: cargo,
      password: password,
      foto: fotoPreview
    };

    // 2. Traemos la lista previa o array vacío
    const registrosExistentes = JSON.parse(localStorage.getItem('kimuka_personal')) || [];

    // 3. Agregamos el nuevo registro
    registrosExistentes.push(nuevoOperario);

    // 4. Guardamos en LocalStorage
    localStorage.setItem('kimuka_personal', JSON.stringify(registrosExistentes));

    // 5. Notificamos e inmediatamente redirigimos al inicio de sesión
    alert(`¡Operario registrado con éxito!\nNombre: ${nuevoOperario.nombre} ${nuevoOperario.apellido}`);
    
    // Ajusta la ruta si en tu App.jsx el inicio de sesión se llama diferente (ej: '/login')
    navigate('/login'); 
  };

  return (
    <>
      <nav className="top-nav">
        <Link to="/">VOLVER AL MENÚ</Link>
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
                  <input 
                    type="text" 
                    id="emp-nombre" 
                    placeholder="Laura Jimena" 
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required 
                  />
                </div>
                <div className="input-cell">
                  <label htmlFor="emp-apellido">Apellidos de la Persona</label>
                  <input 
                    type="text" 
                    id="emp-apellido" 
                    placeholder="Valderrama Vaquero" 
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-cell">
                  <label htmlFor="emp-edad">Edad</label>
                  <input 
                    type="number" 
                    id="emp-edad" 
                    placeholder="19" 
                    min="18" 
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                    required 
                  />
                </div>
                <div className="input-cell">
                  <label htmlFor="emp-correo">Correo Electrónico</label>
                  <input 
                    type="email" 
                    id="emp-correo" 
                    placeholder="hola@sitioincreible.co" 
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-cell">
                  <label htmlFor="emp-celular">Número de Celular</label>
                  <input 
                    type="text" 
                    id="emp-celular" 
                    placeholder="32634789" 
                    value={celular}
                    onChange={(e) => setCelular(e.target.value)}
                    required 
                  />
                </div>
                <div className="input-cell">
                  <label htmlFor="emp-fecha">Fecha de Registro</label>
                  <input 
                    type="date" 
                    id="emp-fecha" 
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-cell">
                  <label htmlFor="emp-cargo">Rol / Perfil</label>
                  <select 
                    id="emp-cargo" 
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    required
                  >
                    <option value="">-- Seleccionar --</option>
                    <option value="empleado">Empleado</option>
                    <option value="administrador">Administrador</option>
                  </select>
                </div>
                <div className="input-cell">
                  <label htmlFor="emp-password">Contraseña Asignada</label>
                  <input 
                    type="password" 
                    id="emp-password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="foto-input">Fotografía Corporativa (Avatar)</label>
                <input 
                  type="file" 
                  id="foto-input" 
                  accept="image/*" 
                  onChange={handleFotoChange}
                />
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