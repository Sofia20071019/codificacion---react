import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MateriaPrima() {
  const porUnidades = ['moldes', 'marquillas', 'cremalleras'];

  // --- ESTADOS DE LA INTERFAZ ---
  const [inventario, setInventario] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // --- ESTADOS DE LOS FILTROS (BARRAS SUPERIORES) ---
  const [buscarNombre, setBuscarNombre] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [filtroCantidad, setFiltroCantidad] = useState('todos');

  // --- ESTADOS DEL FORMULARIO DE REGISTRO ---
  const [formCategoria, setFormCategoria] = useState('');
  const [formNombre, setFormNombre] = useState('');
  const [formCantidad, setFormCantidad] = useState('');
  const [formColor, setFormColor] = useState('');
  const [formImagen, setFormImagen] = useState(null);

  // --- 1. CARGAR INVENTARIO INICIAL ---
  useEffect(() => {
    const datosLocales = JSON.parse(localStorage.getItem('inventarioKimuka')) || [];
    setInventario(datosLocales);
  }, []);

  // --- 2. CONTROL DINÁMICO DE TEXTOS EN EL FORMULARIO ---
  const esUnidadForm = porUnidades.includes(formCategoria);
  const labelCantidadTexto = esUnidadForm ? "CANTIDAD (UNIDADES)" : "CANTIDAD (METROS)";
  const placeholderCantidad = esUnidadForm ? "Ej: 50" : "Ej: 15.5";
  const tipoUnidadForm = esUnidadForm ? "unidades" : "metros";

  // --- 3. PROCESAR IMAGEN A BASE64 ---
  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormImagen(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- 4. ENVIAR FORMULARIO (REGISTRAR) ---
  const registrarMaterial = (e) => {
    e.preventDefault();

    const unidad = porUnidades.includes(formCategoria) ? "unidades" : "metros";
    const referenciaColor = formColor.trim() || 'Ej: Negro Mate';
    const imgSrc = formImagen || "../img/default.png";

    const nuevoItem = {
      id: 'INS-' + Date.now(),
      nombre: formNombre.trim(),
      cantidad: parseFloat(formCantidad),
      unidad,
      categoria: formCategoria,
      referenciaColor,
      imagen: imgSrc
    };

    // Actualizar estado y LocalStorage
    const nuevoInventario = [...inventario, nuevoItem];
    setInventario(nuevoInventario);
    localStorage.setItem('inventarioKimuka', JSON.stringify(nuevoInventario));

    alert(`¡Material ${formNombre} registrado con éxito en el stock!`);
    
    // Resetear formulario y cerrar
    resetearFormulario();
  };

  const resetearFormulario = () => {
    setFormCategoria('');
    setFormNombre('');
    setFormCantidad('');
    setFormColor('');
    setFormImagen(null);
    setMostrarFormulario(false);
  };

  // --- 5. LÓGICA DE FILTRADO MULTIDIMENSIONAL ---
  const itemsFiltrados = inventario.filter(item => {
    const coincideNombre = buscarNombre === "" || item.nombre.toLowerCase().includes(buscarNombre.toLowerCase().trim());
    const coincideCat = filtroCategoria === "todos" || item.categoria === filtroCategoria;
    
    let coincideCant = true;
    if (filtroCantidad !== "todos") {
      coincideCant = item.cantidad >= parseFloat(filtroCantidad);
    }

    return coincideNombre && coincideCat && coincideCant;
  });

  // Determinar sufijo dinámico para el filtro de cantidad de la barra superior
  const tipoTop = porUnidades.includes(filtroCategoria) 
    ? "unidades" 
    : (filtroCategoria === "todos" ? "unidades/metros" : "metros");


  return (
    <>
      {/* class cambia a className en React */}
      <nav className="top-nav">
        <Link to="/index.html">VOLVER PRINCIPAL</Link>
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
        {/* BARRA DE BÚSQUEDA Y FILTROS */}
        <section className="panel-gestion">
          <div className="filters-grid">
            <div className="filter-cell">
              <label htmlFor="input-busqueda">Buscar por Nombre</label>
              <input 
                type="text" 
                id="input-busqueda" 
                placeholder="Escriba el nombre..."
                value={buscarNombre}
                onChange={(e) => setBuscarNombre(e.target.value)}
              />
            </div>
            <div className="filter-cell">
              <label htmlFor="filtro-categoria-top">Categoría</label>
              <select 
                id="filtro-categoria-top"
                value={filtroCategoria}
                onChange={(e) => {
                  setFiltroCategoria(e.target.value);
                  setFiltroCantidad('todos'); // Resetea el stock al cambiar categoría
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

        {/* SECCIÓN FORMULARIO (Renderizado condicional en vez de usar style.display) */}
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
                  
                  {/* Selector interno dinámico del formulario */}
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
                    onChange={(e) => setFormNombre(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-row margin-t-15">
                <div className="input-cell">
                  <label id="label-cantidad" htmlFor="cantidad">{labelCantidadTexto}</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    id="cantidad" 
                    placeholder={placeholderCantidad} 
                    required
                    value={formCantidad}
                    onChange={(e) => setFormCantidad(e.target.value)}
                  />
                </div>

                <div className="input-cell">
                  <label htmlFor="color-material">REFERENCIA / COLOR</label>
                  <input 
                    type="text" 
                    id="color-material" 
                    placeholder="Ej: Negro Mate"
                    value={formColor}
                    onChange={(e) => setFormColor(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group margin-t-15">
                <label htmlFor="imagen-material">IMAGEN DEL MATERIAL</label>
                <input 
                  type="file" 
                  id="imagen-material" 
                  accept="image/*" 
                  className="input-file"
                  onChange={handleImagenChange}
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

        {/* CONTENEDOR DE INVENTARIO (GRID) */}
        <div className="materia-prima-grid" id="contenedor-inventario">
          {itemsFiltrados.length === 0 ? (
            <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#888", padding: "20px" }}>
              No se encontraron materiales con los filtros seleccionados.
            </p>
          ) : (
            itemsFiltrados.map((item) => (
              <div key={item.id} className="card-materia-prima" data-categoria={item.categoria}>
                <h2>{item.nombre}</h2>
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