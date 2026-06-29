import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { api } from '../api';

function GestionEmpleados() {
    const [empleados, setEmpleados] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [adminName, setAdminName] = useState('ADMINISTRADOR');

    useEffect(() => {
        const usuarioLogueado = localStorage.getItem('usuarioLogueado');
        if (usuarioLogueado) {
            const user = JSON.parse(usuarioLogueado);
            if (user.nombre) setAdminName(user.nombre.toUpperCase());
        }

        api.usuarios.listar()
            .then((res) => setEmpleados(res.data || []))
            .catch((err) => console.error("Error cargando personal:", err));
    }, []);

    const eliminarEmpleado = async (id) => {
        if (window.confirm("¿Desea eliminar este empleado del sistema Kimuka?")) {
            try {
                await api.usuarios.eliminar(id);
                setEmpleados(empleados.filter((emp) => emp.idUsuario !== id));
                alert("Empleado eliminado con éxito.");
            } catch (err) {
                alert("No se pudo eliminar el empleado.");
            }
        }
    };

    const empleadosFiltrados = empleados.filter((emp) => {
        const nombreCompleto = `${emp.pNombre || ''} ${emp.pApellido || ''}`.toLowerCase();
        return nombreCompleto.includes(busqueda.toLowerCase());
    });

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

            <main className="content-wrapper">
                <div className="toolbar margin-b-20">
                    <div className="max-w-500">
                        <label className="margin-b-10 text-center display-block">Buscador de Personal</label>
                        <input
                            type="text"
                            placeholder="Buscar por nombre..."
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
                                <th>Rol</th>
                                <th>Estado</th>
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
                                    <tr key={emp.idUsuario}>
                                        <td>{emp.idUsuario}</td>
                                        <td>{emp.pNombre} {emp.pApellido}</td>
                                        <td>{emp.correo}</td>
                                        <td><span className="status status-pending">{emp.nombreRol}</span></td>
                                        <td><span className="status status-success">{emp.nombreEstado}</span></td>
                                        <td className="text-right">
                                            <div className="flex-row-gap-10">
                                                <button className="btn-action">
                                                    <Link to={`/editarempleados/${emp.idUsuario}`} className="no-text-decor">Editar</Link>
                                                </button>
                                                <button
                                                    className="btn-action btn-alert-color"
                                                    onClick={() => eliminarEmpleado(emp.idUsuario)}
                                                >
                                                    Eliminar
                                                </button>
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
