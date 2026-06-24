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

// Nombres de archivos corregidos para que coincidan con el sistema de carpetas
import CierreDeSesionAdministrador from './pages/cierreDeSesionAdministrador';
import CierreDeSesionEmpleado from './pages/cierreDeSesionEmpleado';

/* IMPORTACIONES JHON HERNANDEZ CORREGIDAS */
import Editarempleados from './pages/Editarempleados';
import Aprobarpago from './pages/Aprobarpago';
import Dashboardadmin from './pages/Dashboardadmin';
import GestionEmpleados from './pages/GestionEmpleados';
import PanelReportes from './pages/Panelreportes';

//  COMPONENTE DE PROTECCIÓN DE RUTAS
// Si no hay sesión iniciada, redirige al login de inmediato
const RutaProtegida = ({ children }) => {
  const sesionActiva = localStorage.getItem('kimuka_sesion_activa') || localStorage.getItem('usuarioLogueado');
  
  if (!sesionActiva) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Nav />
      
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<VistaInicio />} />
        <Route path="/login" element={<InicioDeSesion />} />
        <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
        
        {/* Rutas Protegidas (Requieren haber iniciado sesión) */}
        <Route path="/registro-personal" element={<RutaProtegida><RegistroDePersonal /></RutaProtegida>} />
        <Route path="/materia-prima" element={<RutaProtegida><MateriaPrima /></RutaProtegida>} />
        <Route path="/gestion-pedidos" element={<RutaProtegida><GestionDePedidos /></RutaProtegida>} />
        <Route path="/reporte-pedidos" element={<RutaProtegida><ReporteDePedidos /></RutaProtegida>} />
        <Route path="/registro-horas" element={<RutaProtegida><RegistroDeHoras /></RutaProtegida>} />
        
        {/* Módulos Administrativos Protegidos */}
        <Route path='/dashboardadmin' element={<RutaProtegida><Dashboardadmin/></RutaProtegida>}/>
        <Route path='/empleados' element={<RutaProtegida><GestionEmpleados/></RutaProtegida>}/>
        <Route path='/reportes' element={<RutaProtegida><PanelReportes/></RutaProtegida>}/>
        <Route path='/editarempleados/:id' element={<RutaProtegida><Editarempleados/></RutaProtegida>}/>
        <Route path='/aprobarpago' element={<RutaProtegida><Aprobarpago/></RutaProtegida>}/>

        {/* Cierres de Sesión */}
        <Route path="/cierre-admin" element={<CierreDeSesionAdministrador />} />
        <Route path="/cierre-empleado" element={<CierreDeSesionEmpleado />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;