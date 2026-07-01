import { Link } from 'react-router-dom'; 
import { useState, useEffect } from 'react';
import { api } from '../api';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function PanelReportes() {
    const [adminName, setAdminName] = useState('ADMINISTRADOR');
    const [insumos, setInsumos] = useState([]);
    const [filtroCategoria, setFiltroCategoria] = useState('todos');
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const nombreSesion = localStorage.getItem('kimuka_sesion_activa');
        if (nombreSesion) setAdminName(nombreSesion.toUpperCase());

        api.insumos.listar().then((r) => setInsumos(r.data || [])).catch(() => {});
        api.categorias.listar().then((r) => setCategorias(r.data || [])).catch(() => {});
    }, []);

    const filtrados = filtroCategoria === 'todos'
        ? insumos
        : insumos.filter((i) => i.idCategoria === filtroCategoria);

    const chartData = {
        labels: filtrados.map((i) => i.nombreInsumo),
        datasets: [{
            label: 'Stock Disponible',
            data: filtrados.map((i) => i.cantidad),
            backgroundColor: '#2ecc71',
            borderColor: '#27ae60',
            borderWidth: 1,
            borderRadius: 5
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { color: '#ffffff' } },
            title: { display: true, text: 'Inventario de Materiales', color: '#ffffff', font: { size: 16 } }
        },
        scales: {
            x: { ticks: { color: '#aaaaaa' }, grid: { color: '#2d2d2d' } },
            y: { ticks: { color: '#aaaaaa' }, grid: { color: '#2d2d2d' }, beginAtZero: true }
        }
    };

    const totalItems = insumos.length;
    const totalStock = insumos.reduce((sum, i) => sum + (i.cantidad || 0), 0);
    const sinStock = insumos.filter((i) => !i.cantidad || i.cantidad === 0).length;

    return (
        <div className="dark-theme">
            <nav className="top-nav">
                <Link to="/dashboardadmin">VOLVER</Link>
            </nav>

            <header className="main-header">
                <div className="header-container">
                    <div className="logo-principal-cell">
                        <div className="logo-principal">
                            <div className="logo-circle">
                                <img src="../img/logo kimuka.png" alt="Logo Kimuka" />
                            </div>
                            <h1>Reportes de Inventario</h1>
                        </div>
                    </div>
                    <div className="header-actions-cell">
                        <button className="btn-login">{adminName}</button>
                    </div>
                </div>
            </header>
            
            <main className="content-wrapper">
                <div className="text-center margin-b-40">
                    <h2 className="font-size-xl">Módulo de Estadísticas y Reportes</h2>
                    <p className="text-secondary">Inventario general de materiales del sistema Kimuka.</p>
                </div>

                <section className="panel-gestion">
                    <div className="stats-container">
                        <div className="stats-cell-left">
                            <div className="highlight-info">
                                <h4>Total Materiales</h4>
                                <p>{totalItems}</p>
                            </div>
                        </div>
                        <div className="stats-cell-right">
                            <div className="highlight-info">
                                <h4>Stock Total</h4>
                                <p>{totalStock.toFixed(2)}</p>
                            </div>
                            <div className="margin-t-15 text-secondary font-size-sm">
                                <p>Materiales sin stock: {sinStock}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="panel-gestion">
                    <div className="filters-grid margin-b-20">
                        <div className="filter-cell">
                            <label>Filtrar por Categoría</label>
                            <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
                                <option value="todos">Todas las categorías</option>
                                {categorias.map((c) => (
                                    <option key={c.idCategoria} value={c.idCategoria}>{c.nombreCategoria}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div style={{ height: '350px' }}>
                        {filtrados.length > 0 ? (
                            <Bar data={chartData} options={chartOptions} />
                        ) : (
                            <p className="text-secondary text-center">No hay datos para mostrar.</p>
                        )}
                    </div>
                </section>

                <section className="panel-gestion">
                    <h3 className="margin-b-20">Detalle del Inventario</h3>
                    <div className="table-container">
                        <table className="kimukaPedidos-table">
                            <thead>
                                <tr>
                                    <th>Material</th>
                                    <th>Categoría</th>
                                    <th>Unidad</th>
                                    <th>Stock</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {insumos.length === 0 ? (
                                    <tr><td colSpan="5" className="text-center text-secondary">Sin materiales registrados.</td></tr>
                                ) : (
                                    insumos.map((i) => (
                                        <tr key={i.idInsumo}>
                                            <td>{i.nombreInsumo}</td>
                                            <td>{i.nombreCategoria}</td>
                                            <td>{i.nombreUnidad}</td>
                                            <td>{i.cantidad}</td>
                                            <td>
                                                <span className={`status ${i.cantidad > 0 ? 'status-success' : 'status-fail'}`}>
                                                    {i.cantidad > 0 ? 'Disponible' : 'Sin stock'}
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

export default PanelReportes;
