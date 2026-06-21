import React, { useState, useEffect } from 'react';
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
  const [identificacion, setIdentificacion] = useState('');
  const [confirmarIdentificacion, setConfirmarIdentificacion] = useState('');
  
  // Estado para almacenar la URL temporal de la foto de vista previa en la interfaz
  const [fotoPreview, setFotoPreview] = useState('../img/registroDePersonal kk .png');
  // Estado para almacenar únicamente el nombre del archivo de imagen para el simulador
  const [fotoNombre, setFotoNombre] = useState('');

  // --- EFECTO PARA FIJAR LA FECHA DE HOY AUTOMÁTICAMENTE ---
  useEffect(() => {
    const hoy = new Date();
    const año = hoy.getFullYear();
    // Aseguramos que los meses y días tengan siempre 2 dígitos
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    
    setFecha(`${año}-${mes}-${dia}`);
  }, []);

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

    // VALIDACIÓN: Verificar que el número de identificación y la confirmación coincidan
    if (identificacion !== confirmarIdentificacion) {
      alert("Error: El número de identificación y su confirmación no coinciden. Por favor, verifíquelos.");
      return;
    }

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
      fechaRegistro: fecha, // Se envía la fecha asignada de hoy de forma segura
      rol: cargo,
      password: identificacion.trim(), // Se guarda la identificación como la contraseña del sistema
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
            <button className="btn-login">Administrador</button>
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
                    pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+"
                    title="El nombre solo puede contener letras, tildes y espacios."
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
                    pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+"
                    title="El apellido solo puede contener letras, tildes y espacios."
                    required 
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-cell">
                  <label htmlFor="emp-edad">Edad (18 - 80 años)</label>
                  <input 
                    type="number" 
                    id="emp-edad" 
                    placeholder="19" 
                    min="18" 
                    max="80" 
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
                    placeholder="ejemplo@gmail.com, .co, .com o .edu" 
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co|edu|gmail\.com)$"
                    title="Por favor, introduzca un correo con terminación válida (gmail.com, .co, .com, .edu)"
                    required 
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-cell">
                  <label htmlFor="emp-celular">Número de Celular (Colombia)</label>
                  <input 
                    type="text" 
                    id="emp-celular" 
                    placeholder="3001234567" 
                    value={celular}
                    onChange={(e) => setCelular(e.target.value)}
                    pattern="3[0-9]{9}"
                    maxLength="10"
                    title="El número de celular en Colombia debe iniciar con 3 y tener exactamente 10 dígitos numéricos."
                    required 
                  />
                </div>
                <div className="input-cell">
                  <label htmlFor="emp-fecha">Fecha de Registro (Hoy - Bloqueado)</label>
                  <input 
                    type="date" 
                    id="emp-fecha" 
                    value={fecha}
                    disabled 
                    required 
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-cell">
                  <label htmlFor="emp-identificacion">Número de Identificación (Contraseña)</label>
                  <input 
                    type="password" 
                    id="emp-identificacion" 
                    placeholder="Ej: 1014XXXXXX" 
                    value={identificacion}
                    onChange={(e) => setIdentificacion(e.target.value)}
                    pattern="[0-9]+"
                    title="La identificación debe contener únicamente números."
                    required 
                  />
                </div>
                <div className="input-cell">
                  <label htmlFor="emp-confirmar-identificacion">Confirmar Identificación</label>
                  <input 
                    type="password" 
                    id="emp-confirmar-identificacion" 
                    placeholder="Repita la identificación" 
                    value={confirmarIdentificacion}
                    onChange={(e) => setConfirmarIdentificacion(e.target.value)}
                    pattern="[0-9]+"
                    title="La identificación debe contener únicamente números."
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
                {/* Celda vacía para mantener la simetría visual del grid-form */}
                <div className="input-cell"></div>
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