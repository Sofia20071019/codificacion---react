import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';

function RegistroDeHoras() {
  const navigate = useNavigate();
  const [nombreOperario, setNombreOperario] = useState(() => {
    const sesionGuardada = localStorage.getItem('kimuka_sesion_activa');
    return sesionGuardada ? sesionGuardada.toUpperCase() : 'OPERARIO NO IDENTIFICADO';
  });
  const [horaInicio, setHoraInicio] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');

  useEffect(() => {
    const sesionActiva = localStorage.getItem('kimuka_sesion_activa');
    if (sesionActiva) setNombreOperario(sesionActiva.toUpperCase());

    const fechaActual = new Date();
    const anio = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    setFechaInicio(`${anio}-${mes}-${dia}`);

    const horas = String(fechaActual.getHours()).padStart(2, '0');
    const minutos = String(fechaActual.getMinutes()).padStart(2, '0');
    setHoraInicio(`${horas}:${minutos}`);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const usuarioLogueado = localStorage.getItem('usuarioLogueado');
      const user = JSON.parse(usuarioLogueado);

      const response = await api.jornadas.crear({
        idUsuario_Empleado: user.idUsuario,
        fecha: fechaInicio,
        hInicio: horaInicio,
      });

      alert(`¡Ingreso Autorizado!\nOperario: ${nombreOperario}\nHora: ${response.data.horaEntrada}`);
      navigate('/dashboard-empleado');
    } catch (error) {
      alert(error.message || 'Error al registrar la jornada.');
    }
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
            <h2 className="user-name text-center margin-b-25 font-size-xl">{nombreOperario}</h2>
            <form className="grid-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Hora de Inicio (Automática Colombia)</label>
                <input type="time" value={horaInicio} readOnly required />
              </div>
              <div className="input-group">
                <label>Día de Jornada (Automático)</label>
                <input type="date" value={fechaInicio} readOnly required />
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
