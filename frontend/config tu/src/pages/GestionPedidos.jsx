import React, { useState } from 'react';
import Nav from '../components/Nav';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/styles.css';

function GestionPedidos() {
  // ==========================================
  // ESTADOS DE CONTROL (TABS Y PANTALLAS)
  // ==========================================
  const [tabActiva, setTabActiva] = useState('lista');
  const [mostrarExitoEdicion, setMostrarExitoEdicion] = useState(false);
  const [mostrarExitoCancelar, setMostrarExitoCancelar] = useState(false);

  // ==========================================
  // ESTADO DE LOS DATOS DEL FORMULARIO
  // ==========================================
  const [formData, setFormData] = useState({
    cliente: 'Jimena martinez',
    correo: 'jimenamartinez@gmail.com',
    id: '770123890',
    fechaPedido: '30/02/2025',
    fechaEntrega: '10/10/2025'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ==========================================
  // FUNCIONES DE FLUJO Y NAVEGACIÓN
  // ==========================================
  const irAVista = (vista) => {
    setTabActiva(vista);
    if (vista === 'detalle') setMostrarExitoEdicion(false);
    if (vista === 'cancelar') setMostrarExitoCancelar(false);
  };

  const seleccionarPedido = (cliente, correo, id, fPedido, fEntrega) => {
    setFormData({
      cliente: cliente,
      correo: correo,
      id: id,
      fechaPedido: fPedido,
      fechaEntrega: fEntrega
    });
    irAVista('detalle');
  };

  const procesarActualizacion = (e) => {
    e.preventDefault();
    setMostrarExitoEdicion(true);
  };

  const procesarCancelacion = () => {
    setMostrarExitoCancelar(true);
  };

  return (
    <div className="dark-theme">
      <Nav />
      <Header />

      <main className="content-wrapper">
        
        <div className="toolbar">
          <h2 className="table-title">Gestión de pedidos/clientes</h2>
        </div>

        {/* BOTONERA DE PESTAÑAS */}
        <div className="tabs-container">
          <button 
            className={`tab-btn ${tabActiva === 'lista' ? 'active' : ''}`} 
            onClick={() => irAVista('lista')}
          >
            Lista de Pedidos
          </button>
          <button 
            className={`tab-btn ${tabActiva === 'detalle' ? 'active' : ''}`} 
            onClick={() => irAVista('detalle')}
          >
            Detalle y Edición
          </button>
          <button 
            className={`tab-btn ${tabActiva === 'cancelar' ? 'active' : ''}`} 
            onClick={() => irAVista('cancelar')}
          >
            Cancelación
          </button>
        </div>

        {/* ==========================================
            VISTA 1: LISTA GENERAL DE PEDIDOS
           ========================================== */}
        {tabActiva === 'lista' && (
          <div className="pedido-view-content active">
            <section className="panel-gestion-pedidos">
              <div className="filter-bar">
                <select className="filter-select">
                  <option value="todos">Filtrar</option>
                </select>
                <div className="search-container">
                  <input type="text" placeholder="Buscar empleado" />
                </div>
              </div>
              <section className='panel-gestion'>
                <h3 className="margin-b-20">Gestion Pedidos </h3>
                <div className="table-container">
                  <table className="kimukaPedidos-table">
                    <thead>
                      <tr>
                        <th>Cliente</th>
                        <th>Correo electrónico</th>
                        <th>ID</th>
                        <th>Fecha del pedido</th>
                        <th>Fecha de entrega</th>
                        <th>Entregado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr 
                        className="clickable-row" 
                        onClick={() => seleccionarPedido('Jimena martinez', 'jimenamartinez@gmail.com', '770123890', '30/02/2025', '30/02/2025')}
                      >
                        <td>Jimena martinez</td>
                        <td>jimenamartinez@gmail.com</td>
                        <td>770123890</td>
                        <td>30/02/2025</td>
                        <td>30/02/2025</td>
                        <td><span className="icon-status success"></span></td>
                      </tr>
                      <tr 
                        className="clickable-row"
                        onClick={() => seleccionarPedido('Juan garcía', 'juangarcia156@gmail.com', '487912526', '12/04/2025', '20/04/2025')}
                      >
                        <td>Juan garcía</td>
                        <td>juangarcia156@gmail.com</td>
                        <td>487912526</td>
                        <td>12/04/2025</td>
                        <td>20/04/2025</td>
                        <td><span className="icon-status danger"></span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </section>
          </div>
        )}

        {/* ==========================================
            VISTA 2: DETALLE Y EDICIÓN DE DATOS
           ========================================== */}
        {tabActiva === 'detalle' && (
          <div className="pedido-view-content active">
            {!mostrarExitoEdicion ? (
              <section className="split-layout-pedido">
                <div className="pedido-form-panel">
                  <form onSubmit={procesarActualizacion}>
                    <div className="form-grid-row">
                      <label htmlFor="cliente">Cliente:</label>
                      <input 
                        type="text" 
                        id="cliente" 
                        name="cliente" 
                        value={formData.cliente} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="form-grid-row">
                      <label htmlFor="correo">Correo electrónico:</label>
                      <input 
                        type="email" 
                        id="correo" 
                        name="correo" 
                        value={formData.correo} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="form-grid-row">
                      <label htmlFor="id">ID:</label>
                      <input 
                        type="text" 
                        id="id" 
                        name="id" 
                        value={formData.id} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="form-grid-row">
                      <label htmlFor="fechaPedido">Fecha del pedido:</label>
                      <input 
                        type="text" 
                        id="fechaPedido" 
                        name="fechaPedido" 
                        value={formData.fechaPedido} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="form-grid-row">
                      <label htmlFor="fechaEntrega">Fecha de entrega:</label>
                      <input 
                        type="text" 
                        id="fechaEntrega" 
                        name="fechaEntrega" 
                        value={formData.fechaEntrega} 
                        onChange={handleInputChange} 
                      />
                    </div>

                    <div className="actions-group-pedidos">
                      <button type="button" className="btn-pedidos-nav" onClick={() => irAVista('lista')}>
                        Historial de pedidos
                      </button>
                      <button type="submit" className="btn-pedidos-action">
                        Actualizar datos
                      </button>
                      <button type="button" className="btn-pedidos-cancel" onClick={() => irAVista('cancelar')}>
                        Cancelar pedido
                      </button>
                    </div>
                  </form>
                </div>

                <div className="pedido-visual-panel">
                  <span className="visual-title">producto</span>
                  <div className="product-avatar-frame">
                    <div className="avatar-circle-placeholder"></div>
                  </div>
                </div>
              </section>
            ) : (
              <div className="success-overlay-message text-center-msg">
                <h2 className="success-title">¡Pedido Actualizado correctamente!</h2>
                <button className="btn-return-home" onClick={() => irAVista('lista')}>
                  Regresar a la lista
                </button>
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            VISTA 3: PANTALLA DE CANCELACIÓN
           ========================================== */}
        {tabActiva === 'cancelar' && (
          <div className="pedido-view-content active">
            {!mostrarExitoCancelar ? (
              <section className="split-layout-pedido">
                <div className="pedido-visual-panel">
                  <span className="visual-title">producto</span>
                  <div className="product-avatar-frame">
                    <div className="avatar-circle-placeholder"></div>
                  </div>
                </div>

                <div className="pedido-form-panel flex-center-content">
                  <h2 className="question-title">¿Deseas cancelar el pedido?</h2>
                  <p className="product-desc-text">Sudadera gym manga siza - hombre</p>
                  
                  <div className="confirm-buttons-row">
                    <button className="btn-confirm-yes" onClick={procesarCancelacion}>Si</button>
                    <button className="btn-confirm-no" onClick={() => irAVista('detalle')}>No</button>
                  </div>
                </div>
              </section>
            ) : (
              <div className="success-overlay-message text-center-msg">
                <h2 className="success-title">!Pedido cancelado exitosamente¡</h2>
                <button className="btn-return-home" onClick={() => irAVista('lista')}>
                  Regresar a inicio
                </button>
              </div>
            )}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

export default GestionPedidos;