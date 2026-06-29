import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

function GestionDePedidos() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [idCliente, setIdCliente] = useState('');
  const [fecha, setFecha] = useState('');
  const [estado, setEstado] = useState('..');
  const [esEdicion, setEsEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [listaPedidos, setListaPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (!usuarioLogueado) return;
    const user = JSON.parse(usuarioLogueado);

    api.ordenes.listar()
      .then((res) => setListaPedidos(res.data || []))
      .catch(() => {});

    api.clientes.listar()
      .then((res) => setClientes(res.data || []))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (esEdicion) {
        await api.ordenes.actualizar(idEditando, { estadoProd: estado });
        alert('Pedido actualizado con éxito.');
      } else {
        const usuarioLogueado = localStorage.getItem('usuarioLogueado');
        const user = JSON.parse(usuarioLogueado);
        await api.ordenes.crear({
          idCliente,
          idUsuario_Admin: user.idUsuario,
          fechaPedido: fecha,
          estadoProd: estado,
        });
        alert('Pedido registrado con éxito.');
      }
      limpiarFormulario();
      api.ordenes.listar().then((res) => setListaPedidos(res.data || [])).catch(() => {});
    } catch (error) {
      alert(error.message || 'Error al procesar el pedido.');
    }
  };

  const handleCargarEdicion = (pedido) => {
    setIdCliente(pedido.idCliente);
    setFecha(pedido.fechaPedido || '');
    setEstado(pedido.estadoProd || '..');
    setIdEditando(pedido.idOrden);
    setEsEdicion(true);
    setMostrarFormulario(true);
  };

  const limpiarFormulario = () => {
    setIdCliente('');
    setFecha('');
    setEstado('..');
    setIdEditando('');
    setEsEdicion(false);
    setMostrarFormulario(false);
  };

  const pedidosFiltrados = listaPedidos.filter((pedido) => {
    const idSeguro = pedido.idOrden ? pedido.idOrden.toLowerCase() : '';
    const coincideId = idSeguro.includes(busqueda.toLowerCase());
    let coincideEstado = true;
    if (filtroEstado === 'entregado') coincideEstado = pedido.estadoProd === '✔';
    if (filtroEstado === 'proceso') coincideEstado = pedido.estadoProd === '..';
    if (filtroEstado === 'cancelado') coincideEstado = pedido.estadoProd === '✖';
    return coincideId && coincideEstado;
  });

  return (
    <>
      <nav className="top-nav">
        <Link to="/">VOLVER</Link>
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
            <button className="btn-login" onClick={() => mostrarFormulario ? limpiarFormulario() : setMostrarFormulario(true)}>
              {mostrarFormulario ? "Ocultar Formulario" : "Nuevo Pedido"}
            </button>
          </div>
        </div>
      </header>

      <main className="content-wrapper">
        <section className="panel-gestion">
          <div className="filters-grid">
            <div className="filter-cell">
              <label>Buscador Operativo</label>
              <input type="text" placeholder="Buscar por ID de Orden..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
            </div>
            <div className="filter-cell">
              <label>Estado de la Orden</label>
              <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
                <option value="todos">Todos los Estados</option>
                <option value="entregado">Entregados (✔)</option>
                <option value="proceso">En proceso (..)</option>
                <option value="cancelado">Cancelado (✖)</option>
              </select>
            </div>
          </div>
        </section>

        {mostrarFormulario && (
          <section className="panel-gestion">
            <h3>{esEdicion ? `Actualizar Pedido: ${idEditando}` : "Nuevo Pedido"}</h3>
            <form className="grid-form margin-t-15" onSubmit={handleSubmit}>
              {!esEdicion && (
                <div className="input-group">
                  <label>Cliente</label>
                  <select value={idCliente} onChange={(e) => setIdCliente(e.target.value)} required>
                    <option value="">Seleccione un cliente</option>
                    {clientes.map((c) => (
                      <option key={c.idCliente} value={c.idCliente}>{c.nombreCliente}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="input-group">
                <label>Fecha</label>
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
              </div>
              <div className="input-group">
                <label>Estado</label>
                <select value={estado} onChange={(e) => setEstado(e.target.value)} required>
                  <option value="..">En proceso (..)</option>
                  <option value="✔">Entregado (✔)</option>
                  <option value="✖">Cancelado (✖)</option>
                </select>
              </div>
              <div className="flex-row-gap-10 margin-t-15">
                <button type="button" className="btn-login" onClick={limpiarFormulario}>Cancelar</button>
                <button type="submit" className="btn-submit">{esEdicion ? "Actualizar Pedido" : "Guardar Pedido"}</button>
              </div>
            </form>
          </section>
        )}

        <section className="table-container">
          <table className="kimukaPedidos-table">
            <thead>
              <tr>
                <th>ID Orden</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {pedidosFiltrados.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '15px' }}>No se encontraron pedidos.</td></tr>
              ) : (
                pedidosFiltrados.map((pedido) => (
                  <tr key={pedido.idOrden}>
                    <td style={{ fontWeight: 'bold' }}>{pedido.idOrden}</td>
                    <td>{pedido.nombreCliente || 'N/A'}</td>
                    <td>{pedido.fechaPedido || 'N/A'}</td>
                    <td>
                      <span className={`status-badge state-${pedido.estadoProd === '✔' ? 'entregado' : pedido.estadoProd === '..' ? 'proceso' : 'cancelado'}`}>
                        {pedido.estadoProd === '✔' ? 'Entregado (✔)' : pedido.estadoProd === '..' ? 'En proceso (..)' : 'Cancelado (✖)'}
                      </span>
                    </td>
                    <td>
                      <button type="button" className="btn-submit" style={{ padding: '5px 12px', fontSize: '14px', margin: '0' }}
                        onClick={() => handleCargarEdicion(pedido)}>
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
