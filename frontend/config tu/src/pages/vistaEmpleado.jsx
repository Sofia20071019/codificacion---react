import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Header from '../components/Header';

import portadaImg from '../img/portadakk .jpg';
import inventarioImg from '../img/inventarioDeMaterial kk .png';
import horasImg from '../img/horasDeEmpleado kk .png';

function VistaEmpleado() {
  return (
    <div className="dark-theme">
      <Nav />
      <Header />

      <main className="content-wrapper">
        <div className="main-banner">
          <img src={portadaImg} alt="Fondo Titan Sports" className="banner-img" />
          <div className="banner-text">
            <h2>Sistema de gestión interna</h2>
            <h3>Titan Sports</h3>
          </div>
        </div>

        <h3 className="section-title">Módulos del sistema</h3>

        <div className="card-grid">
          
          <Link to="/asignacion-material" className="module-card-link">
            <div className="module-card">
              <div className="card-image-wrapper">
                <img src={inventarioImg} alt="Inventario de material" />
              </div>
              <h4>Inventario de material</h4>
              
              <div className="grid-list-materials">
                <div>• Telas.</div>
                <div>• Malla.</div>
                <div>• Moldes.</div>
                <div>• Bolsas.</div>
                <div>• Cauchos.</div>
                <div>• Tijeras.</div>
                <div>• Marquillas.</div>
                <div>• Cinta.</div>
                <div>• Carritos.</div>
                <div>• Esferos.</div>
              </div>
            </div>
          </Link>

          <Link to="/asignacion-orden" className="module-card-link">
            <div className="module-card">
              <div className="card-image-wrapper">
                <img src={horasImg} alt="Agendamiento de pedidos" />
              </div>
              <h4>Agendamiento de pedidos</h4>
              
              <div className="vertical-list-orders">
                <div>• Día de entrega.</div>
                <div>• Datos de cliente.</div>
                <div>• Talla.</div>
                <div>• Material.</div>
                <div>• Producto.</div>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default VistaEmpleado;