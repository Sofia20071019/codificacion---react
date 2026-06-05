import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegistroDeHoras() {
  const navigate = useNavigate();

  // --- ESTADOS DE CONTROL DE REACT ---
  const [nombreOperario, setNombreOperario] = useState(() => {
    const sesionGuardada = localStorage.getItem('kimuka_sesion_activa');
    return sesionGuardada ? sesionGuardada.toUpperCase() : 'OPERARIO NO IDENTIFICADO';
  });
  const [horaInicio, setHoraInicio] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');

  // 1. CARGA INICIAL: Calcula el tiempo actual y re-verifica la sesión activa
  useEffect(() => {
    const sesionActiva = localStorage.getItem('kimuka_sesion_activa');
    if (sesionActiva) {
      setNombreOperario(sesionActiva.toUpperCase());
    }

    const fechaActual = new Date();

    const anio = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    setFechaInicio(`${anio}-${mes}-${dia}`);

    const horas = String(fechaActual.getHours()).padStart(2, '0');
    const minutos = String(fechaActual.getMinutes()).padStart(2, '0');
    setHoraInicio(`${horas}:${minutos}`);
  }, []);

  // 2. CONTROLADOR DEL ENVÍO DEL FORMULARIO CONECTADO AL SIMULADOR
  const handleSubmit = (e) => {
    e.preventDefault();

    // Estructura exacta requerida por la colección "jornadas" en tu db.json
    const registroAsistencia = {
      idRegistro: 'JOR-' + Date.now(),
      operario: nombreOperario, // Mantiene la consistencia de datos en mayúsculas
      fecha: fechaInicio,
      horaEntrada: horaInicio
    };

    // Reemplazamos la persistencia local por una petición HTTP POST al simulador backend
    fetch('http://localhost:5000/jornadas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registroAsistencia)
    })
      .then(respuesta => {
        if (!respuesta.ok) {
          throw new Error('Error al guardar la jornada en el servidor');
        }
        return respuesta.json();
      })
      .then(data => {
        // Notificación de éxito con datos confirmados por el servidor
        alert(`¡Ingreso Autorizado!\nOperario: ${data.operario}\nHora: ${data.horaEntrada}`);
        navigate('/'); // Redirecciona al menú principal
      })
      .catch(error => {
        console.error("Error crítico de persistencia en jornadas:", error);
        alert("Hubo un fallo de comunicación. Asegúrate de que el servidor en el puerto 5000 esté activo.");
      });
  };

  return (
    <>
      <nav className="top-nav">
        <Link to="/">VOLVER AL MENU</Link>
      </nav>

      <header className="main-header">
        <div className="header-container">
          <div className="logo-principal-cell">
            <div className="logo-principal">
              <div className="logo-circle">
                <img src="../img/logo kimuka.png" alt="Logo" />
              </div>
              <h1>Kimuka - Hora De Inicio</h1>
            </div>
          </div>
          <div className="header-actions-cell">
            <button className="btn-login" type="button">
              <span id="nav-nombre">{nombreOperario}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="content-wrapper">
        <div className="panel-registro">
          <div className="image-section-cell">
            <div className="portrait-wrapper">
              <img src="../img/horasDeTrabajadores kk.png" alt="Decoración textil" />
            </div>
          </div>

          <div className="form-section-cell">
            <h2 className="user-name text-center margin-b-25 font-size-xl" id="titulo-nombre">
              {nombreOperario}
            </h2>
            
            <form className="grid-form" id="form-entrada" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="hora-inicio">Hora de Inicio (Automática Colombia)</label>
                <input 
                  type="time" 
                  id="hora-inicio" 
                  value={horaInicio}
                  readOnly 
                  required 
                />
              </div>

              <div className="input-group">
                <label htmlFor="fecha-inicio">Día de Jornada (Automático)</label>
                <input 
                  type="date" 
                  id="fecha-inicio" 
                  value={fechaInicio}
                  readOnly 
                  required 
                />
              </div>

              <button type="submit" className="btn-submit w-100 margin-t-15"> 
                <Link to="/">
                Ingresar Al Sistema</Link>
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default RegistroDeHoras;