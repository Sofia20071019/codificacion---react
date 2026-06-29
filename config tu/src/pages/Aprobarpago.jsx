import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { api } from '../api';

function Aprobarpago() {
    const [pago, setPago] = useState({
        nombre: "",
        cedula: "",
        monto: "",
        idMetodo: "",
        concepto: "",
        estado: "Pendiente",
        responsable: "ADMIN"
    });
    const [metodosPago, setMetodosPago] = useState([]);
    const [jornadas, setJornadas] = useState([]);

    useEffect(() => {
        const usuarioLogueado = localStorage.getItem('usuarioLogueado');
        if (usuarioLogueado) {
            const user = JSON.parse(usuarioLogueado);
            setPago(prev => ({ ...prev, responsable: user.nombre?.toUpperCase() || 'ADMIN' }));
        }

        api.metodosPago.listar()
            .then((res) => setMetodosPago(res.data || []))
            .catch(() => {});

        api.jornadas.listar()
            .then((res) => setJornadas(res.data || []))
            .catch(() => {});
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPago({ ...pago, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const usuarioLogueado = localStorage.getItem('usuarioLogueado');
            const user = JSON.parse(usuarioLogueado);

            await api.pagos.crear({
                idJornada: pago.idJornada,
                idUsuario_Admin: user.idUsuario,
                montoPagado: pago.monto,
                idMetodo: pago.idMetodo,
                fechaPago: new Date().toISOString().split('T')[0],
            });

            setPago({ ...pago, estado: "Aprobado" });
            alert(`Pago por valor de $${Number(pago.monto).toLocaleString()} aprobado correctamente.`);
        } catch (error) {
            alert(error.message || "Error al procesar el pago.");
        }
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
                            <div className="input-group">
                                <label>Nombre del Empleado</label>
                                <input type="text" name="nombre" value={pago.nombre} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label>Monto a Pagar</label>
                                <input type="number" name="monto" value={pago.monto} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label>Método de Pago</label>
                                <select name="idMetodo" value={pago.idMetodo} onChange={handleChange} required>
                                    <option value="">Seleccione</option>
                                    {metodosPago.map((m) => (
                                        <option key={m.idMetodo} value={m.idMetodo}>{m.nombreMetodo}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Jornada Asociada</label>
                                <select name="idJornada" value={pago.idJornada} onChange={handleChange} required>
                                    <option value="">Seleccione una jornada</option>
                                    {jornadas.map((j) => (
                                        <option key={j.idJornada} value={j.idJornada}>
                                            {j.idJornada} - {j.fecha}
                                        </option>
                                    ))}
                                </select>
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
