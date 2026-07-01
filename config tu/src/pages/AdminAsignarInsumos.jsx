import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

function AdminAsignarInsumos() {
  const [empleados, setEmpleados] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [adminName, setAdminName] = useState('ADMINISTRADOR');
  const [form, setForm] = useState({ idUsuario_Empleado: '', idInsumo: '', cantidad: '' });
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const nombreSesion = localStorage.getItem('kimuka_sesion_activa');
    if (nombreSesion) setAdminName(nombreSesion.toUpperCase());

    api.empleados.listar().then((r) => setEmpleados(r.data || [])).catch(() => {});
    api.insumos.listar().then((r) => setInsumos(r.data || [])).catch(() => {});
    api.asignaciones.listar().then((r) => setAsignaciones(r.data || [])).catch(() => {});
  }, []);

  const insumoSeleccionado = insumos.find((i) => i.idInsumo === form.idInsumo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    try {
      await api.asignaciones.crear(form);
      setMensaje(`Asignación registrada: ${form.cantidad} unidades.`);
      setForm({ idUsuario_Empleado: '', idInsumo: '', cantidad: '' });
      api.insumos.listar().then((r) => setInsumos(r.data || [])).catch(() => {});
      api.asignaciones.listar().then((r) => setAsignaciones(r.data || [])).catch(() => {});
    } catch (err) {
      setMensaje(err.message || 'Error al asignar.');
    }
  };

  return (
    <>
      <nav className="top-nav">
        <Link to="/dashboardadmin">VOLVER</Link>
      </nav>
      <header className="main-header">
        <div className="header-container">
          <div className="logo-principal-cell">
            <div className="logo-principal">
              <div className="logo-circle"><img src="../img/logo kimuka.png" alt="Logo" /></div>
              <h1>Asignar Insumos</h1>
            </div>
          </div>
          <div className="header-actions-cell">
            <button className="btn-login">{adminName}</button>
          </div>
        </div>
      </header>

      <main className="content-wrapper">
        {mensaje && (
          <div style={{ background: '#1a1a1a', border: '1px solid #2d2d2d', padding: '15px', borderRadius: '10px', marginBottom: '20px', textAlign: 'center', color: mensaje.includes('Error') || mensaje.includes('insuficiente') ? '#e74c3c' : '#2ecc71' }}>
            {mensaje}
          </div>
        )}

        <div className="panel-registro">
          <section className="form-section-cell">
            <h2 className="form-title">Asignar Material a Empleado</h2>
            <form className="grid-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Empleado</label>
                <select value={form.idUsuario_Empleado} onChange={(e) => setForm({ ...form, idUsuario_Empleado: e.target.value })} required>
                  <option value="">Seleccione</option>
                  {empleados.map((emp) => (
                    <option key={emp.idUsuario} value={emp.idUsuario}>{emp.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>Insumo</label>
                <select value={form.idInsumo} onChange={(e) => setForm({ ...form, idInsumo: e.target.value })} required>
                  <option value="">Seleccione</option>
                  {insumos.map((i) => (
                    <option key={i.idInsumo} value={i.idInsumo}>
                      {i.nombreInsumo} (Stock: {i.cantidad} {i.nombreUnidad})
                    </option>
                  ))}
                </select>
              </div>
              {insumoSeleccionado && (
                <div className="input-group">
                  <label>Cantidad (Stock disponible: {insumoSeleccionado.cantidad} {insumoSeleccionado.nombreUnidad})</label>
                  <input type="number" step="0.01" min="0" max={insumoSeleccionado.cantidad} value={form.cantidad}
                    onChange={(e) => setForm({ ...form, cantidad: e.target.value })} placeholder="0" required />
                </div>
              )}
              <button type="submit" className="btn-submit w-100">Asignar Material</button>
            </form>
          </section>
          <section className="image-section-cell">
            <h2 className="avatar-preview-text">Stock Actual</h2>
            {insumos.length === 0 ? (
              <p className="text-secondary text-center">Sin insumos registrados.</p>
            ) : (
              insumos.slice(0, 6).map((i) => (
                <div key={i.idInsumo} style={{ background: '#1f1f1f', padding: '10px', borderRadius: '8px', marginBottom: '8px' }}>
                  <p className="font-size-sm text-secondary">{i.nombreInsumo}</p>
                  <p className={i.cantidad > 0 ? 'status-success' : 'status-fail'} style={{ padding: '2px 8px', borderRadius: '8px', display: 'inline-block' }}>
                    {i.cantidad} {i.nombreUnidad}
                  </p>
                </div>
              ))
            )}
          </section>
        </div>

        <section className="panel-gestion margin-t-20">
          <h3 className="margin-b-20">Historial de Asignaciones</h3>
          <div className="table-container">
            <table className="kimukaPedidos-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Empleado</th>
                  <th>Insumo</th>
                  <th>Cantidad</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {asignaciones.length === 0 ? (
                  <tr><td colSpan="6" className="text-center text-secondary">Sin asignaciones.</td></tr>
                ) : (
                  asignaciones.map((a) => (
                    <tr key={a.idAsignacion}>
                      <td>{a.idAsignacion}</td>
                      <td>{a.nombreEmpleado}</td>
                      <td>{a.nombreInsumo}</td>
                      <td>{a.cantidad}</td>
                      <td>{a.fechaAsignacion}</td>
                      <td><span className={`status ${a.estado === 'Completada' ? 'status-success' : a.estado === 'En Proceso' ? 'status-pending' : 'status-pending'}`}>{a.estado}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}

export default AdminAsignarInsumos;
