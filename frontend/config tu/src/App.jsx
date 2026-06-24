import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VistaEmpleado from './pages/vistaEmpleado';
import GestionPedidos from './pages/GestionPedidos';
import GestionProduccion from './pages/GestionProduccion';
import ReporteInventario from './pages/reporteInventario';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VistaEmpleado />} />
        <Route path="/GestionPedidos" element={<GestionPedidos />} />
        <Route path="/GestionProduccion" element={<GestionProduccion />} />
        <Route path="/ReporteInventario" element={<ReporteInventario />} />
      </Routes>
    </Router>
  );
}

export default App;