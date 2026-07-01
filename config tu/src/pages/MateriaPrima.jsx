import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

function MateriaPrima() {
  const [inventario, setInventario] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [adminName, setAdminName] = useState('ADMINISTRADOR');

  const [buscarNombre, setBuscarNombre] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [filtroCantidad, setFiltroCantidad] = useState('todos');

  const [formNombre, setFormNombre] = useState('');
  const [formCategoria, setFormCategoria] = useState('');
  const [formUnidad, setFormUnidad] = useState('');
  const [formCantidad, setFormCantidad] = useState('');
  const [stockAgregar, setStockAgregar] = useState({});

  useEffect(() => {
    const nombreSesion = localStorage.getItem('kimuka_sesion_activa');
    if (nombreSesion) setAdminName(nombreSesion.toUpperCase());

    api.insumos.listar()
      .then((res) => setInventario(res.data || []))
      .catch(() => {});

    api.categorias.listar()
      .then((res) => setCategorias(res.data || []))
      .catch(() => {});

    api.unidadesMedida.listar()
      .then((res) => setUnidades(res.data || []))
      .catch(() => {});
  }, []);

  const cargarInventario = () => {
    api.insumos.listar()
      .then((res) => setInventario(res.data || []))
      .catch(() => {});
  };

  const registrarMaterial = async (e) => {
    e.preventDefault();
    try {
      await api.insumos.crear({
        nombreInsumo: formNombre.trim(),
        idCategoria: formCategoria,
        idUnidad: formUnidad,
        cantidad: formCantidad || 0
      });

      alert(`¡Material ${formNombre} registrado con éxito!`);
      setFormNombre('');
      setFormCategoria('');
      setFormUnidad('');
      setFormCantidad('');
      setMostrarFormulario(false);
      cargarInventario();
    } catch (error) {
      alert(error.message || "Error al registrar el insumo.");
    }
  };

  const itemsFiltrados = inventario.filter(item => {
    const nombreSeguro = item.nombreInsumo ? item.nombreInsumo.toLowerCase() : '';
    const coincideNombre = buscarNombre === "" || nombreSeguro.includes(buscarNombre.toLowerCase());
    const coincideCat = filtroCategoria === "todos" || item.idCategoria === filtroCategoria;
    return coincideNombre && coincideCat;
  });

  return (
    <>
      <nav className="top-nav">
        <Link to="/dashboardadmin">VOLVER</Link>
      </nav>

      <header className="main-header">
        <div className="header-container">
          <div className="logo-principal-cell">
            <div className="logo-principal">
              <div className="logo-circle">
                <img src="../img/logo kimuka.png" alt="Logo" />
              </div>
              <h1>Kimuka - Materia Prima</h1>
            </div>
          </div>
          <div className="header-actions-cell">
            <button className="btn-login">{adminName}</button>
            <button className="btn-login" onClick={() => setMostrarFormulario(true)}>
              Añadir Insumo
            </button>
          </div>
        </div>
      </header>

      <main className="content-wrapper">
        <section className="panel-gestion">
          <div className="filters-grid">
            <div className="filter-cell">
              <label>Buscar por Nombre</label>
              <input type="text" placeholder="Escriba el nombre..." value={buscarNombre} onChange={(e) => setBuscarNombre(e.target.value.replace(/[0-9]/g, ''))} />
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

        {mostrarFormulario && (
          <section className="panel-gestion">
            <h3 className="margin-b-20">REGISTRAR INGRESO DE MATERIAL</h3>
            <form className="grid-form" onSubmit={registrarMaterial}>
              <div className="input-row">
                <div className="input-cell">
                  <label>NOMBRE DEL MATERIAL</label>
                  <input type="text" placeholder="Ej: Tela Algodón" value={formNombre} onChange={(e) => setFormNombre(e.target.value.replace(/[0-9]/g, ''))} required />
                </div>
                <div className="input-cell">
                  <label>CATEGORÍA</label>
                  <select value={formCategoria} onChange={(e) => setFormCategoria(e.target.value)} required>
                    <option value="">Seleccione</option>
                    {categorias.map((c) => (
                      <option key={c.idCategoria} value={c.idCategoria}>{c.nombreCategoria}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="input-group">
                <label>UNIDAD DE MEDIDA</label>
                <select value={formUnidad} onChange={(e) => setFormUnidad(e.target.value)} required>
                  <option value="">Seleccione</option>
                  {unidades.map((u) => (
                    <option key={u.idUnidad} value={u.idUnidad}>{u.nombreUnidad}</option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>CANTIDAD INICIAL</label>
                <input type="number" step="0.01" min="0" value={formCantidad} onChange={(e) => setFormCantidad(e.target.value)} placeholder="0" />
              </div>
              <div className="flex-row-gap-10 margin-t-20-end">
                <button type="button" className="btn-login" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
                <button type="submit" className="btn-submit">Registrar en Inventario</button>
              </div>
            </form>
          </section>
        )}

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
                <p className={`font-size-lg margin-t-10 ${item.cantidad > 0 ? 'text-primary' : 'status-fail'}`}>
                  {item.cantidad || 0}
                </p>
                <div className="flex-row-gap-10 margin-t-10" style={{ justifyContent: 'center' }}>
                  <input type="number" min="0" style={{ width: '80px', padding: '6px' }}
                    value={stockAgregar[item.idInsumo] || ''}
                    onChange={(e) => setStockAgregar({ ...stockAgregar, [item.idInsumo]: e.target.value })}
                    placeholder="+" />
                  <button className="btn-login" style={{ padding: '6px 12px' }}
                    onClick={async () => {
                      const cantidad = parseFloat(stockAgregar[item.idInsumo]);
                      if (!cantidad || cantidad <= 0) return;
                      try {
                        await api.insumos.actualizar(item.idInsumo, { cantidad: (item.cantidad || 0) + cantidad });
                        setStockAgregar({ ...stockAgregar, [item.idInsumo]: '' });
                        cargarInventario();
                      } catch (err) { alert(err.message); }
                    }}>Agregar</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}

export default MateriaPrima;
