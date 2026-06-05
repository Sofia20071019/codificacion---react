import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'; 

function GestionEmpleados() {
    const [empleados, setEmpleados] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const API_URL = "http://localhost:5000/personal";

    // Cargar los empleados desde el simulador backend
    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => setEmpleados(data))
            .catch((err) => console.error("Error cargando personal:", err));
    }, []);

    const eliminarEmpleado = (id) => {
        if (window.confirm("¿Desea eliminar este empleado del sistema?")) {
            fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            })
            .then((res) => {
                if (res.ok) {
                    setEmpleados(empleados.filter((emp) => emp.id !== id));
                }
            })
            .catch((err) => console.error("Error al eliminar:", err));
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
                        <button className="btn-login">Administrador</button>
                        <button className="btn-login">
                            <Link to="/registro-personal" className="no-text-decor">Registrar Nuevo Empleado</Link>
                        </button>
                    </div>
                </div>
            </header>

            <main className="content-wrapper">
                <div className="toolbar margin-b-20">
                    <div className="max-w-500">
                        <label className="margin-b-10 text-center display-block">Buscador de Personal</label>
                        <input 
                            type="text" 
                            placeholder="Buscar por nombre o apellido..." 
                            value={busqueda} 
                            onChange={(e) => setBusqueda(e.target.value)} 
                        />
                    </div>
                </div>

                <div className="table-container panel-gestion">
                    <table className="kimukaPedidos-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre Completo</th>
                                <th>Correo</th>
                                <th>Cargo / Rol</th>
                                <th>Celular</th>
                                <th className="text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empleadosFiltrados.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center">No hay registros disponibles.</td>
                                </tr>
                            ) : (
                                empleadosFiltrados.map((emp) => (
                                    <tr key={emp.id}>
                                        <td>{emp.id}</td>
                                        <td>{emp.nombre} {emp.apellido}</td>
                                        <td>{emp.email}</td>
                                        <td><span className="status status-pending">{emp.rol}</span></td>
                                        <td>{emp.celular}</td>
                                        <td className="text-right">
                                            <div className="flex-row-gap-10">
                                                <button className="btn-action">
                                                    <Link to={`/editarempleados/${emp.id}`} className="no-text-decor">Editar</Link>
                                                </button>
                                                <button className="btn-action btn-alert-color" onClick={() => eliminarEmpleado(emp.id)}>Eliminar</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default GestionEmpleados;