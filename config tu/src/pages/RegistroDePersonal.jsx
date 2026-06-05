import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importamos useNavigate

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
  
  // Estado para almacenar la URL temporal de la foto de vista previa en la interfaz
  const [fotoPreview, setFotoPreview] = useState('../img/registroDePersonal kk .png');
  // Estado para almacenar únicamente el nombre del archivo de imagen para el simulador
  const [fotoNombre, setFotoNombre] = useState('');

  // --- MANEJADOR DEL CAMBIO DE IMAGEN ---
  const handleFotoChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setFotoNombre(archivo.name); // Guardamos el nombre del archivo (ej: "operario.png")
      
      const urlTemporal = URL.createObjectURL(archivo);
      setFotoPreview(urlTemporal); // Genera la vista previa visual en el componente
    }
  };

  // --- CONTROLADOR DEL ENVÍO DEL FORMULARIO AL SIMULADOR MOCK-BACKEND ---
  const handleSubmit = (e) => {
    e.preventDefault(); 

    // Si el usuario subió una foto, estructuramos la ruta relativa, si no, dejamos la por defecto
    const fotoFinal = fotoNombre ? `../img/${fotoNombre}` : "../img/registroDePersonal kk .png";

    // 1. Creamos el objeto del operario con la estructura exacta compatible con db.json
    const nuevoOperario = {
      id: 'OP-' + Date.now(), // ID único para cumplir con la trazabilidad estándar (ISO 9001)
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      edad: edad,
      email: correo.toLowerCase().trim(),
      celular: celular,
      fechaRegistro: fecha,
      rol: cargo,
      password: password, // Nota: En entornos de producción real bajo la ley 1581 (Habeas Data), esto debe ir encriptado
      foto: fotoFinal
    };

    // 2. Enviamos el registro por método POST a la colección "personal" de json-server
    fetch('http://localhost:5000/personal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoOperario)
    })
      .then(respuesta => {
        if (!respuesta.ok) {
          throw new Error('Error en la respuesta del servidor simulado');
        }
        return respuesta.json();
      })
      .then(data => {
        // 3. Notificamos éxito con los datos devuelvos por el backend y redirigimos
        alert(`¡Operario registrado con éxito en el sistema!\nNombre: ${data.nombre} ${data.apellido}`);
        navigate('/login'); 
      })
      .catch(error => {
        console.error("Error crítico de conexión con el simulador de personal:", error);
        alert("Hubo un error al registrar el operario. Por favor, verifica que el simulador esté encendido en el puerto 5000.");
      });
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