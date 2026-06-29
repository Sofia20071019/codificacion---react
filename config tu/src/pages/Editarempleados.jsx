import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';

function Editarempleados() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [adminName, setAdminName] = useState('ADMINISTRADOR');
    const [formData, setFormData] = useState({
        pNombre: "",
        sNombre: "",
        pApellido: "",
        sApellido: "",
        correo: "",
        password: "",
        idRol: ""
    });

    useEffect(() => {
        const usuarioLogueado = localStorage.getItem('usuarioLogueado');
        if (usuarioLogueado) {
            const user = JSON.parse(usuarioLogueado);
            if (user.nombre) setAdminName(user.nombre.toUpperCase());
        }

        if (!id) return;
        api.usuarios.obtener(id)
            .then((res) => {
                const u = res.data;
                setFormData({
                    pNombre: u.pNombre || "",
                    sNombre: u.sNombre || "",
                    pApellido: u.pApellido || "",
                    sApellido: u.sApellido || "",
                    correo: u.correo || "",
                    password: "",
                    idRol: u.idRol || ""
                });
            })
            .catch((err) => console.error("Error al traer el empleado:", err));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.usuarios.actualizar(id, formData);
            alert("¡Cambios guardados exitosamente en Kimuka!");
            navigate("/empleados");
        } catch (err) {
            alert("Hubo un problema al guardar los cambios.");
        }
    };

    return (
        <div className="dark-theme">
            <nav className="top-nav">
                <Link to="/empleados" className="no-text-decor">VOLVER</Link>
            </nav>

            <header className="main-header">
                <div className="header-container">
                    <div className="logo-principal-cell">
                        <div className="logo-principal">
                            <div className="logo-circle">
                                <img src="../img/logo kimuka.png" alt="logo Kimuka" />
                            </div>
                            <h1>Editar Personal</h1>
                        </div>
                    </div>
                    <div className="header-actions-cell">
                        <button className="btn-login">{adminName}</button>
                    </div>
                </div>
            </header>

            <main className="content-wrapper">
                <div className="panel-registro">
                    <section className="form-section-cell">
                        <h2 className="form-title">Editar Perfil</h2>
                        <form className="grid-form" onSubmit={handleSubmit}>
                            <div className="input-row">
                                <div className="input-cell">
                                    <label>Primer Nombre</label>
                                    <input type="text" name="pNombre" value={formData.pNombre} onChange={handleChange} required />
                                </div>
                                <div className="input-cell">
                                    <label>Segundo Nombre</label>
                                    <input type="text" name="sNombre" value={formData.sNombre} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="input-row">
                                <div className="input-cell">
                                    <label>Primer Apellido</label>
                                    <input type="text" name="pApellido" value={formData.pApellido} onChange={handleChange} required />
                                </div>
                                <div className="input-cell">
                                    <label>Segundo Apellido</label>
                                    <input type="text" name="sApellido" value={formData.sApellido} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Correo Electrónico</label>
                                <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />
                            </div>

                            <div className="input-group">
                                <label>Nueva Contraseña (dejar vacío para mantener)</label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} />
                            </div>

                            <button type="submit" className="btn-submit">Guardar cambios</button>
                        </form>
                    </section>

                    <section className="image-section-cell">
                        <h2 className="avatar-preview-text">Foto-Trabajador</h2>
                        <div className="portrait-wrapper">
                            <img src="../img/registroDePersonal kk .png" alt="Vista previa" />
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Editarempleados;
