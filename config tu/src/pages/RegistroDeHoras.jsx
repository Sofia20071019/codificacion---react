/*
 * ARCHIVO: RegistroDeHoras.jsx
 * PROPOSITO: Página que permite al operario/ empleado registrar el inicio de su jornada laboral.
 *            Muestra un formulario con la hora y fecha automáticas del sistema (zona horaria de
 *            Colombia), el nombre del operario identificado, y un botón para confirmar el ingreso.
 *            Al enviar, crea una nueva jornada en el backend y redirige al dashboard del empleado.
 */

/* Importación de React y hooks de estado y efecto */
import React, { useState, useEffect } from 'react';
/* Link para navegación y useNavigate para redirección programática */
import { Link, useNavigate } from 'react-router-dom';
/* Cliente API centralizado para realizar peticiones al backend */
import { api } from '../api';

/**
 * Componente funcional RegistroDeHoras
 * Permite al empleado registrar la hora de inicio de su jornada laboral.
 * La hora y fecha se obtienen automáticamente del sistema. Al enviar el formulario,
 * se crea una jornada en el backend y se redirige al dashboard.
 */
function RegistroDeHoras() {
  /* Hook de navegación para redirigir al dashboard después del registro exitoso */
  const navigate = useNavigate();

  /**
   * Estado del nombre del operario.
   * Se inicializa con una función que lee el nombre de sesión desde localStorage.
   * Si no existe sesión, muestra un valor por defecto.
   */
  const [nombreOperario, setNombreOperario] = useState(() => {
    /* Leer el nombre de la sesión activa desde localStorage */
    const sesionGuardada = localStorage.getItem('kimuka_sesion_activa');
    /* Si existe, retornar en mayúsculas; si no, retornar texto por defecto */
    return sesionGuardada ? sesionGuardada.toUpperCase() : 'OPERARIO NO IDENTIFICADO';
  });

  /* Estado que almacena la hora de inicio en formato HH:MM */
  const [horaInicio, setHoraInicio] = useState('');
  /* Estado que almacena la fecha de inicio en formato YYYY-MM-DD */
  const [fechaInicio, setFechaInicio] = useState('');

  /**
   * Efecto que se ejecuta una sola vez al montar el componente.
   * Actualiza el nombre del operario desde localStorage y configura
   * la fecha y hora actuales del sistema como valores por defecto.
   */
  useEffect(() => {
    /* Obtener el nombre de la sesión activa desde localStorage */
    const sesionActiva = localStorage.getItem('kimuka_sesion_activa');
    /* Si existe la sesión, actualizar el nombre del operario en mayúsculas */
    if (sesionActiva) setNombreOperario(sesionActiva.toUpperCase());

    /* Obtener la fecha y hora actuales del sistema */
    const fechaActual = new Date();

    /* Obtener el año completo (四位数) */
    const anio = fechaActual.getFullYear();
    /* Obtener el mes (0-11), sumar 1 y rellenar con cero a la izquierda si es necesario */
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    /* Obtener el día del mes y rellenar con cero a la izquierda si es necesario */
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    /* Establecer la fecha de inicio en formato ISO: YYYY-MM-DD */
    setFechaInicio(`${anio}-${mes}-${dia}`);

    /* Obtener las horas (0-23) y rellenar con cero a la izquierda */
    const horas = String(fechaActual.getHours()).padStart(2, '0');
    /* Obtener los minutos (0-59) y rellenar con cero a la izquierda */
    const minutos = String(fechaActual.getMinutes()).padStart(2, '0');
    /* Establecer la hora de inicio en formato HH:MM */
    setHoraInicio(`${horas}:${minutos}`);
  }, []); /* Array de dependencias vacío: se ejecuta solo al montar el componente */

  /**
   * Función que maneja el envío del formulario de registro de jornada.
   * Previene el comportamiento por defecto del formulario, obtiene los datos
   * del usuario logueado y envía la petición API para crear la jornada.
   * @param {Event} e - Evento del formulario
   */
  const handleSubmit = async (e) => {
    /* Prevenir que el formulario recargue la página */
    e.preventDefault();

    try {
      /* Obtener los datos del usuario logueado desde localStorage */
      const usuarioLogueado = localStorage.getItem('usuarioLogueado');
      /* Parsear el JSON para obtener el objeto de usuario */
      const user = JSON.parse(usuarioLogueado);

      /* Enviar petición API para crear una nueva jornada laboral */
      const response = await api.jornadas.crear({
        idUsuario_Empleado: user.idUsuario, /* ID del empleado logueado */
        fecha: fechaInicio,                  /* Fecha de la jornada (YYYY-MM-DD) */
        hInicio: horaInicio,                 /* Hora de inicio (HH:MM) */
      });

      /* Mostrar alerta de confirmación con los datos del registro exitoso */
      alert(`¡Ingreso Autorizado!\nOperario: ${nombreOperario}\nHora: ${response.data.horaEntrada}`);
      /* Redirigir al dashboard del empleado después del registro exitoso */
      navigate('/dashboard-empleado');
    } catch (error) {
      /* En caso de error, mostrar alerta con el mensaje de error del servidor o uno genérico */
      alert(error.message || 'Error al registrar la jornada.');
    }
  };

  /* ========== RENDERIZADO DEL COMPONENTE ========== */
  return (
    /* Fragmento vacío para agrupar elementos sin nodo div extra */
    <>
      {/* Barra de navegación superior con enlace para volver al menú principal */}
      <nav className="top-nav">
        {/* Enlace que redirige al menú principal (ruta raíz) */}
        <Link to="/">VOLVER AL MENU</Link>
      </nav>

      {/* Encabezado principal de la página con logo y nombre del operario */}
      <header className="main-header">
        {/* Contenedor flex del header que distribuye logo y acciones */}
        <div className="header-container">
          {/* Celda izquierda con el logo principal */}
          <div className="logo-principal-cell">
            {/* Contenedor del logo que agrupa imagen y título */}
            <div className="logo-principal">
              {/* Círculo decorativo que contiene la imagen del logo */}
              <div className="logo-circle">
                {/* Imagen del logo de Kimuka */}
                <img src="../img/logo kimuka.png" alt="Logo" />
              </div>
              {/* Título de la página indicando la sección de registro de hora de inicio */}
              <h1>Kimuka - Hora De Inicio</h1>
            </div>
          </div>
          {/* Celda derecha con el botón que muestra el nombre del operario */}
          <div className="header-actions-cell">
            {/* Botón que muestra el nombre del operario identificado */}
            <button className="btn-login" type="button">
              {/* Span con el nombre del operario */}
              <span id="nav-nombre">{nombreOperario}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Contenido principal de la página */}
      <main className="content-wrapper">
        {/* Panel de registro que contiene la imagen decorativa y el formulario */}
        <div className="panel-registro">
          {/* Sección izquierda con imagen decorativa del sector textil */}
          <div className="image-section-cell">
            {/* Wrapper de la imagen de retrato */}
            <div className="portrait-wrapper">
              {/* Imagen decorativa que representa trabajadores textiles */}
              <img src="../img/horasDeTrabajadores kk.png" alt="Decoración textil" />
            </div>
          </div>
          {/* Sección derecha con el formulario de registro de hora de inicio */}
          <div className="form-section-cell">
            {/* Nombre del operario visible en grande dentro del formulario */}
            <h2 className="user-name text-center margin-b-25 font-size-xl">{nombreOperario}</h2>
            {/* Formulario de registro que ejecuta handleSubmit al enviarse */}
            <form className="grid-form" onSubmit={handleSubmit}>
              {/* Campo de entrada: hora de inicio (automática, solo lectura) */}
              <div className="input-group">
                {/* Etiqueta que indica que la hora es automática para Colombia */}
                <label>Hora de Inicio (Automática Colombia)</label>
                {/* Input de tipo time con la hora actual, en solo lectura y requerido */}
                <input type="time" value={horaInicio} readOnly required />
              </div>
              {/* Campo de entrada: fecha de la jornada (automática, solo lectura) */}
              <div className="input-group">
                {/* Etiqueta que indica que la fecha es automática */}
                <label>Día de Jornada (Automático)</label>
                {/* Input de tipo date con la fecha actual, en solo lectura y requerido */}
                <input type="date" value={fechaInicio} readOnly required />
              </div>
              {/* Botón de envío del formulario para registrar el inicio de la jornada */}
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

/* Exportar el componente RegistroDeHoras como exportación por defecto */
export default RegistroDeHoras;
