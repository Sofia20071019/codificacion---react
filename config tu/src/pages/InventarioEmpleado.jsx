import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

function InventarioEmpleado() {
  const [inventario, setInventario] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [empleadoName, setEmpleadoName] = useState('EMPLEADO');

  const [buscarNombre, setBuscarNombre] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('todos');

  useEffect(() => {
    const nombreSesion = localStorage.getItem('kimuka_sesion_activa');
    if (nombreSesion) setEmpleadoName(nombreSesion.toUpperCase());

    api.insumos.listar()
      .then((res) => setInventario(res.data || []))
      .catch(() => {});

    api.categorias.listar()
      .then((res) => setCategorias(res.data || []))
      .catch(() => {});
  }, []);

  const itemsFiltrados = inventario.filter(item => {
    const nombreSeguro = item.nombreInsumo ? item.nombreInsumo.toLowerCase() : '';
    const coincideNombre = buscarNombre === "" || nombreSeguro.includes(buscarNombre.toLowerCase());
    const coincideCat = filtroCategoria === "todos" || item.idCategoria === filtroCategoria;
    return coincideNombre && coincideCat;
  });

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
              <h1>Kimuka - Inventario</h1>
            </div>
          </div>
          <div className="header-actions-cell">
            <button className="btn-login">{empleadoName}</button>
          </div>
        </div>
      </header>

      <main className="content-wrapper">
        <section className="panel-gestion">
          <div className="filters-grid">
            <div className="filter-cell">
              <label>Buscar por Nombre</label>
              <input type="text" placeholder="Escriba el nombre..." value={buscarNombre} onChange={(e) => setBuscarNombre(e.target.value)} />
            </div>
            <div className="filter-cell">
              <label>Categoría</label>
              <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
                <option value="todos">Todas las categorías</option>
                {categorias.map((c) => (
                  <option key={c.idCategoria} value={c.idCategoria}>{c.nombreCategoria}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <div className="materia-prima-grid">
          {itemsFiltrados.length === 0 ? (
            <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#888", padding: "20px" }}>
              No se encontraron materiales.
            </p>
          ) : (
            itemsFiltrados.map((item) => (
              <div key={item.idInsumo} className="card-materia-prima">
                <h2>{item.nombreInsumo || 'Sin nombre'}</h2>
                <p className="text-secondary">{item.nombreCategoria}</p>
                <p className="text-muted font-size-sm">{item.nombreUnidad}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}

export default InventarioEmpleado;
