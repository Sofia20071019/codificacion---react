import { useState } from "react";
import Footer from "../components/Footer";

function Aprobarpago(){

    const [pago, setPago] = useState({
        nombre: "",
        cedula: "",
        cargo: "",
        fecha: "",
        monto: "",
        metodo: "",
        concepto: "",
        estado: "Pendiente",
        responsable: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setPago({
            ...pago,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        alert("Pago aprobado correctamente");

        console.log(pago);
    };

    return (
        <>
            <nav className="top-nav">
                <a href="index.html">VOLVER</a>
            </nav>

            <header className="main-header">
                <div className="logo-principal">
                    <div className="logo-circle">
                        <img
                            src="../img/logo kimuka.png"
                            alt="logo Kimuka"
                        />
                    </div>

                    <h1>Aprobación de Pagos</h1>
                </div>

                <button className="btn-login">
                    <a href="HistorialPagos.html">
                        Ver Historial
                    </a>
                </button>
            </header>

            <main className="registro-container">
                <div className="panel-registro">

                    <section className="form-section">

                        <h2 className="form-title">
                            Aprobar Pago
                        </h2>

                        <form
                            className="grid-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="input-group">
                                <label>Nombre del Empleado</label>

                                <input
                                    type="text"
                                    name="nombre"
                                    value={pago.nombre}
                                    onChange={handleChange}
                                    placeholder="Juan Carlos Pérez"
                                />
                            </div>

                            <div className="input-group">
                                <label>Cédula</label>

                                <input
                                    type="text"
                                    name="cedula"
                                    value={pago.cedula}
                                    onChange={handleChange}
                                    placeholder="12345678"
                                />
                            </div>

                            <div className="input-group">
                                <label>Cargo</label>

                                <input
                                    type="text"
                                    name="cargo"
                                    value={pago.cargo}
                                    onChange={handleChange}
                                    placeholder="Operario"
                                />
                            </div>

                            <div className="input-group">
                                <label>Fecha de Pago</label>

                                <input
                                    type="date"
                                    name="fecha"
                                    value={pago.fecha}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-group">
                                <label>Monto a Pagar</label>

                                <input
                                    type="number"
                                    name="monto"
                                    value={pago.monto}
                                    onChange={handleChange}
                                    placeholder="0"
                                />
                            </div>

                            <div className="input-group">
                                <label>Método de Pago</label>

                                <select
                                    name="metodo"
                                    value={pago.metodo}
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        Seleccione
                                    </option>

                                    <option>
                                        Transferencia Bancaria
                                    </option>

                                    <option>
                                        Efectivo
                                    </option>

                                    <option>
                                        Nequi
                                    </option>

                                    <option>
                                        Daviplata
                                    </option>
                                </select>
                            </div>

                            <div className="input-group full-width">
                                <label>
                                    Concepto del Pago
                                </label>

                                <textarea
                                    rows="4"
                                    name="concepto"
                                    value={pago.concepto}
                                    onChange={handleChange}
                                    placeholder="Descripción del pago..."
                                ></textarea>
                            </div>

                            <div className="input-group">
                                <label>Estado</label>

                                <select
                                    name="estado"
                                    value={pago.estado}
                                    onChange={handleChange}
                                >
                                    <option>
                                        Pendiente
                                    </option>

                                    <option>
                                        Aprobado
                                    </option>

                                    <option>
                                        Rechazado
                                    </option>
                                </select>
                            </div>

                            <div className="input-group">
                                <label>
                                    Responsable
                                </label>

                                <input
                                    type="text"
                                    name="responsable"
                                    value={pago.responsable}
                                    onChange={handleChange}
                                    placeholder="Administrador"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn-registrar"
                            >
                                Aprobar Pago
                            </button>

                        </form>

                    </section>

                    <section className="image-section">

                        <h2 className="img-label">
                            Resumen del Pago
                        </h2>

                        <div className="portrait-wrapper resumen-pago">

                            <p>
                                <strong>Empleado:</strong>
                                <br />
                                {pago.nombre || "Sin registrar"}
                            </p>

                            <p>
                                <strong>Cédula:</strong>
                                <br />
                                {pago.cedula || "Sin registrar"}
                            </p>

                            <p>
                                <strong>Cargo:</strong>
                                <br />
                                {pago.cargo || "Sin registrar"}
                            </p>

                            <p>
                                <strong>Fecha:</strong>
                                <br />
                                {pago.fecha || "Sin seleccionar"}
                            </p>

                            <p>
                                <strong>Monto:</strong>
                                <br />
                                {
                                    pago.monto
                                        ? `$ ${Number(
                                            pago.monto
                                        ).toLocaleString()}`
                                        : "$ 0"
                                }
                            </p>

                            <p>
                                <strong>Método:</strong>
                                <br />
                                {
                                    pago.metodo ||
                                    "Sin seleccionar"
                                }
                            </p>

                            <p>
                                <strong>Estado:</strong>
                                <br />
                                {pago.estado}
                            </p>

                            <p>
                                <strong>Responsable:</strong>
                                <br />
                                {
                                    pago.responsable ||
                                    "Sin registrar"
                                }
                            </p>

                            <p>
                                <strong>Concepto:</strong>
                                <br />
                                {
                                    pago.concepto ||
                                    "Sin descripción"
                                }
                            </p>

                        </div>

                    </section>

                </div>
            </main>
            <Footer/>
        </>
    )

}

export default Aprobarpago