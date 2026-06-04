import Footer from "../components/Footer";

function Editarempleados(){
    return (

        <>
            <nav className="top-nav"><a href="index.html">VOLVER </a></nav>

            <header className="main-header">
                <div className="logo-principal">
                    <div className="logo-circle">
                        <img src="../img/logo kimuka.png" alt="logo Kimuka"/>
                    </div>
                    <h1>Editar Personal </h1>
                </div>
                <button className="btn-login"><a href="RegistroDePersonal.html">Ver Personal Actual</a></button>
            </header>

            <main className="registro-container">
                <div className="panel-registro">
                <section className="form-section">
                    <h2 className="form-title">Editar</h2>
                    
                    <form className="grid-form">
                        <div className="input-group">
                            <label>Nombres De La Persona</label>
                            <input type="text" placeholder="Lura Jimena"/>
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

                        <div className="input-group full-width">
                            <label>Contraseña asignada</label>
                            <input type="password" placeholder="11391912900"/>
                        </div>

                        <button type="submit" class="btn-registrar">Guardar cambios</button>
                    </form>

                </section>

                    <section className="image-section">
                        <h2 className="img-label">Foto-Trabajador</h2>
                        <div className="portrait-wrapper">
                            <img src="../img/registroDePersonal kk .png" id="vista-previa" alt="Vista previa"/>
                        </div>

                        <div className="upload-btn-wrapper">
                            <input type="file" id="foto-input" accept="image/*"/>
                        </div>
                    </section>
                </div>
            </main>

            <Footer/>

        </>
        
    )
}

export default Editarempleados