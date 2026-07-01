import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';

import VistaInicio from './pages/index';
import RegistroDePersonal from './pages/RegistroDePersonal';
import InicioDeSesion from './pages/InicioDeSesion';
import RecuperarContrasena from './pages/RecuperarContrasena';
import GestionDePedidos from './pages/GestionDePedidos';
import MateriaPrima from './pages/MateriaPrima';
import RegistroDeHoras from './pages/RegistroDeHoras';
import ReporteDePedidos from './pages/ReporteDePedidos';
import CierreDeSesionAdministrador from './pages/cierreDeSesionAdministrador';
import CierreDeSesionEmpleado from './pages/cierreDeSesionEmpleado';
import Editarempleados from './pages/Editarempleados';
import Aprobarpago from './pages/Aprobarpago';
import Dashboardadmin from './pages/Dashboardadmin';
import GestionEmpleados from './pages/GestionEmpleados';
import PanelReportes from './pages/Panelreportes';
import DashboardEmpleado from './pages/DashboardEmpleado';
import InventarioEmpleado from './pages/InventarioEmpleado';
import MisHoras from './pages/MisHoras';
import AdminHoras from './pages/AdminHoras';
import AdminPagos from './pages/AdminPagos';
import AdminAsignarInsumos from './pages/AdminAsignarInsumos';
import EmpleadoTareas from './pages/EmpleadoTareas';
import AdminTareasEmpleados from './pages/AdminTareasEmpleados';

const RutaProtegida = ({ children, rolRequerido }) => {
  const sesionActiva = localStorage.getItem('kimuka_sesion_activa') || localStorage.getItem('usuarioLogueado');
  if (!sesionActiva) {
    return <Navigate to="/login" replace />;
  }

  if (rolRequerido) {
    try {
      const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
      if (!usuario || usuario.idRol !== rolRequerido) {
        return <Navigate to="/login" replace />;
      }
    } catch {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Nav />

      <Routes>
        <Route path="/" element={<VistaInicio />} />
        <Route path="/login" element={<InicioDeSesion />} />
        <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />

        <Route path="/registro-personal" element={<RutaProtegida rolRequerido="ROL-001"><RegistroDePersonal /></RutaProtegida>} />
        <Route path="/materia-prima" element={<RutaProtegida rolRequerido="ROL-001"><MateriaPrima /></RutaProtegida>} />
        <Route path="/gestion-pedidos" element={<RutaProtegida rolRequerido="ROL-001"><GestionDePedidos /></RutaProtegida>} />
        <Route path="/reporte-pedidos" element={<RutaProtegida rolRequerido="ROL-001"><ReporteDePedidos /></RutaProtegida>} />
        <Route path="/registro-horas" element={<RutaProtegida><RegistroDeHoras /></RutaProtegida>} />

        <Route path='/dashboardadmin' element={<RutaProtegida rolRequerido="ROL-001"><Dashboardadmin /></RutaProtegida>} />
        <Route path='/empleados' element={<RutaProtegida rolRequerido="ROL-001"><GestionEmpleados /></RutaProtegida>} />
        <Route path='/reportes' element={<RutaProtegida rolRequerido="ROL-001"><PanelReportes /></RutaProtegida>} />
        <Route path='/editarempleados/:id' element={<RutaProtegida rolRequerido="ROL-001"><Editarempleados /></RutaProtegida>} />
        <Route path='/aprobarpago' element={<RutaProtegida rolRequerido="ROL-001"><Aprobarpago /></RutaProtegida>} />
        <Route path='/admin-horas' element={<RutaProtegida rolRequerido="ROL-001"><AdminHoras /></RutaProtegida>} />
        <Route path='/admin-pagos' element={<RutaProtegida rolRequerido="ROL-001"><AdminPagos /></RutaProtegida>} />
        <Route path='/admin-asignar-insumos' element={<RutaProtegida rolRequerido="ROL-001"><AdminAsignarInsumos /></RutaProtegida>} />
        <Route path='/admin-tareas-empleados' element={<RutaProtegida rolRequerido="ROL-001"><AdminTareasEmpleados /></RutaProtegida>} />

        <Route path='/dashboard-empleado' element={<RutaProtegida rolRequerido="ROL-002"><DashboardEmpleado /></RutaProtegida>} />
        <Route path='/inventario-empleado' element={<RutaProtegida rolRequerido="ROL-002"><InventarioEmpleado /></RutaProtegida>} />
        <Route path='/mis-horas' element={<RutaProtegida rolRequerido="ROL-002"><MisHoras /></RutaProtegida>} />
        <Route path='/mis-tareas' element={<RutaProtegida rolRequerido="ROL-002"><EmpleadoTareas /></RutaProtegida>} />
        <Route path='/inventario-empleado' element={<RutaProtegida rolRequerido="ROL-002"><InventarioEmpleado /></RutaProtegida>} />
        <Route path='/mis-horas' element={<RutaProtegida rolRequerido="ROL-002"><MisHoras /></RutaProtegida>} />

        <Route path="/cierre-admin" element={<CierreDeSesionAdministrador />} />
        <Route path="/cierre-empleado" element={<CierreDeSesionEmpleado />} />

        <Route path="*" element={
          <main className="content-wrapper text-center">
            <h2>404 - Página no encontrada</h2>
            <p className="text-secondary">La ruta solicitada no existe.</p>
            <a href="/" className="btn-login">Volver al inicio</a>
          </main>
        } />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
