import React, { useState } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Produccion from '../assets/registroPedidokk.png';
import '../styles/styles.css';

function AsignacionOrden() {
  // ... tu código de estado y funciones se queda igual ...
  const [formData, setFormData] = useState({
    idProduccion: '',
    idUsuario: '',
    fechaAsignacion: '',
    cantidadAsignada: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos de asignación enviados:', formData);
    alert(`[KIMUKA]: Procesando asignación de la orden #${formData.idProduccion}`);
  };

  return (
    <div className="dark-theme">
      {/* Reutilización de tus componentes estructurales core */}
      <Nav />
      {/* ¡Nota! También deberías corregir la imagen del logo en Header.jsx, ver abajo */}
      <Header />

      {/* Contenido principal */}
      <main className="content-wrapper">
        <div className="toolbar">
          <h2 className="table-title">Asignación de Orden de Producción</h2>
        </div>

        {/* Formulario (RF 008) */}
        <section className="panel-registro">
          <div className="form-section-cell">
            <h3 className="form-title">Asignar Operario</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="idProduccion">ID Producción</label>
                <input
                  type="number"
                  id="idProduccion"
                  name="idProduccion"
                  placeholder="Ingrese el ID de producción"
                  value={formData.idProduccion}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="idUsuario">Operario</label>
                <select
                  id="idUsuario"
                  name="idUsuario"
                  value={formData.idUsuario}
                  onChange={handleChange}
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
                    value={formData.fechaAsignacion}
                    onChange={handleChange}
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
                    value={formData.cantidadAsignada}
                    onChange={handleChange}
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
              <img src={Produccion} alt="Producción" />
            </div>
            <p className="text-center">
              Gestión de asignación de órdenes a operarios.
            </p>
          </div>
        </section>

        {/* ... resto de tu tabla de asignaciones ... */}
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
                <tr>
                  <td>101</td>
                  <td>Juan Pérez</td>
                  <td>02/06/2026 08:00</td>
                  <td>150</td>
                  <td>
                    <span className="status status-success">Asignada</span>
                  </td>
                </tr>
                <tr>
                  <td>102</td>
                  <td>María Gómez</td>
                  <td>02/06/2026 09:30</td>
                  <td>250</td>
                  <td>
                    <span className="status status-pending">Pendiente</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AsignacionOrden;