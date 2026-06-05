
import { Link } from 'react-router-dom'; 

function Editarempleados(){
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
                                <img src="../img/logo kimuka.png" alt="logo Kimuka"/>
                            </div>
                            <h1>Editar Personal</h1>
                        </div>
                    </div>
                    <div className="header-actions-cell">
                        <button className="btn-login">Ver Personal Actual</button>
                    </div>
                </div>
            </header>

            <main className="content-wrapper">
                <div className="panel-registro">
                    <section className="form-section-cell">
                        <h2 className="form-title">Editar</h2>
                        <form className="grid-form">
                            <div className="input-group">
                                <label>Nombres De La Persona</label>
                                <input type="text" placeholder="Laura Jimena"/>
                            </div>
                            <div className="input-group">
                                <label>Apellidos De La Persona</label>
                                <input type="text" placeholder="Valderrama Vaquero"/>
                            </div>
                            <div className="input-group">
                                <label>Correo Electrónico</label>
                                <input type="email" placeholder="hola@sitioincreible.co"/>
                            </div>
                            <div className="input-group">
                                <label>Número De Celular</label>
                                <input type="text" placeholder="32634789"/>
                            </div>
                            <div className="input-group">
                                <label>Contraseña asignada</label>
                                <input type="password" placeholder="11391912900"/>
                            </div>
                            <button type="submit" className="btn-submit">Guardar cambios</button>
                        </form>
                    </section>

                    <section className="image-section-cell">
                        <h2 className="avatar-preview-text">Foto-Trabajador</h2>
                        <div className="portrait-wrapper">
                            <img src="../img/registroDePersonal kk .png" alt="Vista previa"/>
                        </div>
                        <div className="margin-t-15">
                            <input type="file" className="font-size-sm" accept="image/*"/>
                        </div>
                    </section>
                </div>
            </main>

        </div>
    )
}

export default Editarempleados;