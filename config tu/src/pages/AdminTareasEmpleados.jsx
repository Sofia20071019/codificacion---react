import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

function AdminTareasEmpleados() {
  const [asignaciones, setAsignaciones] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [filtroEmpleado, setFiltroEmpleado] = useState('');
  const [adminName, setAdminName] = useState('ADMINISTRADOR');

  useEffect(() => {
    const nombreSesion = localStorage.getItem('kimuka_sesion_activa');
    if (nombreSesion) setAdminName(nombreSesion.toUpperCase());

    api.asignaciones.listar().then((r) => setAsignaciones(r.data || [])).catch(() => {});
    api.empleados.listar().then((r) => setEmpleados(r.data || [])).catch(() => {});
  }, []);

  const filtradas = filtroEmpleado
    ? asignaciones.filter((a) => a.idUsuario_Empleado === filtroEmpleado)
    : asignaciones;

  const getStatusClass = (estado) => {
    if (estado === 'Completada') return 'status-success';
    if (estado === 'En Proceso') return 'status-pending';
    return 'status-pending';
  };

  return (
    <>
      <nav className="top-nav">
        <Link to="/dashboardadmin">VOLVER</Link>
      </nav>
      <header className="main-header">
        <div className="header-container">
          <div className="logo-principal-cell">
            <div className="logo-principal">
              <div className="logo-circle"><img src="../img/logo kimuka.png" alt="Logo" /></div>
              <h1>Tareas de Empleados</h1>
            </div>
          </div>
          <div className="header-actions-cell">
            <button className="btn-login">{adminName}</button>
          </div>
        </div>
      </header>

      <main className="content-wrapper">
        <section className="panel-gestion">
          <div className="filters-grid">
            <div className="filter-cell">
              <label>Filtrar por Empleado</label>
              <select value={filtroEmpleado} onChange={(e) => setFiltroEmpleado(e.target.value)}>
                <option value="">Todos</option>
                {empleados.map((emp) => (
                  <option key={emp.idUsuario} value={emp.idUsuario}>{emp.nombre}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="panel-gestion">
          <div className="table-container">
            <table className="kimukaPedidos-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Empleado</th>
                  <th>Material</th>
                  <th>Cantidad</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {filtradas.length === 0 ? (
                  <tr><td colSpan="6" className="text-center text-secondary">Sin asignaciones.</td></tr>
                ) : (
                  filtradas.map((a) => (
                    <tr key={a.idAsignacion}>
                      <td>{a.idAsignacion}</td>
                      <td>{a.nombreEmpleado}</td>
                      <td>{a.nombreInsumo}</td>
                      <td>{a.cantidad}</td>
                      <td>{a.fechaAsignacion}</td>
                      <td><span className={`status ${getStatusClass(a.estado)}`}>{a.estado}</span></td>
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

export default AdminTareasEmpleados;
