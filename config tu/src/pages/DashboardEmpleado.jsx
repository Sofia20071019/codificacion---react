import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function DashboardEmpleado() {
    const [empleadoName, setEmpleadoName] = useState('EMPLEADO');

    useEffect(() => {
        const nombreSesion = localStorage.getItem('kimuka_sesion_activa');
        if (nombreSesion) {
            setEmpleadoName(nombreSesion.toUpperCase());
        }
    }, []);

    return (
        <div className="dark-theme">
            <nav className="top-nav">
                <Link to="/dashboard-empleado" className="no-text-decor">INICIO</Link>
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
                            <button className="btn-login">{empleadoName}</button>
                            <button className="btn-login">
                                <Link to="/cierre-empleado">Cerrar Sesión</Link>
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
                    <h1 className="font-size-xl">Panel de Empleado</h1>
                    <h2 className="text-secondary">Titan Sports</h2>
                </div>

                <h2 className="table-title margin-b-25">Módulos disponibles</h2>

                <div className="card-grid">
                    <div className="panel-gestion module-card">
                        <div className="img-principal">
                            <img src="../img/inventarioDeMaterial kk .png" alt="Inventario" />
                        </div>
                        <h2 className="margin-t-15">
                            <Link to="/inventario-empleado" className="no-text-decor display-block">
                                Inventario de Materiales
                            </Link>
                        </h2>
                    </div>

                    <div className="panel-gestion module-card">
                        <div className="img-principal">
                            <img src="../img/horasDeTrabajadores kk.png" alt="Mis Horas" />
                        </div>
                        <h2 className="margin-t-15">
                            <Link to="/mis-horas" className="no-text-decor display-block">
                                Mis Horas Trabajadas
                            </Link>
                        </h2>
                    </div>

                    <div className="panel-gestion module-card">
                        <div className="img-principal">
                            <img src="../img/registroDePersonal kk .png" alt="Tareas" />
                        </div>
                        <h2 className="margin-t-15">
                            <Link to="/mis-tareas" className="no-text-decor display-block">
                                Mis Materiales
                            </Link>
                        </h2>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default DashboardEmpleado;
