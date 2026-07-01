import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

function AdminHoras() {
  const [empleados, setEmpleados] = useState([]);
  const [jornadas, setJornadas] = useState([]);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState('');
  const [calculo, setCalculo] = useState(null);
  const [adminName, setAdminName] = useState('ADMINISTRADOR');

  useEffect(() => {
    const nombreSesion = localStorage.getItem('kimuka_sesion_activa');
    if (nombreSesion) setAdminName(nombreSesion.toUpperCase());

    api.empleados.listar()
      .then((res) => setEmpleados(res.data || []))
      .catch(() => {});

    api.jornadas.listar()
      .then((res) => setJornadas(res.data || []))
      .catch(() => {});
  }, []);

  const handleSeleccionarEmpleado = (e) => {
    const id = e.target.value;
    setEmpleadoSeleccionado(id);
    if (id) {
      api.jornadas.calcularPago(id)
        .then((res) => setCalculo(res.data))
        .catch(() => setCalculo(null));
    } else {
      setCalculo(null);
    }
  };

  const jornadasFiltradas = empleadoSeleccionado
    ? jornadas.filter((j) => j.idUsuario_Empleado === empleadoSeleccionado)
    : jornadas;

  const getStatusClass = (hFin) => {
    return hFin ? 'status-success' : 'status-pending';
  };

  const getStatusText = (hFin) => {
    return hFin ? 'Completada' : 'En curso';
  };

  return (
    <div className="dark-theme">
      <nav className="top-nav">
        <Link to="/dashboardadmin" className="no-text-decor">VOLVER</Link>
      </nav>

      <header className="main-header">
        <div className="header-container">
          <div className="logo-principal-cell">
            <div className="logo-principal">
              <div className="logo-circle">
                <img src="../img/logo kimuka.png" alt="Logo Kimuka" />
              </div>
              <h1>Kimuka - Horas Empleados</h1>
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
              <select value={empleadoSeleccionado} onChange={handleSeleccionarEmpleado}>
                <option value="">Todos los empleados</option>
                {empleados.map((emp) => (
                  <option key={emp.idUsuario} value={emp.idUsuario}>{emp.nombre}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {calculo && (
          <section className="panel-gestion">
            <div className="stats-container">
              <div className="stats-cell-left">
                <div className="highlight-info">
                  <h4>Total Horas</h4>
                  <p>{calculo.horasTotales} hrs</p>
                </div>
              </div>
              <div className="stats-cell-right">
                <div className="highlight-info">
                  <h4>Total a Pagar</h4>
                  <p>$ {Number(calculo.pagoTotal).toLocaleString('es-CO')}</p>
                </div>
                <div className="margin-t-15 text-secondary font-size-sm">
                  <p>Tarifa por hora: $ {Number(calculo.tarifaPorHora).toLocaleString('es-CO')}</p>
                  <p>Jornadas: {calculo.totalJornadas}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="panel-gestion">
          <h3 className="table-title margin-b-25">
            {empleadoSeleccionado ? 'Jornadas del Empleado' : 'Todas las Jornadas'}
          </h3>
          <div className="table-container">
            <table className="kimukaPedidos-table">
              <thead>
                <tr>
                  <th>ID Jornada</th>
                  <th>Empleado</th>
                  <th>Fecha</th>
                  <th>Entrada</th>
                  <th>Salida</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {jornadasFiltradas.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-secondary">No hay jornadas registradas.</td>
                  </tr>
                ) : (
                  jornadasFiltradas.map((j) => (
                    <tr key={j.idJornada}>
                      <td>{j.idJornada}</td>
                      <td>{j.nombreEmpleado}</td>
                      <td>{j.fecha}</td>
                      <td>{j.hInicio ? j.hInicio.substring(0, 5) : '---'}</td>
                      <td>{j.hFin ? j.hFin.substring(0, 5) : '---'}</td>
                      <td>
                        <span className={`status ${getStatusClass(j.hFin)}`}>
                          {getStatusText(j.hFin)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminHoras;
