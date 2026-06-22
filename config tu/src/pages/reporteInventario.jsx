import React, { useState } from 'react';
import Nav from '../components/Nav';
import Header from '../components/Header';
import Footer from '../components/Footer';

import bannerImage from '../img/inventarioDeMaterial kk .png';

function ReporteInventario() {
  const [mes, setMes] = useState('Septiembre');
  const [material, setMaterial] = useState('Tela');

  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  const algodon = material === 'Tela' ? 55 : 30;
  const poliester = material === 'Tela' ? 35 : 50;
  const lana = material === 'Tela' ? 10 : 20;

  const graficoEstilo = {
    background: `conic-gradient(
      #2196F3 0% ${algodon}%, 
      #FFC107 ${algodon}% ${algodon + poliester}%, 
      #4CAF50 ${algodon + poliester}% 100%
    )`
  };

  return (
    <div className="main-screen-container">
      <Nav />
      <Header />
      <main className="content-wrapper">
        <h2 className="section-title">Reporte de inventario</h2>
        <div className="panel-registro">
          <div className="main-banner">
            <img src={bannerImage} className="banner-img" style={{ opacity: 1 }}/>
          </div>
          <div className="input-row margin-t-15">
            <div className="input-cell">
              <label htmlFor="select-mes">Mes</label>
              <select id="select-mes" value={mes} onChange={(e) => setMes(e.target.value)}>
                {meses.map((m, i) => <option key={i} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="input-cell">
              <label htmlFor="select-material">Filtro</label>
              <select id="select-material" value={material} onChange={(e) => setMaterial(e.target.value)}>
                <option value="Tela">Tela</option>
                <option value="Hilos">Hilos</option>
              </select>
            </div>
          </div>
          <div className="chart-container text-center margin-t-40">
            <div className="pie-chart" style={graficoEstilo}></div>
            <div className="chart-legends">
              <div className="legend-item">
                <span className="bullet-algodon"></span>
                <p>Algodón {algodon}%</p>
              </div>
              <div className="legend-item">
                <span className="bullet-poliester"></span>
                <p>Poliéster {poliester}%</p>
              </div>
              <div className="legend-item">
                <span className="bullet-lana"></span>
                <p>Lana {lana}%</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ReporteInventario;