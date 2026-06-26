import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'; 

function Editarempleados(){
    const { id } = useParams(); 
    const navigate = useNavigate();
    const API_URL = `http://localhost:5000/personal/${id}`; 

    const [adminName, setAdminName] = useState('ADMINISTRADOR');
    const [formData, setFormData] = useState({
        id: "",
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

    useEffect(() => {
        // Cargar nombre del administrador activo transformado a mayúsculas sostenidas
        const usuarioLogueado = localStorage.getItem('usuarioLogueado');
        if (usuarioLogueado) {
            const user = JSON.parse(usuarioLogueado);
            if (user.nombre) {
                setAdminName(user.nombre.toUpperCase());
            }
        }

        if (!id) return; 
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

    const handleFotoChange = (e) => {
        const archivo = e.target.files[0];
        if (archivo) {
            const nombreArchivo = archivo.name;
            setFormData({ ...formData, foto: `../img/${nombreArchivo}` });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch(API_URL, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        .then((res) => {
            if(res.ok) {
                alert("¡Cambios guardados exitosamente en Kimuka!");
                navigate("/empleados");
            } else {
                alert("Hubo un problema al guardar los cambios.");
            }
        })
        .catch((err) => console.error("Error al actualizar:", err));
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
                                <img src="../img/logo kimuka.png" alt="logo Kimuka"/>
                            </div>
                            <h1>Editar Personal</h1>
                        </div>
                    </div>
                    <div className="header-actions-cell">
                        {/* Muestra el nombre real del administrador logueado */}
                        <button className="btn-login">{adminName}</button>
                    </div>
                </div>
            </header>

            <main className="content-wrapper">
                <div className="panel-registro">
                    <section className="form-section-cell">
                        <h2 className="form-title">Editar Perfil (Campos restringidos)</h2>
                        <form className="grid-form" onSubmit={handleSubmit}>
                            
                            {/* Nombres y Apellidos (Bloqueados) */}
                            <div className="input-group">
                                <label>Nombres De La Persona (No Editable)</label>
                                <input type="text" name="nombre" value={formData.nombre || ""} disabled/>
                            </div>
                            <div className="input-group">
                                <label>Apellidos De La Persona (No Editable)</label>
                                <input type="text" name="apellido" value={formData.apellido || ""} disabled/>
                            </div>

                            {/* Edad y Rol (Bloqueados) */}
                            <div className="input-group">
                                <label>Edad (No Editable)</label>
                                <input type="number" name="edad" value={formData.edad || ""} disabled />
                            </div>
                            <div className="input-group">
                                <label>Rol / Perfil (No Editable)</label>
                                <input type="text" name="rol" value={formData.rol || ""} disabled />
                            </div>

                            {/* Fecha de Registro (Bloqueado) */}
                            <div className="input-group">
                                <label>Fecha de Registro (No Editable)</label>
                                <input type="date" name="fechaRegistro" value={formData.fechaRegistro || ""} disabled />
                            </div>

                            {/* Correo Electrónico (EDITABLE con validación) */}
                            <div className="input-group">
                                <label>Correo Electrónico *</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email || ""} 
                                    onChange={handleChange} 
                                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                    title="Por favor, introduzca un correo electrónico válido."
                                    required
                                />
                            </div>

                            {/* Número de Celular (EDITABLE con validación de Colombia) */}
                            <div className="input-group">
                                <label>Número De Celular *</label>
                                <input 
                                    type="text" 
                                    name="celular" 
                                    value={formData.celular || ""} 
                                    onChange={handleChange} 
                                    pattern="3[0-9]{9}"
                                    maxLength="10"
                                    title="El número de celular en Colombia debe iniciar con 3 y tener exactamente 10 dígitos numéricos."
                                    required
                                />
                            </div>

                            {/* Contraseña asignada (EDITABLE con restricción numérica) */}
                            <div className="input-group">
                                <label>Contraseña asignada (Identificación) *</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={formData.password || ""} 
                                    onChange={handleChange} 
                                    onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                    maxLength="16"
                                    title="La contraseña debe contener únicamente números."
                                    required
                                />
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
                            <label className="display-block margin-b-5">Actualizar Fotografía Corporativa</label>
                            <input type="file" className="font-size-sm" accept="image/*" onChange={handleFotoChange}/>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Editarempleados;