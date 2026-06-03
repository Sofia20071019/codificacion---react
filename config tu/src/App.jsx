import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

// Corregidos los nombres aquí arriba para que coincidan con el uso de abajo
import CierreDeSesionAdministrador from './pages/cierreDeSesionAdministrador';
import CierreDeSesionEmpleado from './pages/cierreDeSesionEmpleado';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Nav />
      
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<VistaInicio />} />
        
        {/* Autenticación y Usuarios */}
        <Route path="/login" element={<InicioDeSesion />} />
        <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
        <Route path="/registro-personal" element={<RegistroDePersonal />} />
        
        {/* Módulos del Sistema */}
        <Route path="/materia-prima" element={<MateriaPrima />} />
        <Route path="/gestion-pedidos" element={<GestionDePedidos />} />
        <Route path="/reporte-pedidos" element={<ReporteDePedidos />} />
        <Route path="/registro-horas" element={<RegistroDeHoras />} />
        
        {/* Cierres de Sesión */}
        <Route path="/cierre-admin" element={<CierreDeSesionAdministrador />} />
        <Route path="/cierre-empleado" element={<CierreDeSesionEmpleado />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
