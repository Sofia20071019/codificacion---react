import React, { useState } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import '../styles/styles.css';

import Produccion from '../img/registroPedidokk.png';

function GestionProduccion() {
  // ==========================================
  // ESTADO PARA CONTROLAR LA PESTAÑA ACTIVA
  // ==========================================
  const [tabActiva, setTabActiva] = useState('ordenes');

  // ==========================================
  // ESTADOS DEL INVENTARIO Y ASIGNACIONES
  // ==========================================
  
  // 1. CORREGIDO: El inventario ahora está declarado aquí arriba correctamente
  const [inventarioInsumos, setInventarioInsumos] = useState([
    { id: "1", nombre: "Cuero Sintético", stock: 50 },
    { id: "2", nombre: "Hilo de Poliéster", stock: 100 },
    { id: "3", nombre: "Tinta Textil", stock: 30 }
  ]);

  const [asignacionesMateriales, setAsignacionesMateriales] = useState([
    { id: 1, orden: '101', insumo: 'Cuero Sintético (#1)', idInsumoOriginal: '1', cantidad: '5.00' }
  ]);

  const [asignacionesOrdenes, setAsignacionesOrdenes] = useState([
    { idProduccion: '101', operario: 'Juan Pérez', fechaAsignacion: '02/06/2026 08:00', cantidadAsignada: '150', estado: 'Asignada' },
    { idProduccion: '102', operario: 'María Gómez', fechaAsignacion: '02/06/2026 09:30', cantidadAsignada: '250', estado: 'Pendiente' }
  ]);

  const [formDataOrden, setFormDataOrden] = useState({
    idProduccion: '',
    idUsuario: '',
    fechaAsignacion: '',
    cantidadAsignada: ''
  });

  const [orden, setOrden] = useState('');
  const [insumo, setInsumo] = useState('');
  const [cantidad, setCantidad] = useState('');

  // ==========================================
  // MANEJADORES: ASIGNACIÓN ORDEN
  // ==========================================
  const handleChangeOrden = (e) => {
    const { name, value } = e.target;
    setFormDataOrden({ ...formDataOrden, [name]: value });
  };

  const handleSubmitOrden = (e) => {
    e.preventDefault();

    const nombresOperarios = {
      '1': 'Juan Pérez',
      '2': 'María Gómez',
      '3': 'Carlos López'
    };

    const fechaFormateada = formDataOrden.fechaAsignacion.replace('T', ' ');

    const nuevaOrden = {
      idProduccion: formDataOrden.idProduccion,
      operario: nombresOperarios[formDataOrden.idUsuario] || 'Desconocido',
      fechaAsignacion: fechaFormateada,
      cantidadAsignada: formDataOrden.cantidadAsignada,
      estado: 'Asignada'
    };

    const existe = asignacionesOrdenes.some(o => String(o.idProduccion) === String(formDataOrden.idProduccion));
    if (existe) {
      alert(`[KIMUKA]: El ID de producción #${formDataOrden.idProduccion} ya existe.`);
      return;
    }

    setAsignacionesOrdenes([...asignacionesOrdenes, nuevaOrden]);
    alert(`[KIMUKA]: Procesando asignación de la orden #${formDataOrden.idProduccion}`);
    
    setFormDataOrden({
      idProduccion: '',
      idUsuario: '',
      fechaAsignacion: '',
      cantidadAsignada: ''
    });
  };

  // ==========================================
  // MANEJADORES: ASIGNACIÓN MATERIAL (CORREGIDOS)
  // ==========================================
  const handleSubmitMaterial = (e) => {
    e.preventDefault();

    const cantidadNumerica = parseFloat(cantidad);
    const insumoSeleccionado = inventarioInsumos.find(i => i.id === insumo);

    if (!insumoSeleccionado) return;

    // Validar stock disponible antes de restar
    if (insumoSeleccionado.stock < cantidadNumerica) {
      alert(`[KIMUKA]: No hay suficiente stock disponible de ${insumoSeleccionado.nombre}. (Disponible: ${insumoSeleccionado.stock})`);
      return;
    }

    // Restar del stock
    setInventarioInsumos(prevInsumos =>
      prevInsumos.map(i => i.id === insumo ? { ...i, stock: i.stock - cantidadNumerica } : i)
    );

    const nuevaAsignacion = {
      id: Date.now(),
      orden: orden,
      insumo: `${insumoSeleccionado.nombre} (#${insumoSeleccionado.id})`,
      idInsumoOriginal: insumo, // Necesario para devolver el stock al remover
      cantidad: cantidadNumerica.toFixed(2)
    };

    setAsignacionesMateriales([...asignacionesMateriales, nuevaAsignacion]);
    alert(`[Vincular Material]: Registrado con éxito. Se descontaron ${cantidad} unidades del stock.`);
    
    setOrden('');
    setInsumo('');
    setCantidad('');
  };

  const handleRemoverMaterial = (id) => {
    if (window.confirm("¿Está seguro de remover este material de la orden? El stock será reintegrado.")) {
      const asignacionAEliminar = asignacionesMateriales.find(item => item.id === id);
      
      if (asignacionAEliminar) {
        // Reintegrar al stock
        setInventarioInsumos(prevInsumos =>
          prevInsumos.map(i =>
            i.id === asignacionAEliminar.idInsumoOriginal 
              ? { ...i, stock: i.stock + parseFloat(asignacionAEliminar.cantidad) } 
              : i
          )
        );
      }

      setAsignacionesMateriales(asignacionesMateriales.filter(item => item.id !== id));
      alert("[Remover]: Vínculo deshecho de forma exitosa.");
    }
  };

  return (
    <div className="dark-theme">
      <Nav />
      <Header />

      <main className="content-wrapper">
        
        <div className="toolbar">
          <h2 className="table-title">Módulo de Gestión de Producción</h2>
          
          <div className="tabs-container">
            <button 
              className={`btn-submit ${tabActiva === 'ordenes' ? '' : 'btn-warning'}`} 
              onClick={() => setTabActiva('ordenes')}
            >
              Asignación de Órdenes
            </button>
            <button 
              className={`btn-submit ${tabActiva === 'materiales' ? '' : 'btn-warning'}`}
              onClick={() => setTabActiva('materiales')}
            >
              Asignación de Materiales
            </button>
          </div>
        </div>

        {/* VISTA A: ASIGNACIÓN DE ÓRDENES */}
        {tabActiva === 'ordenes' && (
          <>
            <section className="panel-registro">
              <div className="form-section-cell">
                <h3 className="form-title">Asignar Operario</h3>
                
                <form onSubmit={handleSubmitOrden}>
                  <div className="input-group">
                    <label htmlFor="idProduccion">ID Producción</label>
                    <input
                      type="number"
                      id="idProduccion"
                      name="idProduccion"
                      placeholder="Ingrese el ID de producción"
                      value={formDataOrden.idProduccion}
                      onChange={handleChangeOrden}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="idUsuario">Operario</label>
                    <select
                      id="idUsuario"
                      name="idUsuario"
                      value={formDataOrden.idUsuario}
                      onChange={handleChangeOrden}
                      required
                    >
                      <option value="">Seleccione un operario</option>
                      <option value="1">Juan Pérez</option>
                      <option value="2">María Gómez</option>
                      <option value="3">Carlos López</option>
                    </select>
                  </div>

                  <div className="input-row">
                    <div className="input-cell">
                      <label htmlFor="fechaAsignacion">Fecha de Asignación</label>
                      <input
                        type="datetime-local"
                        id="fechaAsignacion"
                        name="fechaAsignacion"
                        value={formDataOrden.fechaAsignacion}
                        onChange={handleChangeOrden}
                        min={new Date().toISOString().slice(0,16)}
                        required
                      />
                    </div>
                    
                    <div className="input-cell">
                      <label htmlFor="cantidadAsignada">Cantidad Asignada</label>
                      <input
                        type="number"
                        step="0.01"
                        id="cantidadAsignada"
                        name="cantidadAsignada"
                        placeholder="Cantidad"
                        value={formDataOrden.cantidadAsignada}
                        onChange={handleChangeOrden}
                        required
                      />
                    </div>
                  </div>

                  <div className="actions-row">
                    <button type="submit" className="btn-submit">Asignar</button>
                    <button type="button" className="btn-warning">Modificar</button>
                    <button type="button" className="btn-danger">Eliminar</button>
                  </div>
                </form>
              </div>

              <div className="image-section-cell">
                <div className="portrait-wrapper">
                  <img src={Produccion} alt="Registro de pedido" className="portrait-image" />
                </div>
                <p className="text-center">
                  Gestión de asignación de órdenes a operarios.
                </p>
              </div>
            </section>

            <section className="panel-gestion">
              <h3 className="margin-b-20">Asignaciones Registradas</h3>
              <div className="table-container">
                <table className="kimukaPedidos-table">
                  <thead>
                    <tr>
                      <th>ID Production</th>
                      <th>Operario</th>
                      <th>Fecha Asignación</th>
                      <th>Cantidad</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {asignacionesOrdenes.map((ordenItem, index) => (
                      <tr key={ordenItem.idProduccion || index}>
                        <td>{ordenItem.idProduccion || '102'}</td>
                        <td>{ordenItem.operario}</td>
                        <td>{ordenItem.fechaAsignacion}</td>
                        <td>{ordenItem.cantidadAsignada}</td>
                        <td>
                          <span className={`status ${ordenItem.estado === 'Asignada' ? 'status-success' : 'status-pending'}`}>
                            {ordenItem.estado || 'Pendiente'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {/* VISTA B: ASIGNACIÓN DE MATERIALES */}
        {tabActiva === 'materiales' && (
          <>
            <div className="panel-registro">
              <div className="form-section-cell">
                <h2 className="form-title">Asignación de Material</h2>
                <p className="margin-b-25">
                  Vincula los insumos del inventario a una orden específica para asegurar que el operario tenga los recursos necesarios.
                </p>

                <form id="form-asignacion" className="grid-form" onSubmit={handleSubmitMaterial}>
                  <div className="input-row">
                    <div className="input-cell">
                      <label htmlFor="id_orden">ID Orden (FK)</label>
                      <select 
                        id="id_orden" 
                        value={orden} 
                        onChange={(e) => setOrden(e.target.value)} 
                        required
                      >
                        <option value="">Seleccione una orden...</option>
                        <option value="101">Orden #101 - Production Balones</option>
                        <option value="102">Orden #102 - Camisetas Titán</option>
                      </select>
                    </div>
                    
                    <div className="input-cell">
                      <label htmlFor="idInsumo">ID Insumo (FK)</label>
                      <select 
                        id="idInsumo" 
                        value={insumo} 
                        onChange={(e) => setInsumo(e.target.value)} 
                        required
                      >
                        <option value="">Seleccione un insumo...</option>
                        {inventarioInsumos.map((insumoItem) => (
                          <option 
                            key={insumoItem.id} 
                            value={insumoItem.id}
                            disabled={insumoItem.stock <= 0}
                          >
                            {insumoItem.nombre} (Stock: {insumoItem.stock})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="input-row">
                    <div className="input-cell">
                      <label htmlFor="cantidadAsignada">Cantidad Asignada (FLOAT)</label>
                      <input 
                        type="number" 
                        id="cantidadAsignada" 
                        step="0.01" 
                        min="0.01" 
                        placeholder="Ej. 12.50" 
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        required 
                      />
                    </div>
                    
                    <div className="input-cell">
                      <button type="submit" className="btn-submit w-100">Vincular Material</button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="image-section-cell">
                <div className="highlight-info">
                  <h4>Asignaciones Activas</h4>
                  <p id="total-assigned">{asignacionesMateriales.length}</p>
                  <span className="status status-success display-inline-block margin-t-10">Trazabilidad Activa</span>
                </div>
              </div>
            </div>

            <div className="panel-gestion margin-t-15">
              <h3 className="table-title margin-b-15">Materiales Asignados Actuales</h3>
              <div className="table-container">
                <table className="kimukaPedidos-table">
                  <thead>
                    <tr>
                      <th>ID Orden</th>
                      <th>Insumo (ID)</th>
                      <th>Cantidad Asignada</th>
                      <th className="text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {asignacionesMateriales.map((item) => (
                      <tr key={item.id}>
                        <td>{item.orden}</td>
                        <td>{item.insumo}</td>
                        <td>{item.cantidad}</td>
                        <td className="text-right">
                          <button 
                            className="btn-danger-sm" 
                            onClick={() => handleRemoverMaterial(item.id)}
                          >
                            Remover
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default GestionProduccion;