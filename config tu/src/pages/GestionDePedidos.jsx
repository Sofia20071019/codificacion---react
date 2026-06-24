import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function GestionDePedidos() {
  // --- 1. ESTADO PARA MOSTRAR / OCULTAR EL FORMULARIO ---
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // --- 2. ESTADOS PARA LOS CAMPOS DEL FORMULARIO ---
  const [cliente, setCliente] = useState('');
  const [correo, setCorreo] = useState('');
  const [idPedido, setIdPedido] = useState('');
  const [fecha, setFecha] = useState('');
  const [estado, setEstado] = useState('..'); 

  // Estado adicional para saber si el input de ID debe bloquearse (cuando editamos)
  const [esEdicion, setEsEdicion] = useState(false);

  // --- 3. ESTADOS PARA FILTROS Y BUSCADOR ---
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');

  // --- 4. ESTADO PARA LA LISTA DE PEDIDOS ---
  const [listaPedidos, setListaPedidos] = useState([]);

  // --- 5. CARGA INICIAL: TRAER LOS PEDIDOS DEL SIMULADOR BACKEND (GET) ---
  useEffect(() => {
    cargarPedidosBackend();
  }, []);

  const cargarPedidosBackend = () => {
    fetch('http://localhost:5000/pedidos')
      .then(respuesta => {
        if (!respuesta.ok) {
          throw new Error('Error al obtener la lista de pedidos de la base de datos');
        }
        return respuesta.json();
      })
      .then(data => {
        setListaPedidos(data);
      })
      .catch(error => {
        console.error("Error crítico de lectura en pedidos:", error);
        alert("No se pudo sincronizar el libro de pedidos con el servidor backend.");
      });
  };

  // --- 6. CONTROLADOR DE GUARDAR / ACTUALIZAR PEDIDO (POST / PUT) ---
  const handleSubmit = (e) => {
    e.preventDefault();

    const pedidoIdEstandar = idPedido.trim().toUpperCase();

    // Objeto base para enviar al backend estructurado según tu db.json
    // Nota: Si tus registros existentes usan propiedades adicionales como 'mes', 'material', 'cantidad' o 'comprador',
    // puedes agregarlas o mapearlas aquí para no perder la consistencia del esquema.
    const datosPedido = {
      id: pedidoIdEstandar,
      cliente: cliente.trim(),
      correo: correo.trim(),
      fecha: fecha,
      estado: estado
    };

    // Determinamos la URL y el método HTTP según el flujo operativo
    const url = esEdicion 
      ? `http://localhost:5000/pedidos/${pedidoIdEstandar}` 
      : 'http://localhost:5000/pedidos';
      
    const metodo = esEdicion ? 'PUT' : 'POST';

    fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosPedido)
    })
      .then(respuesta => {
        if (!respuesta.ok) {
          throw new Error(`Error al procesar la solicitud del pedido con método ${metodo}`);
        }
        return respuesta.json();
      })
      .then(() => {
        alert(esEdicion ? 'Pedido actualizado con éxito en el servidor.' : 'Pedido registrado en el libro operativo.');
        limpiarFormulario();
        cargarPedidosBackend(); // Refrescamos la tabla consultando el estado vivo del servidor
      })
      .catch(error => {
        console.error(`Error de persistencia (${metodo}) en pedidos:`, error);
        alert("Hubo un error al sincronizar la orden. Verifique la conexión con el puerto 5000.");
      });
  };

  // --- 7. ACCIÓN PARA CARGAR UN PEDIDO EN EL FORMULARIO PARA ACTUALIZAR ---
  const handleCargarEdicion = (pedido) => {
    setCliente(pedido.cliente || '');
    setCorreo(pedido.correo || '');
    setIdPedido(pedido.id);
    setFecha(pedido.fecha || '');
    setEstado(pedido.estado || '..');
    setEsEdicion(true); // Marcamos que estamos editando
    setMostrarFormulario(true); // Abrimos el formulario automáticamente
  };

  const limpiarFormulario = () => {
    setCliente('');
    setCorreo('');
    setIdPedido('');
    setFecha('');
    setEstado('..');
    setEsEdicion(false);
    setMostrarFormulario(false);
  };

  // --- 8. LÓGICA DE FILTRADO Y BÚSQUEDA ---
  const pedidosFiltrados = listaPedidos.filter((pedido) => {
    const idSeguro = pedido.id ? pedido.id.toLowerCase() : '';
    const coincideId = idSeguro.includes(busqueda.toLowerCase());
    
    let coincideEstado = true;
    if (filtroEstado === 'entregado') coincideEstado = pedido.estado === '✔';
    if (filtroEstado === 'proceso') coincideEstado = pedido.estado === '..';
    if (filtroEstado === 'cancelado') coincideEstado = pedido.estado === '✖';

    return coincideId && coincideEstado;
  });

  return (
    <>
      <nav className="top-nav">
        <Link to="/">VOLVER </Link>
      </nav>

      <header className="main-header">
        <div className="header-container">
          <div className="logo-principal-cell">
            <div className="logo-principal">
              <div className="logo-circle">
                <img src="../img/logo kimuka.png" alt="Logo" />
              </div>
              <h1>Kimuka - Panel Operativo</h1>
            </div>
          </div>
          <div className="header-actions-cell">
            <button 
              className="btn-login" 
              id="btn-mostrar-form"
              onClick={() => {
                if (mostrarFormulario) {
                  limpiarFormulario();
                } else {
                  setMostrarFormulario(true);
                }
              }}
            >
              {mostrarFormulario ? "Ocultar Formulario" : "Nuevo Pedido"}
            </button>
          </div>
        </div>
      </header>

      <main className="content-wrapper">
        {/* PANEL DE BÚSQUEDA Y FILTROS */}
        <section className="panel-gestion">
          <div className="filters-grid">
            <div className="filter-cell">
              <label htmlFor="input-busqueda">Buscador Operativo</label>
              <input 
                type="text" 
                id="input-busqueda" 
                placeholder="Buscar por ID de Orden..." 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <div className="filter-cell">
              <label htmlFor="filtro-estado">Estado de la Orden</label>
              <select 
                id="filtro-estado"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="todos">Todos los Estados</option>
                <option value="entregado">Entregados (✔)</option>
                <option value="proceso">En proceso (..)</option>
                <option value="cancelado">Cancelado (✖)</option>
              </select>
            </div>
          </div>
        </section>

        {/* FORMULARIO DINÁMICO DE CREACIÓN / EDICIÓN */}
        {mostrarFormulario && (
          <section className="panel-gestion" id="seccion-anadir-pedido">
            <h3>{esEdicion ? `Actualizar Pedido: ${idPedido}` : "Nuevo Pedido - Titan Sports"}</h3>
            <form id="form-nuevo-pedido" className="grid-form margin-t-15" onSubmit={handleSubmit}>
              <div className="input-row">
                <div className="input-cell">
                  <label htmlFor="nuevo-cliente">Nombre del Cliente</label>
                  <input 
                    type="text" 
                    id="nuevo-cliente" 
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                    required 
                  />
                </div>
                <div className="input-cell">
                  <label htmlFor="nuevo-correo">Correo Electrónico</label>
                  <input 
                    type="email" 
                    id="nuevo-correo" 
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <div className="input-row">
                <div className="input-cell">
                  <label htmlFor="nuevo-id">Identificador del Pedido (ID)</label>
                  <input 
                    type="text" 
                    id="nuevo-id" 
                    placeholder="Ej: TITAN-01"
                    value={idPedido}
                    onChange={(e) => setIdPedido(e.target.value)}
                    readOnly={esEdicion} // Si es edición, bloqueamos el ID para evitar inconsistencias
                    style={esEdicion ? { backgroundColor: '#e9ecef', cursor: 'not-allowed' } : {}}
                    required 
                  />
                </div>
                <div className="input-cell">
                  <label htmlFor="nueva-fecha">Fecha de Recepción</label>
                  <input 
                    type="date" 
                    id="nueva-fecha" 
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="nuevo-estado">Estado del Pedido</label>
                <select 
                  id="nuevo-estado" 
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  required
                >
                  <option value="..">En proceso (..)</option>
                  <option value="✔">Entregado (✔)</option>
                  <option value="✖">Cancelado (✖)</option>
                </select>
              </div>
              <div className="flex-row-gap-10 margin-t-15">
                <button 
                  type="button" 
                  className="btn-login" 
                  id="btn-cancelar-pedido"
                  onClick={limpiarFormulario}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-submit">
                  {esEdicion ? "Actualizar Pedido" : "Guardar Pedido"}
                </button>
              </div>
            </form>
          </section>
        )}

        {/* TABLA DINÁMICA DE PEDIDOS */}
        <section className="table-container">
          <table className="kimukaPedidos-table" id="tabla-pedidos">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Correo</th>
                <th>Pedido ID</th>
                <th>F. Solicitud</th>
                <th>Estado</th>
                <th>Acción</th> 
              </tr>
            </thead>
            <tbody id="cuerpo-tabla-pedidos">
              {pedidosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '15px' }}>
                    No se encontraron pedidos registrados.
                  </td>
                </tr>
              ) : (
                pedidosFiltrados.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>{pedido.cliente || 'N/A'}</td>
                    <td>{pedido.correo || 'N/A'}</td>
                    <td style={{ fontWeight: 'bold' }}>{pedido.id}</td>
                    <td>{pedido.fecha || 'N/A'}</td>
                    <td>
                      <span className={`status-badge state-${pedido.estado === '✔' ? 'entregado' : pedido.estado === '..' ? 'proceso' : 'cancelado'}`}>
                        {pedido.estado === '✔' ? 'Entregado (✔)' : pedido.estado === '..' ? 'En proceso (..)' : 'Cancelado (✖)'}
                      </span>
                    </td>
                    <td>
                      <button 
                        type="button"
                        className="btn-submit" 
                        style={{ padding: '5px 12px', fontSize: '14px', margin: '0' }}
                        onClick={() => handleCargarEdicion(pedido)}
                      >
                        Actualizar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

export default GestionDePedidos;