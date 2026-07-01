import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { api } from '../api';

function AdminPagos() {
    const [empleados, setEmpleados] = useState([]);
    const [metodosPago, setMetodosPago] = useState([]);
    const [jornadas, setJornadas] = useState([]);
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState('');
    const [calculo, setCalculo] = useState(null);
    const [adminName, setAdminName] = useState('ADMINISTRADOR');
    const [pagoForm, setPagoForm] = useState({
        idJornada: "",
        idMetodo: "",
        monto: "",
    });
    const [historialPagos, setHistorialPagos] = useState([]);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const nombreSesion = localStorage.getItem('kimuka_sesion_activa');
        if (nombreSesion) setAdminName(nombreSesion.toUpperCase());

        api.empleados.listar()
            .then((res) => setEmpleados(res.data || []))
            .catch(() => {});

        api.metodosPago.listar()
            .then((res) => setMetodosPago(res.data || []))
            .catch(() => {});

        api.jornadas.listar()
            .then((res) => setJornadas(res.data || []))
            .catch(() => {});

        api.pagos.listar()
            .then((res) => setHistorialPagos(res.data || []))
            .catch(() => {});
    }, []);

    const handleSeleccionarEmpleado = (e) => {
        const id = e.target.value;
        setEmpleadoSeleccionado(id);
        setPagoForm({ idJornada: "", idMetodo: "", monto: "" });
        if (id) {
            api.jornadas.calcularPago(id)
                .then((res) => setCalculo(res.data))
                .catch(() => setCalculo(null));
        } else {
            setCalculo(null);
        }
    };

    const jornadasDisponibles = empleadoSeleccionado
        ? jornadas.filter((j) => j.idUsuario_Empleado === empleadoSeleccionado && j.hFin)
        : [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');
        try {
            const usuarioLogueado = localStorage.getItem('usuarioLogueado');
            const user = JSON.parse(usuarioLogueado);

            await api.pagos.crear({
                idJornada: pagoForm.idJornada,
                idUsuario_Admin: user.idUsuario,
                montoPagado: pagoForm.monto,
                idMetodo: pagoForm.idMetodo,
                fechaPago: new Date().toISOString().split('T')[0],
            });

            setMensaje(`Pago por $${Number(pagoForm.monto).toLocaleString()} registrado correctamente.`);

            api.pagos.listar()
                .then((res) => setHistorialPagos(res.data || []))
                .catch(() => {});

            setPagoForm({ idJornada: "", idMetodo: "", monto: "" });
        } catch (error) {
            setMensaje(error.message || "Error al procesar el pago.");
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
                            <h1>Gestión de Pagos</h1>
                        </div>
                    </div>
                    <div className="header-actions-cell">
                        <button className="btn-login">{adminName}</button>
                    </div>
                </div>
            </header>

            <main className="content-wrapper">
                {mensaje && (
                    <div style={{ background: '#1a1a1a', border: '1px solid #2d2d2d', padding: '15px', borderRadius: '10px', marginBottom: '20px', textAlign: 'center', color: mensaje.includes('Error') ? '#e74c3c' : '#2ecc71' }}>
                        {mensaje}
                    </div>
                )}

                <div className="panel-registro">
                    <section className="form-section-cell">
                        <h2 className="form-title">Registrar Pago</h2>
                        <form className="grid-form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>Empleado</label>
                                <select value={empleadoSeleccionado} onChange={handleSeleccionarEmpleado} required>
                                    <option value="">Seleccione un empleado</option>
                                    {empleados.map((emp) => (
                                        <option key={emp.idUsuario} value={emp.idUsuario}>{emp.nombre}</option>
                                    ))}
                                </select>
                            </div>

                            {calculo && (
                                <div className="input-group" style={{ background: '#1f1f1f', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                                    <p className="text-secondary font-size-sm">Horas totales: <strong className="text-primary">{calculo.horasTotales} hrs</strong></p>
                                    <p className="text-secondary font-size-sm">Pago estimado: <strong className="text-primary">$ {Number(calculo.pagoTotal).toLocaleString('es-CO')}</strong></p>
                                </div>
                            )}

                            <div className="input-group">
                                <label>Jornada a Pagar</label>
                                <select name="idJornada" value={pagoForm.idJornada} onChange={(e) => setPagoForm({ ...pagoForm, idJornada: e.target.value })} required>
                                    <option value="">Seleccione una jornada</option>
                                    {jornadasDisponibles.map((j) => (
                                        <option key={j.idJornada} value={j.idJornada}>
                                            {j.idJornada} - {j.fecha} ({j.hInicio?.substring(0, 5)} - {j.hFin?.substring(0, 5)})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="input-group">
                                <label>Monto a Pagar</label>
                                <input type="number" name="monto" value={pagoForm.monto} onChange={(e) => setPagoForm({ ...pagoForm, monto: e.target.value })} placeholder="0" required />
                            </div>

                            <div className="input-group">
                                <label>Método de Pago</label>
                                <select name="idMetodo" value={pagoForm.idMetodo} onChange={(e) => setPagoForm({ ...pagoForm, idMetodo: e.target.value })} required>
                                    <option value="">Seleccione</option>
                                    {metodosPago.map((m) => (
                                        <option key={m.idMetodo} value={m.idMetodo}>{m.nombreMetodo}</option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" className="btn-submit w-100">Registrar Pago</button>
                        </form>
                    </section>

                    <section className="image-section-cell">
                        <h2 className="avatar-preview-text">Historial de Pagos</h2>
                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {historialPagos.length === 0 ? (
                                <p className="text-secondary text-center">No hay pagos registrados.</p>
                            ) : (
                                historialPagos.map((p) => (
                                    <div key={p.idPago} style={{ background: '#1f1f1f', padding: '12px', borderRadius: '8px', marginBottom: '10px' }}>
                                        <p className="font-size-sm text-secondary">{p.idPago}</p>
                                        <p className="font-size-lg" style={{ color: '#2ecc71' }}>$ {Number(p.montoPagado).toLocaleString('es-CO')}</p>
                                        <p className="font-size-sm text-muted">{p.nombreMetodo} | {p.fechaPago}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default AdminPagos;
