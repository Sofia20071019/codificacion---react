import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'; 

function Editarempleados(){
    const { id } = useParams(); // Captura el ID del empleado desde la ruta
    const navigate = useNavigate();
    
    // CORRECCIÓN: Cambiado el puerto a 5000 para que coincida con tu backend simulado
    const API_URL = `http://localhost:5000/personal/${id}`; 

    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        celular: "",
        password: "",
        foto: "",
        edad: "",
        fechaRegistro: "",
        rol: ""
    });

    // Cargar datos actuales del empleado a editar
    useEffect(() => {
        if (!id) return; // Seguridad por si no llega un ID válido en la URL
        
        fetch(API_URL)
            .then((res) => {
                if (!res.ok) throw new Error("No se encontró el usuario");
                return res.json();
            })
            .then((data) => setFormData(data))
            .catch((err) => console.error("Error al traer el empleado:", err));
    }, [id, API_URL]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // OPTIMIZACIÓN: Se envía el formData completo asegurando mantener rol, edad, etc.
        fetch(API_URL, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        .then((res) => {
            if(res.ok) {
                alert("¡Cambios guardados exitosamente en Kimuka!");
                navigate("/gestion-empleados");
            } else {
                alert("Hubo un problema al guardar los cambios.");
            }
        })
        .catch((err) => console.error("Error al actualizar:", err));
    };

    return (
        <div className="dark-theme">
            <nav className="top-nav">
                <Link to="/gestion-empleados" className="no-text-decor">VOLVER</Link>
            </nav>

            <header className="main-header">
                <div className="header-container">
                    <div className="logo-principal-cell">
                        <div className="logo-principal">
                            <div className="logo-circle">
                                <img src="../img/logo kimuka.png" alt="logo Kimuka"/>
                            </div>
                            <h1>Editar Personal</h1>
                        </div>
                    </div>
                    <div className="header-actions-cell">
                        <button className="btn-login">Administrador</button>
                    </div>
                </div>
            </header>

            <main className="content-wrapper">
                <div className="panel-registro">
                    <section className="form-section-cell">
                        <h2 className="form-title">Editar Perfil</h2>
                        <form className="grid-form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>Nombres De La Persona</label>
                                <input type="text" name="nombre" value={formData.nombre || ""} onChange={handleChange} required/>
                            </div>
                            <div className="input-group">
                                <label>Apellidos De La Persona</label>
                                <input type="text" name="apellido" value={formData.apellido || ""} onChange={handleChange} required/>
                            </div>
                            <div className="input-group">
                                <label>Correo Electrónico</label>
                                <input type="email" name="email" value={formData.email || ""} onChange={handleChange} required/>
                            </div>
                            <div className="input-group">
                                <label>Número De Celular</label>
                                <input type="text" name="celular" value={formData.celular || ""} onChange={handleChange} required/>
                            </div>
                            <div className="input-group">
                                <label>Contraseña asignada</label>
                                <input type="password" name="password" value={formData.password || ""} onChange={handleChange} required/>
                            </div>
                            <button type="submit" className="btn-submit">Guardar cambios</button>
                        </form>
                    </section>

                    <section className="image-section-cell">
                        <h2 className="avatar-preview-text">Foto-Trabajador</h2>
                        <div className="portrait-wrapper">
                            <img src={formData.foto || "../img/registroDePersonal kk .png"} alt="Vista previa"/>
                        </div>
                        <div className="margin-t-15">
                            <input type="file" className="font-size-sm" accept="image/*"/>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Editarempleados;