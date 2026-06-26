import { Link, useNavigate } from 'react-router-dom'; 
import { useState, useEffect } from 'react';

function CierreDeSesionEmpleado() {
  const navigate = useNavigate();
  const [empleadoName, setEmpleadoName] = useState('EMPLEADO');
  const [horaSalida, setHoraSalida] = useState('18:00');
  const [fechaSalida, setFechaSalida] = useState('');

  useEffect(() => {
    // 1. Cargar datos automáticos de fecha y hora del sistema
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    setFechaSalida(`${año}-${mes}-${dia}`);

    const horas = String(hoy.getHours()).padStart(2, '0');
    const minutos = String(hoy.getMinutes()).padStart(2, '0');
    setHoraSalida(`${horas}:${minutos}`);

    // 2. Extraer de manera dinámica el nombre del usuario activo
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    const nombreSesion = localStorage.getItem('kimuka_sesion_activa');

    if (usuarioLogueado) {
      const user = JSON.parse(usuarioLogueado);
      if (user.nombre) setEmpleadoName(user.nombre.toUpperCase());
    } else if (nombreSesion) {
      setEmpleadoName(nombreSesion.toUpperCase());
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes añadir tu fetch al backend si vas a guardar la hora exacta en tu BD en un futuro.
    alert(`¡Jornada registrada con éxito para ${empleadoName}!`);

    // Limpiamos las credenciales locales para invalidar la sesión
    localStorage.removeItem('kimuka_sesion_activa');
    localStorage.removeItem('usuarioLogueado');

    // Redirigimos rompiendo el historial para que no puedan volver hacia atrás
    navigate('/login', { replace: true });
  };

  return (
    <>
      {/* Redirección interna en lugar de un archivo estático html */}
      <nav className="top-nav">
        <Link to="/" className="no-text-decor">VOLVER</Link>
      </nav>

      <header className="main-header">
        <div className="header-container">
          <div className="logo-principal-cell">
            <div className="logo-principal">
              <div className="logo-circle">
                <img src="../img/logo kimuka.png" alt="Logo" />
              </div>
              <h1>Kimuka - Cierre de Jornada</h1>
            </div>
          </div>
          <div className="header-actions-cell">
            <button className="btn-login">{empleadoName}</button>
          </div>
        </div>
      </header>

      <main className="content-wrapper">
        <div className="panel-registro">
          <div className="image-section-cell">
            <div className="portrait-wrapper">
              <img src="../img/horasDeTrabajadores kk.png" alt="Salida" />
            </div>
          </div>

          <div className="form-section-cell">
            <h2 className="user-name text-center margin-b-25 font-size-xl">Cierre de Turno</h2>
            
            <form className="grid-form" id="form-salida" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="hora-salida">Marque la hora de Fin</label>
                <input 
                  type="time" 
                  id="hora-salida" 
                  value={horaSalida} 
                  onChange={(e) => setHoraSalida(e.target.value)} 
                  required 
                />
              </div>

              <div className="input-group">
                <label htmlFor="fecha-salida">Ingrese el día</label>
                <input 
                  type="date" 
                  id="fecha-salida" 
                  value={fechaSalida} 
                  onChange={(e) => setFechaSalida(e.target.value)} 
                  required 
                />
              </div>

              <button type="submit" className="btn-submit w-100 margin-t-15 btn-alert-color">
                Registrar Salida y Salir
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default CierreDeSesionEmpleado;