import { Link } from 'react-router-dom'; 
import { useState, useEffect } from 'react';

function PanelReportes() {
    const [adminName, setAdminName] = useState('ADMINISTRADOR');

    useEffect(() => {
        // Corrección: Sincronización de clave local y transformación a mayúsculas
        const nombreSesion = localStorage.getItem('kimuka_sesion_activa');
        if (nombreSesion) {
            setAdminName(nombreSesion.toUpperCase());
        }
    }, []);

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
                        {/* Corrección: Muestra el nombre real del administrador logueado */}
                        <button className="btn-login">{adminName}</button>
                        <button className="btn-login"><Link to="/cierre-admin">Cerrar Sesión</Link></button>
                    </div>
                </div>
            </header>
            {/* ... Resto de tu vista se mantiene igual ... */}
        </div>
    );
}

export default PanelReportes;