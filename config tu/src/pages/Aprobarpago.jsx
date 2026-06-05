import { useState } from "react";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom'; 

function Aprobarpago(){
    const [pago, setPago] = useState({ /* ... estado inicial ... */ });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPago({ ...pago, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Pago aprobado correctamente");
    };

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
                                <img src="../img/logo kimuka.png" alt="logo Kimuka" />
                            </div>
                            <h1>Aprobación de Pagos</h1>
                        </div>
                    </div>
                    <div className="header-actions-cell">
                        <button className="btn-login">Registrar Nuevo Personal </button>
                    </div>
                </div>
            </header>

            <main className="content-wrapper">
                <div className="panel-registro">
                    <section className="form-section-cell">
                        <h2 className="form-title">Aprobar Pago</h2>
                        <form className="grid-form" onSubmit={handleSubmit}>
                            <div className="input-row">
                                <div className="input-cell">
                                    <label>Nombre del Empleado</label>
                                    <input type="text" name="nombre" value={pago.nombre} onChange={handleChange} placeholder="Juan Carlos Pérez" />
                                </div>
                                <div className="input-cell">
                                    <label>Cédula</label>
                                    <input type="text" name="cedula" value={pago.cedula} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="input-row">
                                <div className="input-cell">
                                    <label>Monto a Pagar</label>
                                    <input type="number" name="monto" value={pago.monto} onChange={handleChange} />
                                </div>
                                <div className="input-cell">
                                    <label>Método de Pago</label>
                                    <select name="metodo" value={pago.metodo} onChange={handleChange}>
                                        <option value="">Seleccione</option>
                                        <option>Transferencia Bancaria</option>
                                        <option>Nequi</option>
                                        <option>Daviplata</option>
                                    </select>
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Concepto del Pago</label>
                                <input type="text" name="concepto" value={pago.concepto} onChange={handleChange} />
                            </div>

                            <button type="submit" className="btn-submit w-100">Confirmar Aprobación</button>
                        </form>
                    </section>

                    <section className="image-section-cell">
                        <h2 className="avatar-preview-text">Resumen Financiero</h2>
                        <div className="highlight-info">
                            <h4>Monto Total</h4>
                            <p>{pago.monto ? `$ ${Number(pago.monto).toLocaleString()}` : "$ 0"}</p>
                            <div className="margin-t-15">
                                <span className={`status ${pago.estado === 'Pendiente' ? 'status-pending' : 'status-success'}`}>
                                    {pago.estado}
                                </span>
                            </div>
                        </div>
                        <div className="margin-t-15 font-size-sm text-secondary">
                            <p><strong>Responsable:</strong> {pago.responsable || "Administrador"}</p>
                        </div>
                    </section>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default Aprobarpago;