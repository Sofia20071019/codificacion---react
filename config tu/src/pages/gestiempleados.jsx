import { useState } from "react";
import Footer from "../components/Footer";

function GestionEmpleados() {

    const [empleados, setEmpleados] = useState([
        {
            id: "770123890",
            nombres: "Jimena",
            apellidos: "Martínez",
            correo: "jimena@gmail.com",
            cargo: "Empleado",
            telefono: "3001234567",
            horas: 7
        }
    ]);

    const [formulario, setFormulario] = useState({
        id: "",
        nombres: "",
        apellidos: "",
        correo: "",
        cargo: "",
        telefono: "",
        horas: ""
    });

    const [editando, setEditando] = useState(false);

    const [busqueda, setBusqueda] = useState("");

    const handleChange = (e) => {

        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });

    };

    const agregarEmpleado = () => {

        if (
            !formulario.id ||
            !formulario.nombres ||
            !formulario.apellidos
        ) {
            alert("Complete los campos obligatorios");
            return;
        }

        setEmpleados([
            ...empleados,
            formulario
        ]);

        limpiarFormulario();

    };

    const editarEmpleado = (empleado) => {

        setFormulario(empleado);
        setEditando(true);

    };

    const actualizarEmpleado = () => {

        const nuevosEmpleados = empleados.map((emp) =>
            emp.id === formulario.id
                ? formulario
                : emp
        );

        setEmpleados(nuevosEmpleados);

        limpiarFormulario();

        setEditando(false);

    };

    const eliminarEmpleado = (id) => {

        if (
            window.confirm(
                "¿Desea eliminar este empleado?"
            )
        ) {

            setEmpleados(
                empleados.filter(
                    (emp) => emp.id !== id
                )
            );

        }

    };

    const limpiarFormulario = () => {

        setFormulario({
            id: "",
            nombres: "",
            apellidos: "",
            correo: "",
            cargo: "",
            telefono: "",
            horas: ""
        });

    };

    const empleadosFiltrados = empleados.filter((emp) =>
        `${emp.nombres} ${emp.apellidos}`
            .toLowerCase()
            .includes(busqueda.toLowerCase())
    );

    return (
        <>

            <nav className="top-nav">
                <h3>GESTIÓN DE EMPLEADOS</h3>
            </nav>

            <header className="main-header">

                <div className="logo-principal">

                    <div className="logo-circle">
                        <img
                            src="/img/logo-kimuka.png"
                            alt=""
                        />
                    </div>

                    <h1>Kimuka</h1>

                </div>

            </header>

            <main className="gestion-container">

                <div className="panel-card">

                    <h2>
                        {editando
                            ? "Editar empleado"
                            : "Registrar empleado"}
                    </h2>

                    <br />

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(250px,1fr))",
                            gap: "15px"
                        }}
                    >

                        <input
                            type="text"
                            name="id"
                            placeholder="ID"
                            value={formulario.id}
                            onChange={handleChange}
                            disabled={editando}
                        />

                        <input
                            type="text"
                            name="nombres"
                            placeholder="Nombres"
                            value={formulario.nombres}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="apellidos"
                            placeholder="Apellidos"
                            value={formulario.apellidos}
                            onChange={handleChange}
                        />

                        <input
                            type="email"
                            name="correo"
                            placeholder="Correo"
                            value={formulario.correo}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="cargo"
                            placeholder="Cargo"
                            value={formulario.cargo}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="telefono"
                            placeholder="Teléfono"
                            value={formulario.telefono}
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            name="horas"
                            placeholder="Horas trabajadas"
                            value={formulario.horas}
                            onChange={handleChange}
                        />

                    </div>

                    <br />

                    {editando ? (

                        <button
                            className="btn-primary"
                            onClick={actualizarEmpleado}
                        >
                            Actualizar
                        </button>

                    ) : (

                        <button
                            className="btn-primary"
                            onClick={agregarEmpleado}
                        >
                            Registrar
                        </button>

                    )}

                </div>

                <br />

                <div className="toolbar">

                    <input
                        type="text"
                        placeholder="Buscar empleado..."
                        value={busqueda}
                        onChange={(e) =>
                            setBusqueda(e.target.value)
                        }
                        style={{
                            maxWidth: "300px"
                        }}
                    />

                </div>

                <div className="panel-card">

                    <table>

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Correo</th>
                                <th>Cargo</th>
                                <th>Teléfono</th>
                                <th>Horas</th>
                                <th>Acciones</th>

                            </tr>

                        </thead>

                        <tbody>

                            {empleadosFiltrados.map(
                                (empleado) => (

                                    <tr
                                        key={empleado.id}
                                    >

                                        <td>
                                            {empleado.id}
                                        </td>

                                        <td>
                                            {empleado.nombres}
                                        </td>

                                        <td>
                                            {empleado.apellidos}
                                        </td>

                                        <td>
                                            {empleado.correo}
                                        </td>

                                        <td>
                                            {empleado.cargo}
                                        </td>

                                        <td>
                                            {empleado.telefono}
                                        </td>

                                        <td>
                                            {empleado.horas}
                                        </td>

                                        <td
                                            style={{
                                                display: "flex",
                                                gap: "10px"
                                            }}
                                        >

                                            <button
                                                className="btn-action"
                                                onClick={() =>
                                                    editarEmpleado(
                                                        empleado
                                                    )
                                                }
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="btn-action"
                                                onClick={() =>
                                                    eliminarEmpleado(
                                                        empleado.id
                                                    )
                                                }
                                            >
                                                Eliminar
                                            </button>

                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>

            </main>

            <Footer/>                
        </>
    );
}

export default GestionEmpleados;