import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

function EmpleadoTareas() {
  const [asignaciones, setAsignaciones] = useState([]);
  const [empleadoName, setEmpleadoName] = useState('EMPLEADO');

  useEffect(() => {
    const nombreSesion = localStorage.getItem('kimuka_sesion_activa');
    if (nombreSesion) setEmpleadoName(nombreSesion.toUpperCase());

    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado) {
      const user = JSON.parse(usuarioLogueado);
      api.asignaciones.porEmpleado(user.idUsuario)
        .then((r) => setAsignaciones(r.data || []))
        .catch(() => {});
    }
  }, []);

  const cambiarEstado = async (id, estado) => {
    try {
      await api.asignaciones.cambiarEstado(id, { estado });
      setAsignaciones(asignaciones.map((a) => a.idAsignacion === id ? { ...a, estado } : a));
    } catch (err) {
      alert(err.message || 'Error al actualizar.');
    }
  };

  return (
    <>
      <nav className="top-nav">
        <Link to="/dashboard-empleado">VOLVER</Link>
      </nav>
      <header className="main-header">
        <div className="header-container">
          <div className="logo-principal-cell">
            <div className="logo-principal">
              <div className="logo-circle"><img src="../img/logo kimuka.png" alt="Logo" /></div>
              <h1>Mis Materiales Asignados</h1>
            </div>
          </div>
          <div className="header-actions-cell">
            <button className="btn-login">{empleadoName}</button>
          </div>
        </div>
      </header>

      <main className="content-wrapper">
        <section className="panel-gestion">
          <div className="table-container">
            <table className="kimukaPedidos-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Material</th>
                  <th>Cantidad</th>
                  <th>Fecha Asignación</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {asignaciones.length === 0 ? (
                  <tr><td colSpan="6" className="text-center text-secondary">No tienes materiales asignados.</td></tr>
                ) : (
                  asignaciones.map((a) => (
                    <tr key={a.idAsignacion}>
                      <td>{a.idAsignacion}</td>
                      <td>{a.nombreInsumo}</td>
                      <td>{a.cantidad}</td>
                      <td>{a.fechaAsignacion}</td>
                      <td><span className={`status ${a.estado === 'Completada' ? 'status-success' : a.estado === 'En Proceso' ? 'status-pending' : 'status-pending'}`}>{a.estado}</span></td>
                      <td>
                        {a.estado === 'Pendiente' && (
                          <button className="btn-login" onClick={() => cambiarEstado(a.idAsignacion, 'En Proceso')}>Iniciar</button>
                        )}
                        {a.estado === 'En Proceso' && (
                          <button className="btn-submit" onClick={() => cambiarEstado(a.idAsignacion, 'Completada')}>Completar</button>
                        )}
                        {a.estado === 'Completada' && (
                          <span className="text-muted font-size-sm">Finalizado</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}

export default EmpleadoTareas;
