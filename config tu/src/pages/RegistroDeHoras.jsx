import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegistroDeHoras() {
  const navigate = useNavigate();

  // --- ESTADOS DE CONTROL DE REACT ---
  //  Modificación 1: Convertimos a mayúsculas el valor inicial del localStorage
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
      //  Modificación 2: Forzamos el texto en mayúsculas al actualizar el estado
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

  // 2. CONTROLADOR DEL ENVÍO DEL FORMULARIO
  const handleSubmit = (e) => {
    e.preventDefault();

    const registroAsistencia = {
      idRegistro: 'JOR-' + Date.now(),
      operario: nombreOperario, // Se guardará en mayúsculas en el historial de jornadas
      fecha: fechaInicio,
      horaEntrada: horaInicio
    };

    let historialJornadas = JSON.parse(localStorage.getItem('kimuka_jornadas')) || [];
    historialJornadas.push(registroAsistencia);
    localStorage.setItem('kimuka_jornadas', JSON.stringify(historialJornadas));

    alert(`¡Ingreso Autorizado!\nOperario: ${registroAsistencia.operario}\nHora: ${registroAsistencia.horaEntrada}`);

    navigate('/');
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
              {/* Aquí se mostrará automáticamente en mayúsculas */}
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
            {/* Aquí también se reflejará el cambio en mayúsculas sobre el formulario */}
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
                Ingresar Al Sistema
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default RegistroDeHoras;