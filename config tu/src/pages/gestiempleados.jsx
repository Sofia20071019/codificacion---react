import { useState } from "react";
import { Link } from 'react-router-dom'; 

function GestionEmpleados() {
    const [empleados, setEmpleados] = useState([
        { id: "770123890", nombres: "Jimena", apellidos: "Martínez", correo: "jimena@gmail.com", cargo: "Empleado", telefono: "3001234567", horas: 7 }
    ]);

    const [formulario, setFormulario] = useState({
        id: "", nombres: "", apellidos: "", correo: "", cargo: "", telefono: "", horas: ""
    });

    const [editando, setEditando] = useState(false);
    const [busqueda, setBusqueda] = useState("");

    const handleChange = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
    };

    const limpiarFormulario = () => {
        setFormulario({ id: "", nombres: "", apellidos: "", correo: "", cargo: "", telefono: "", horas: "" });
        setEditando(false);
    };

    const agregarEmpleado = () => {
        if (!formulario.id || !formulario.nombres || !formulario.apellidos) {
            alert("Complete los campos obligatorios");
            return;
        }
        setEmpleados([...empleados, formulario]);
        limpiarFormulario();
    };

    const actualizarEmpleado = () => {
        const nuevosEmpleados = empleados.map((emp) =>
            emp.id === formulario.id ? formulario : emp
        );
        setEmpleados(nuevosEmpleados);
        limpiarFormulario();
    };

    const eliminarEmpleado = (id) => {
        if (window.confirm("¿Desea eliminar este empleado?")) {
            setEmpleados(empleados.filter((emp) => emp.id !== id));
        }
    };

    const editarEmpleado = (empleado) => {
        setFormulario(empleado);
        setEditando(true);
    };

    const empleadosFiltrados = empleados.filter((emp) =>
        `${emp.nombres} ${emp.apellidos}`.toLowerCase().includes(busqueda.toLowerCase())
    );

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
                            <h1>Gestión De Empleado</h1>
                        </div>
                    </div>
                    <div className="header-actions-cell">
                        <button className="btn-login">Registrar Nuevo Empleado</button>
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
                                <th>Cargo</th>
                                <th>Horas</th>
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
                                        <td>{emp.nombres} {emp.apellidos}</td>
                                        <td>{emp.correo}</td>
                                        <td><span className="status status-pending">{emp.cargo}</span></td>
                                        <td>{emp.horas}</td>
                                        <td className="text-right">
                                            <div className="flex-row-gap-10">
                                                <button className="btn-action" onClick={() => editarEmpleado(emp)}>Editar</button>
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