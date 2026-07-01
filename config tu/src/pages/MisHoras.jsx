import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

function MisHoras() {
  const [jornadas, setJornadas] = useState([]);
  const [calculo, setCalculo] = useState(null);
  const [empleadoName, setEmpleadoName] = useState('EMPLEADO');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const nombreSesion = localStorage.getItem('kimuka_sesion_activa');
    if (nombreSesion) setEmpleadoName(nombreSesion.toUpperCase());

    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado) {
      const user = JSON.parse(usuarioLogueado);

      Promise.all([
        api.jornadas.porEmpleado(user.idUsuario),
        api.jornadas.calcularPago(user.idUsuario)
      ])
        .then(([resJornadas, resPago]) => {
          setJornadas(resJornadas.data?.jornadas || []);
          setCalculo(resPago.data);
        })
        .catch(() => {})
        .finally(() => setCargando(false));
    } else {
      setCargando(false);
    }
  }, []);

  const formatearHora = (hora) => {
    if (!hora) return '---';
    return hora.substring(0, 5);
  };

  const calcularDuracion = (hInicio, hFin) => {
    if (!hInicio || !hFin) return '---';
    const [h1, m1] = hInicio.split(':').map(Number);
    const [h2, m2] = hFin.split(':').map(Number);
    let minutosInicio = h1 * 60 + m1;
    let minutosFin = h2 * 60 + m2;
    if (minutosFin < minutosInicio) minutosFin += 1440;
    const diffMin = minutosFin - minutosInicio;
    const horas = Math.floor(diffMin / 60);
    const mins = diffMin % 60;
    return `${horas}h ${mins}m`;
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
              <div className="logo-circle">
                <img src="../img/logo kimuka.png" alt="Logo" />
              </div>
              <h1>Kimuka - Mis Horas</h1>
            </div>
          </div>
          <div className="header-actions-cell">
            <button className="btn-login">{empleadoName}</button>
          </div>
        </div>
      </header>

      <main className="content-wrapper">
        {calculo && (
          <section className="panel-gestion">
            <div className="stats-container">
              <div className="stats-cell-left">
                <div className="highlight-info">
                  <h4>Total Horas Trabajadas</h4>
                  <p>{calculo.horasTotales} hrs</p>
                </div>
              </div>
              <div className="stats-cell-right">
                <div className="highlight-info">
                  <h4>Pago Proyectado</h4>
                  <p>$ {Number(calculo.pagoTotal).toLocaleString('es-CO')}</p>
                </div>
                <div className="margin-t-15 text-secondary font-size-sm">
                  <p>Tarifa por hora: $ {Number(calculo.tarifaPorHora).toLocaleString('es-CO')}</p>
                  <p>Jornadas completadas: {calculo.totalJornadas}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="panel-gestion">
          <h3 className="margin-b-20">Historial de Jornadas</h3>
          {cargando ? (
            <p className="text-secondary">Cargando...</p>
          ) : jornadas.length === 0 ? (
            <p className="text-secondary text-center">No hay jornadas registradas.</p>
          ) : (
            <div className="table-container">
              <table className="kimukaPedidos-table">
                <thead>
                  <tr>
                    <th>ID Jornada</th>
                    <th>Fecha</th>
                    <th>Entrada</th>
                    <th>Salida</th>
                    <th>Duración</th>
                  </tr>
                </thead>
                <tbody>
                  {jornadas.map((j) => (
                    <tr key={j.idJornada}>
                      <td>{j.idJornada}</td>
                      <td>{j.fecha}</td>
                      <td>{formatearHora(j.hInicio)}</td>
                      <td>{formatearHora(j.hFin)}</td>
                      <td>{calcularDuracion(j.hInicio, j.hFin)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default MisHoras;
