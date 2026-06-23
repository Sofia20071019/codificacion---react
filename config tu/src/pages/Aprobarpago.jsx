import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'; 

function Aprobarpago(){
    const [pago, setPago] = useState({
        nombre: "",
        cedula: "",
        monto: "",
        metodo: "",
        concepto: "",
        estado: "Pendiente",
        responsable: "BRAYAN VALDERRAMA" // Mantiene tu nombre como el responsable del proceso
    });

    // Simulación: Trae información base del primer pedido del backend para procesar el pago
    useEffect(() => {
        fetch("http://localhost:3000/pedidos/1")
            .then((res) => res.json())
            .then((data) => {
                setPago(prev => ({
                    ...prev,
                    nombre: data.cliente,
                    concepto: `Liquidación o Pago de Pedido N° ${data.id}`,
                    monto: "250000" // Valor ejemplo asignado al proceso
                }));
            })
            .catch((err) => console.error("Error al conectar con simulación de pedidos:", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPago({ ...pago, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Simulamos la actualización del estado de pago enviando un PUT o POST alternativo
        setPago({ ...pago, estado: "Aprobado" });
        alert(`Pago por valor de $${Number(pago.monto).toLocaleString()} aprobado correctamente para ${pago.nombre}`);
    };

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
                                <img src="../img/logo kimuka.png" alt="logo Kimuka" />
                            </div>
                            <h1>Aprobación de Pagos</h1>
                        </div>
                    </div>
                    <div className="header-actions-cell">
                        <button className="btn-login">
                            <Link to="/registro-personal" className="no-text-decor">Registrar Nuevo Personal</Link> 
                        </button>
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
                                    <label>Nombre del Empleado / Cliente</label>
                                    <input type="text" name="nombre" value={pago.nombre} onChange={handleChange} placeholder="Juan Carlos Pérez" required />
                                </div>
                                <div className="input-cell">
                                    <label>Cédula / Documento</label>
                                    <input type="text" name="cedula" value={pago.cedula} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="input-row">
                                <div className="input-cell">
                                    <label>Monto a Pagar</label>
                                    <input type="number" name="monto" value={pago.monto} onChange={handleChange} required />
                                </div>
                                <div className="input-cell">
                                    <label>Método de Pago</label>
                                    <select name="metodo" value={pago.metodo} onChange={handleChange} required>
                                        <option value="">Seleccione</option>
                                        <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                                        <option value="Nequi">Nequi</option>
                                        <option value="Daviplata">Daviplata</option>
                                    </select>
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Concepto del Pago</label>
                                <input type="text" name="concepto" value={pago.concepto} onChange={handleChange} required />
                            </div>

                            <button type="submit" className="btn-submit w-100">Confirmar Aprobación</button>
                        </form>
                    </section>

                    <section className="image-section-cell">
                        <h2 className="avatar-preview-text">Resumen Financiero</h2>
                        <div className="highlight-info">
                            <h4>Monto Total</h4>
                            <p>{ pago.monto ? `$ ${Number(pago.monto).toLocaleString()}` : "$ 0"}</p>
                            <div className="margin-t-15">
                                <span className={`status ${pago.estado === 'Pendiente' ? 'status-pending' : 'status-success'}`}>
                                    {pago.estado}
                                </span>
                            </div>
                        </div>
                        <div className="margin-t-15 font-size-sm text-secondary text-center">
                            <p><strong>Responsable:</strong> {pago.responsable}</p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Aprobarpago;