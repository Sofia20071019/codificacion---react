import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../api';

function CierreDeSesionEmpleado() {
  const navigate = useNavigate();
  const [empleadoName, setEmpleadoName] = useState('EMPLEADO');
  const [horaSalida, setHoraSalida] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');
  const [idJornada, setIdJornada] = useState('');

  useEffect(() => {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    setFechaSalida(`${año}-${mes}-${dia}`);

    const horas = String(hoy.getHours()).padStart(2, '0');
    const minutos = String(hoy.getMinutes()).padStart(2, '0');
    setHoraSalida(`${horas}:${minutos}`);

    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    const nombreSesion = localStorage.getItem('kimuka_sesion_activa');
    if (usuarioLogueado) {
      const user = JSON.parse(usuarioLogueado);
      if (user.nombre) setEmpleadoName(user.nombre.toUpperCase());
    } else if (nombreSesion) {
      setEmpleadoName(nombreSesion.toUpperCase());
    }

    api.jornadas.listar()
      .then((res) => {
        const usuarioLogueado = localStorage.getItem('usuarioLogueado');
        if (!usuarioLogueado) return;
        const user = JSON.parse(usuarioLogueado);
        const jornadaActiva = (res.data || []).find(
          (j) => j.idUsuario_Empleado === user.idUsuario && !j.hFin
        );
        if (jornadaActiva) setIdJornada(jornadaActiva.idJornada);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (idJornada) {
        await api.jornadas.finalizar(idJornada, { hFin: horaSalida });
      }
      alert(`¡Jornada registrada con éxito para ${empleadoName}!`);

      localStorage.removeItem('kimuka_sesion_activa');
      localStorage.removeItem('usuarioLogueado');
      localStorage.removeItem('token');
      sessionStorage.clear();
      navigate('/login', { replace: true });
    } catch (error) {
      alert(error.message || 'Error al registrar salida.');
    }
  };

  return (
    <>
      <nav className="top-nav">
        <Link to="/dashboard-empleado" className="no-text-decor">VOLVER</Link>
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
            <form className="grid-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Hora de Fin</label>
                <input type="time" value={horaSalida} onChange={(e) => setHoraSalida(e.target.value)} required />
              </div>
              <div className="input-group">
                <label>Fecha</label>
                <input type="date" value={fechaSalida} onChange={(e) => setFechaSalida(e.target.value)} required />
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
