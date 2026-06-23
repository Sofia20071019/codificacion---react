import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'; 

function GestionEmpleados() {
    const [empleados, setEmpleados] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [adminName, setAdminName] = useState('Administrador');
    const API_URL = "http://localhost:5000/personal";

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => setEmpleados(data))
            .catch((err) => console.error("Error cargando personal:", err));

        const usuarioLogueado = localStorage.getItem('usuarioLogueado');
        if (usuarioLogueado) {
            const user = JSON.parse(usuarioLogueado);
            if (user.nombre) setAdminName(user.nombre);
        }
    }, []);

    const eliminarEmpleado = (id) => {
        if (window.confirm("¿Desea eliminar este empleado del sistema?")) {
            fetch(`${API_URL}/${id}`, { method: "DELETE" })
            .then((res) => {
                if (res.ok) setEmpleados(empleados.filter((emp) => emp.id !== id));
            })
            .catch((err) => console.error("Error:", err));
        }
    };

    const empleadosFiltrados = empleados.filter((emp) =>
        `${emp.nombre} ${emp.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="dark-theme">
            <nav className="top-nav">
                <Link to="/dashboardadmin" className="no-text-decor">VOLVER</Link>
            </nav>

            <header className="main-header">
                <div className="header-container">
                    <div className="logo-principal-cell">
                        <div className="logo-principal">
                            <div className="logo-circle">
                                <img src="../img/logo kimuka.png" alt="Logo Kimuka" />
                            </div>
                            <h1>Gestión De Empleado</h1>
                        </div>
                    </div>
                    <div className="header-actions-cell">
                        <button className="btn-login">{adminName}</button>
                        <button className="btn-login">
                            <Link to="/registro-personal" className="no-text-decor">Registrar Nuevo Empleado</Link>
                        </button>
                    </div>
                </div>
            </header>
            {/* ... Resto de la tabla idéntico ... */}
        </div>
    );
}

export default GestionEmpleados;