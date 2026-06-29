import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { api } from '../api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ReporteDePedidos() {
  const [adminName, setAdminName] = useState('ADMINISTRADOR');
  const [insumos, setInsumos] = useState([]);
  const [filtroMes, setFiltroMes] = useState('');
  const [filtroAnio, setFiltroAnio] = useState(new Date().getFullYear().toString());
  const [filtroInsumo, setFiltroInsumo] = useState('');

  const [datosGrafica, setDatosGrafica] = useState({
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'Consumo de Insumos',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: '#f39c12',
      }
    ]
  });

  const aniosDisponibles = [];
  const anioActual = new Date().getFullYear();
  for (let a = 2024; a <= anioActual; a++) {
    aniosDisponibles.push(a.toString());
  }

  const meses = [
    { value: '01', name: 'Enero' }, { value: '02', name: 'Febrero' },
    { value: '03', name: 'Marzo' }, { value: '04', name: 'Abril' },
    { value: '05', name: 'Mayo' }, { value: '06', name: 'Junio' },
    { value: '07', name: 'Julio' }, { value: '08', name: 'Agosto' },
    { value: '09', name: 'Septiembre' }, { value: '10', name: 'Octubre' },
    { value: '11', name: 'Noviembre' }, { value: '12', name: 'Diciembre' }
  ];

  useEffect(() => {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    const nombreSesion = localStorage.getItem('kimuka_sesion_activa');
    if (usuarioLogueado) {
      const user = JSON.parse(usuarioLogueado);
      if (user.nombre) setAdminName(user.nombre.toUpperCase());
    } else if (nombreSesion) {
      setAdminName(nombreSesion.toUpperCase());
    }

    api.insumos.listar()
      .then((res) => setInsumos(res.data || []))
      .catch(() => {});
  }, []);

  const handleFiltrarReporte = (e) => {
    e.preventDefault();
    const valoresAleatoriosConsumo = Array.from({ length: 12 }, () => Math.floor(Math.random() * 500) + 50);

    if (filtroMes) {
      const mesIndex = parseInt(filtroMes) - 1;
      meses.forEach((_, idx) => {
        if (idx !== mesIndex) valoresAleatoriosConsumo[idx] = 0;
      });
    }

    setDatosGrafica({
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [
        {
          label: `Métricas - Año ${filtroAnio}`,
          data: valoresAleatoriosConsumo,
          backgroundColor: '#f39c12',
          borderColor: '#e67e22',
          borderWidth: 1,
        }
      ]
    });
  };

  return (
    <div className="dark-theme">
      <nav className="top-nav">
        <Link to="/dashboardadmin" className="no-text-decor">VOLVER MENÚ</Link>
      </nav>

      <header className="main-header">
        <div className="header-container">
          <div className="logo-principal-cell">
            <div className="logo-principal">
              <div className="logo-circle">
                <img src="../img/logo kimuka.png" alt="Logo" />
              </div>
              <h1>Kimuka - Reporte De Pedidos</h1>
            </div>
          </div>
          <div className="header-actions-cell">
            <button className="btn-login">{adminName}</button>
            <button className="btn-login">
              <Link to="/cierre-admin" className="no-text-decor">Cerrar Sesión</Link>
            </button>
          </div>
        </div>
      </header>

      <main className="content-wrapper">
        <div className="img-principal">
          <img src="../img/panelDeReportes kk    .png" alt="Análisis Operativo" />
        </div>

        <div className="toolbar">
          <h2 className="table-title">Reporte de pedidos / Materiales</h2>
        </div>

        <div className="panel-gestion margin-b-20 panel-filtro-padding">
          <form className="grid-form form-reporte-grid" onSubmit={handleFiltrarReporte}>
            <div className="input-cell">
              <label>Seleccionar Año</label>
              <select value={filtroAnio} onChange={(e) => setFiltroAnio(e.target.value)}>
                {aniosDisponibles.map(anio => (
                  <option key={anio} value={anio}>{anio}</option>
                ))}
              </select>
            </div>
            <div className="input-cell">
              <label>Seleccionar Mes</label>
              <select value={filtroMes} onChange={(e) => setFiltroMes(e.target.value)}>
                <option value="">-- Todos --</option>
                {meses.map(m => (
                  <option key={m.value} value={m.value}>{m.name}</option>
                ))}
              </select>
            </div>
            <div className="input-cell">
              <label>Insumo</label>
              <select value={filtroInsumo} onChange={(e) => setFiltroInsumo(e.target.value)}>
                <option value="">-- Todos --</option>
                {insumos.map(ins => (
                  <option key={ins.idInsumo} value={ins.idInsumo}>{ins.nombreInsumo}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn-submit btn-reporte-submit">Generar Gráfica</button>
          </form>
        </div>

        <div className="panel-gestion contenedor-grafica-reporte">
          <h3 className="table-title text-center margin-b-20 titulo-color-alerta">Métricas de Consolidado</h3>
          <div className="wrapper-canvas-chart">
            <Bar
              data={datosGrafica}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#ffffff' } } },
                scales: {
                  x: { grid: { color: '#333333' }, ticks: { color: '#ffffff' } },
                  y: { grid: { color: '#333333' }, ticks: { color: '#ffffff' } }
                }
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ReporteDePedidos;
