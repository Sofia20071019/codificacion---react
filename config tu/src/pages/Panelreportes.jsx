
import { Link } from 'react-router-dom'; 

function PanelReportes() {
    return (
        <div className="dark-theme">
            <nav className="top-nav">
                <Link to="/dashboardadmin">VOLVER</Link>
            </nav>

            <header className="main-header">
                <div className="header-container">
                    <div className="logo-principal-cell">
                        <div className="logo-principal">
                            <div className="logo-circle">
                                <img src="../img/logo kimuka.png" alt="Logo Kimuka" />
                            </div>
                            <h1>Panel De Reportes</h1>
                        </div>
                    </div>
                    <div className="header-actions-cell">
                        <button className="btn-login">Administrador</button>
                        <button className="btn-login"><Link to="/cierre-admin">Cerrar Sesión</Link></button>
                    </div>
                </div>
            </header>

            <main className="content-wrapper">
                <h2 className="table-title margin-b-35">Reportes Disponibles</h2>

                <div className="card-grid">
                    <div className="panel-gestion module-card">
                        <div className="img-principal">
                            <img src="../img/inventarioDeMaterial kk .png" alt="Inventario" />
                        </div>
                        <h2 className="margin-t-15"><Link to="/reporte-pedidos" className="no-text-decor display-block">Reporte de Inventario</Link></h2>
                    </div>

                    <div className="panel-gestion module-card">
                        <div className="img-principal">
                            <img src="../img/reporteDePedidos kk .png" alt="Pedidos" />
                        </div>
                        <h2 className="margin-t-15">Reporte de Pedidos</h2>
                    </div>

                    <div className="panel-gestion module-card">
                        <div className="img-principal">
                            <img src="../img/horasDeEmpleado kk .png" alt="Empleados" />
                        </div>
                        <h2 className="margin-t-15">Reporte de Empleados</h2>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default PanelReportes;