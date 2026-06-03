import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

function AsignacionMaterial() {
  // Estado para controlar la lista de materiales en la tabla (Inicia con tu registro base)
  const [asignaciones, setAsignaciones] = useState([
    { id: 1, orden: '101', insumo: 'Cuero Sintético (#1)', cantidad: '5.00' }
  ]);

  // Manejador del envío del formulario (Añadir a la tabla)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Encontrar el texto legible del insumo seleccionado
    const nombresInsumos = {
      '1': 'Cuero Sintético (#1)',
      '2': 'Hilo de Poliéster (#2)',
      '3': 'Tinta Textil (#3)'
    };

    const nuevaAsignacion = {
      id: Date.now(), // ID único temporal
      orden: orden,
      insumo: nombresInsumos[insumo] || `Insumo (#${insumo})`,
      cantidad: parseFloat(cantidad).toFixed(2)
    };

    setAsignaciones([...asignaciones, nuevaAsignacion]);
    alert(`[Vincular Material]: Registrado con éxito. Se descontaron ${cantidad} unidades del stock.`);
    
    // Limpiar campos del formulario
    setOrden('');
    setInsumo('');
    setCantidad('');
  };

  // Función para remover un material de la tabla
  const handleRemover = (id) => {
    if (window.confirm("¿Está seguro de remover este material de la orden? El stock será reintegrado.")) {
      setAsignaciones(asignaciones.filter(item => item.id !== id));
      alert("[Remover]: Vínculo deshecho de forma exitosa.");
    }
  };

  return (
    <div className="dark-theme">
      <Nav />
      <Header />

      <main className="content-wrapper">
        
        {/* PANEL DE REGISTRO */}
        <div className="panel-registro">
          <div className="form-section-cell">
            <h2 className="form-title">Asignación de Material</h2>
            <p className="margin-b-25" style={{ color: 'var(--text-secondary)' }}>
              Vincula los insumos del inventario a una orden específica para asegurar que el operario tenga los recursos necesarios.
            </p>

            <form id="form-asignacion" className="grid-form" onSubmit={handleSubmit}>
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
                    <option value="101">Orden #101 - Producción Balones</option>
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
                    <option value="1">Cuero Sintético (Stock: 50)</option>
                    <option value="2">Hilo de Poliéster (Stock: 100)</option>
                    <option value="3">Tinta Textil (Stock: 30)</option>
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
                <div className="input-cell" style={{ verticalAlign: 'bottom' }}>
                  <button type="submit" className="btn-submit w-100">Vincular Material</button>
                </div>
              </div>
            </form>
          </div>

          {/* CUADRO DE ESTADO LATERAL */}
          <div className="image-section-cell">
            <div className="highlight-info">
              <h4>Asignaciones Activas</h4>
              {/* El contador ahora se actualiza automáticamente según el largo del arreglo */}
              <p id="total-asignado">{asignaciones.length}</p>
              <span className="status status-success display-inline-block margin-t-10">Trazabilidad Activa</span>
            </div>
          </div>
        </div>

        {/* TABLA DE GESTIÓN */}
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
                {asignaciones.map((item) => (
                  <tr key={item.id}>
                    <td>{item.orden}</td>
                    <td>{item.insumo}</td>
                    <td>{item.cantidad}</td>
                    <td className="text-right">
                      <button 
                        className="btn-danger-sm" 
                        onClick={() => handleRemover(item.id)}
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

      </main>

      <Footer />
    </div>
  );
}

export default AsignacionMaterial;