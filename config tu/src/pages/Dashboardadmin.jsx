import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Dashboardadmin() {
    const [adminName, setAdminName] = useState('ADMINISTRADOR');

    useEffect(() => {
        const nombreSesion = localStorage.getItem('kimuka_sesion_activa');
        if (nombreSesion) {
            setAdminName(nombreSesion.toUpperCase());
        }
    }, []);

    return (
        <div className="dark-theme">
            <nav className="top-nav">
                <Link to="/dashboardadmin" className="no-text-decor">INICIO</Link>
            </nav>

            <header className="main-header">
                <div className="header-container">
                    <div className="logo-principal-cell">
                        <div className="logo-principal">
                            <div className="logo-circle">
                                <img src="../img/logo kimuka.png" alt="Logo Kimuka" />
                            </div>
                            <h1>Kimuka</h1>
                        </div>
                    </div>
                    <div className="header-actions-cell">
                        <div className="flex-row-gap-10">
                            <button className="btn-login">{adminName}</button>
                            <button className="btn-login">
                                <Link to="/cierre-admin">Cerrar Sesión</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="content-wrapper">
                <div className="img-principal">
                    <img src="../img/portada kk .jpg" alt="Dashboard Hero" />
                </div>

                <div className="text-center margin-b-40">
                    <h1 className="font-size-xl">Sistema de Gestión Interna</h1>
                    <h2 className="text-secondary">Titan Sports</h2>
                </div>

                <h2 className="table-title margin-b-25">Módulos del sistema</h2>

                <div className="card-grid">
                    <div className="panel-gestion module-card">
                        <div className="img-principal">
                            <img src="../img/horasDeEmpleado kk .png" alt="Gestión" />
                        </div>
                        <h2 className="margin-t-15">
                            <Link to="/empleados" className="no-text-decor display-block">
                                Gestión de empleados
                            </Link>
                        </h2>
                    </div>
                    
                    <div className="panel-gestion module-card">
                        <div className="img-principal">
                            <img src="../img/inventarioDeMaterial kk .png" alt="Inventario" />
                        </div>
                        <h2 className="margin-t-15">
                            <Link to="/materia-prima" className="no-text-decor display-block">
                                Inventario De Materias Primas
                            </Link>
                        </h2>
                    </div>

                    <div className="panel-gestion module-card">
                        <div className="img-principal">
                            <img src="../img/panelAdministracion kk .png" alt="Reportes" />
                        </div>
                        <h2 className="margin-t-15">
                            <Link to="/reporte-pedidos" className="no-text-decor display-block">
                                Panel De Reportes
                            </Link>
                        </h2>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboardadmin;