import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Dashboardadmin() {
    return (
        <div className="dark-theme">
            <nav className="top-nav">
                <Link to="/" className="no-text-decor">INICIO</Link>
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
                            <button className="btn-login">Administrador</button>
                            <button className="btn-login">Cerrar sesión</button>
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
                                <img src="../img/horasDeEmpleado kk .png" alt="Empleados" />
                            </div>
                            <h2 className="margin-t-15">Gestión de empleados</h2>
                        </div>

                        <div className="panel-gestion module-card">
                            <div className="img-principal">
                                <img src="../img/inventarioDeMaterial kk .png" />
                            </div>
                            <h2 className="margin-t-15">Inventario De Materias Primas</h2>
                        </div>
                        
                        <div className="panel-gestion module-card">
                            <div className="img-principal">
                                <img src="../img/panelAdministracion kk .png" />
                            </div>
                            <h2 className="margin-t-15">Panel de reportes</h2>
                        </div>


                </div>
            </main>
            
            <Footer/>
        </div>
    );
}

export default Dashboardadmin;