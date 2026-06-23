import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ReporteDePedidos() {
  const [adminName, setAdminName] = useState('Administrador');

  useEffect(() => {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado) {
        const user = JSON.parse(usuarioLogueado);
        if (user.nombre) setAdminName(user.nombre);
    }
  }, []);

  return (
    <>
    <nav className="top-nav"><Link to="/dashboardadmin">VOLVER MENÚ</Link></nav>

    <header className="main-header">
        <div className="header-container">
            <div className="logo-principal-cell">
                <div className="logo-principal">
                    <div className="logo-circle"><img src="../img/logo kimuka.png" alt="Logo" /></div>
                    <h1>Kimuka - Reporte De Pedidos</h1>
                </div>
            </div>
            <div className="header-actions-cell">
                <button className="btn-login"><Link to="/dashboardadmin">{adminName}</Link></button>
                <button className="btn-login"><Link to="/cierre-admin">Cerrar Sesión</Link></button>
            </div>
        </div>
    </header>

    <main className="content-wrapper">
        <div className="img-principal">
            <img src="../img/panelDeReportes kk   .png" alt="Análisis Operativo" />
        </div>
        <div className="toolbar">
            <h2 className="table-title">Reporte de pedidos / Materiales</h2>
        </div>
        {/* ... Resto de tu código intacto ... */}
    </main>
    </>
  )
}
export default ReporteDePedidos;