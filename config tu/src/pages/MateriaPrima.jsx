import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '../api';

function MateriaPrima() {
  const porUnidades = ['moldes', 'marquillas', 'cremalleras'];

  const listaColores = [
    "Amarillo", "Azul", "Blanco", "Beige", "Café", "Gris", "Morado", 
    "Naranja", "Negro", "Oro", "Plata", "Rojo", "Rosado", "Verde"
  ];

  const [inventario, setInventario] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [adminName, setAdminName] = useState('ADMINISTRADOR');

  const [buscarNombre, setBuscarNombre] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [filtroCantidad, setFiltroCantidad] = useState('todos');

  const [formCategoria, setFormCategoria] = useState('');
  const [formNombre, setFormNombre] = useState('');
  const [formCantidad, setFormCantidad] = useState('');
  const [formColorBusqueda, setFormColorBusqueda] = useState('');
  const [formColorSeleccionado, setFormColorSeleccionado] = useState('');
  const [formImagenNombre, setFormImagenNombre] = useState('');

  useEffect(() => {
    const nombreSesion = localStorage.getItem('kimuka_sesion_activa');
    if (nombreSesion) {
        setAdminName(nombreSesion.toUpperCase());
    }
    
    cargarInventarioBackend();
  }, []);

  const cargarInventarioBackend = async () => {
    try {
      const data = await fetchData('/api/inventario');
      setInventario(data);
    } catch (error) {
      console.error("Error crítico de lectura en inventario:", error);
      alert("No se pudo sincronizar el stock operativo con el servidor backend.");
    }
  };

  const esUnidadForm = porUnidades.includes(formCategoria);
  const labelCantidadTexto = esUnidadForm ? "CANTIDAD (UNIDADES)" : "CANTIDAD (METROS)";
  const placeholderCantidad = esUnidadForm ? "Ej: 50" : "Ej: 15,5";
  const tipoUnidadForm = esUnidadForm ? "unidades" : "metros";

  const handleBuscarNombreChange = (e) => {
    const valor = e.target.value;
    if (valor.length <= 50) {
      setBuscarNombre(valor);
    }
  };

  const handleFormNombreChange = (e) => {
    const valor = e.target.value;
    if (valor.length <= 50) {
      setFormNombre(valor);
    }
  };

  const handleCantidadChange = (e) => {
    const valor = e.target.value;
    const limpio = valor.replace(/[^0-9,]/g, "");
    if (limpio.length <= 10) {
      setFormCantidad(limpio);
    }
  };

  const handleColorBusquedaChange = (e) => {
    const valor = e.target.value;
    const limpio = valor.replace(/[0-9]/g, "");
    if (limpio.length <= 30) {
      setFormColorBusqueda(limpio);
    }
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormImagenNombre(file.name);
    }
  };

  const coloresFiltrados = listaColores.filter((col) =>
    col.toLowerCase().includes(formColorBusqueda.toLowerCase())
  );

  const registrarMaterial = async (e) => {
    e.preventDefault();

    if (!formImagenNombre) {
      alert("Error: No se puede registrar un material sin imagen. Es obligatoria.");
      return;
    }

    if (!formColorSeleccionado) {
      alert("Error: Debe seleccionar un color de la lista filtrada.");
      return;
    }

    const unidad = porUnidades.includes(formCategoria) ? "unidades" : "metros";
    const imgSrc = `../img/${formImagenNombre}`;
    
    const cantidadNumerica = parseFloat(formCantidad.replace(',', '.'));

    const nuevoItem = {
      nombre: formNombre.trim(),
      cantidad: cantidadNumerica,
      unidad,
      categoria: formCategoria,
      referenciaColor: formColorSeleccionado,
      imagen: imgSrc
    };

    try {
      await fetchData('/api/inventario', {
        method: 'POST',
        body: JSON.stringify(nuevoItem)
      });

      alert(`¡Material ${nuevoItem.nombre} registrado con éxito en el stock de Kimuka!`);
      resetearFormulario();
      cargarInventarioBackend(); 

    } catch (error) {
      console.error("Error de persistencia (POST) en materia prima:", error);
      alert("Hubo un fallo al registrar el insumo. Verifica que el servidor esté activo en el puerto 5000.");
    }
  };

  const resetearFormulario = () => {
    setFormCategoria('');
    setFormNombre('');
    setFormCantidad('');
    setFormColorBusqueda('');
    setFormColorSeleccionado('');
    setFormImagenNombre('');
    setMostrarFormulario(false);
  };

  // --- 🌟 LÓGICA DE FILTRADO MULTIDIMENSIONAL CORREGIDA ---
  const itemsFiltrados = inventario.filter(item => {
    const nombreSeguro = item.nombre ? item.nombre.toLowerCase() : '';
    const coincideNombre = buscarNombre === "" || nombreSeguro.includes(buscarNombre.toLowerCase().trim());
    const coincideCat = filtroCategoria === "todos" || item.categoria === filtroCategoria;
    
    let coincideCant = true;
    if (filtroCantidad !== "todos") {
      // Corregido: de coindicateCant a coincideCant para que use la misma variable declarada arriba
      coincideCant = item.cantidad >= parseFloat(filtroCantidad);
    }

    return coincideNombre && coincideCat && coincideCant;
  });

  const tipoTop = porUnidades.includes(filtroCategoria) 
    ? "unidades" 
    : (filtroCategoria === "todos" ? "unidades/metros" : "metros");

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
            <button 
              className="btn-login" 
              onClick={() => setMostrarFormulario(true)}
            >
              Añadir Insumo
            </button>
          </div>
        </div>
      </header>

      <main className="content-wrapper">
        <section className="panel-gestion">
          <div className="filters-grid">
            <div className="filter-cell">
              <label htmlFor="input-busqueda">Buscar por Nombre</label>
              <input 
                type="text" 
                id="input-busqueda" 
                placeholder="Escriba el nombre..."
                value={buscarNombre}
                onChange={handleBuscarNombreChange}
                maxLength="50"
              />
            </div>
            <div className="filter-cell">
              <label htmlFor="filtro-categoria-top">Categoría</label>
              <select 
                id="filtro-categoria-top"
                value={filtroCategoria}
                onChange={(e) => {
                  setFiltroCategoria(e.target.value);
                  setFiltroCantidad('todos'); 
                }}
              >
                <option value="todos">Todas las categorías</option>
                <option value="telas">Telas / Metrajes</option>
                <option value="cauchos">Cauchos</option>
                <option value="cremalleras">Cremalleras</option>
                <option value="moldes">Moldes estructurales</option>
                <option value="marquillas">Marquillas</option>
              </select>
            </div>
            <div className="filter-cell">
              <label htmlFor="filtro-cantidad-top">Cantidad Mínima Stock</label>
              <select 
                id="filtro-cantidad-top"
                value={filtroCantidad}
                onChange={(e) => setFiltroCantidad(e.target.value)}
              >
                <option value="todos">Todos los stock</option>
                <option value="5">Más de 5 {tipoTop}</option>
                <option value="25">Más de 25 {tipoTop}</option>
                <option value="50">Más de 50 {tipoTop}</option>
              </select>
            </div>
          </div>
        </section>

        {mostrarFormulario && (
          <section className="panel-gestion" id="seccion-anadir-materiaPrima">
            <h3 className="margin-b-20">REGISTRAR INGRESO DE MATERIAL</h3>
            
            <form id="form-materia-prima" className="grid-form" onSubmit={registrarMaterial}>
              <div className="input-row">
                <div className="input-cell">
                  <label htmlFor="categoria-select">CATEGORÍA DE INVENTARIO</label>
                  <select 
                    id="categoria-select" 
                    required
                    value={formCategoria}
                    onChange={(e) => setFormCategoria(e.target.value)}
                  >
                    <option value="" disabled>Seleccione una categoría</option>
                    <optgroup label="Por Metros">
                      <option value="telas">Telas</option>
                      <option value="cauchos">Cauchos</option>
                    </optgroup>
                    <optgroup label="Por Unidades">
                      <option value="cremalleras">Cremalleras</option>
                      <option value="moldes">Moldes</option>
                      <option value="marquillas">Marquillas</option>
                    </optgroup>
                  </select>
                  
                  {formCategoria && (
                    <select className="filter-select margin-t-10" id="filtro-cantidad" defaultValue="todos">
                      <option value="todos">Todos</option>
                      <option value="5">Más de 5 {tipoUnidadForm}</option>
                      <option value="15">Más de 15 {tipoUnidadForm}</option>
                      <option value="30">Más de 30 {tipoUnidadForm}</option>
                    </select>
                  )}
                </div>

                <div className="input-cell">
                  <label htmlFor="nombre-material">NOMBRE DEL MATERIAL</label>
                  <input 
                    type="text" 
                    id="nombre-material" 
                    placeholder="Ej: Cremallera reforzada" 
                    required
                    value={formNombre}
                    onChange={handleFormNombreChange}
                    maxLength="50"
                  />
                </div>
              </div>

              <div className="input-row margin-t-15">
                <div className="input-cell">
                  <label id="label-cantidad" htmlFor="cantidad">{labelCantidadTexto}</label>
                  <input 
                    type="text" 
                    id="cantidad" 
                    placeholder={placeholderCantidad} 
                    required
                    value={formCantidad}
                    onChange={handleCantidadChange}
                    maxLength="10"
                  />
                </div>

                <div className="input-cell">
                  <label htmlFor="color-material">REFERENCIA / COLOR (No acepta números)</label>
                  <input 
                    type="text" 
                    id="color-material" 
                    placeholder="Escribe para filtrar color..."
                    value={formColorBusqueda}
                    onChange={handleColorBusquedaChange}
                    maxLength="30"
                  />
                  <div className="color-selector-box" style={{ marginTop: "5px", maxHeight: "100px", overflowY: "auto", border: "1px solid #555" }}>
                    {coloresFiltrados.map((col, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => { setFormColorSeleccionado(col); setFormColorBusqueda(col); }}
                        style={{ 
                          padding: "5px", 
                          cursor: "pointer", 
                          background: formColorSeleccionado === col ? "#333" : "transparent" 
                        }}
                      >
                        {col}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="input-group margin-t-15">
                <label htmlFor="imagen-material">IMAGEN DEL MATERIAL (Obligatoria)</label>
                <input 
                  type="file" 
                  id="imagen-material" 
                  accept="image/*" 
                  className="input-file"
                  onChange={handleImagenChange}
                  required
                />
                <small className="file-info">Formatos: PNG, JPG (Máx. 2MB)</small>
              </div>
              
              <div className="flex-row-gap-10 margin-t-20-end">
                <button type="button" className="btn-login" id="btn-cancelar" onClick={resetearFormulario}>
                  Cancelar
                </button>
                <button type="submit" className="btn-submit">Registrar en Inventario</button>
              </div>
            </form>
          </section>
        )}

        <div className="materia-prima-grid" id="contenedor-inventario">
          {itemsFiltrados.length === 0 ? (
            <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#888", padding: "20px" }}>
              No se encontraron materiales con los filtros seleccionados.
            </p>
          ) : (
            itemsFiltrados.map((item) => (
              <div key={item.id} className="card-materia-prima" data-categoria={item.categoria}>
                <h2>{item.nombre || 'Sin nombre'}</h2>
                <span className="badge-cantidad">{item.cantidad} {item.unidad}</span>
                <p style={{ fontSize: "0.85em", color: "#aaa", margin: "4px 0" }}>Ref: {item.referenciaColor}</p>
                <div className="image-wrapper-stock" style={{ marginTop: "10px" }}>
                  <img src={item.imagen} alt={item.nombre} style={{ width: "100%", borderRadius: "4px" }} />
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