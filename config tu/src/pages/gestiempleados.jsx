import Footer from "../components/Footer";

function gestionempleados(){
    return (

        <>
            <nav class="top-nav"><a href="index.html">VOLVER </a></nav>

            <header class="main-header">
                <div class="logo-principal">
                    <div class="logo-circle">
                        <img src="../img/logo kimuka.png" alt="logo Kimuka"/>
                    </div>
                    <h1>Kimuka- Registro De Personal </h1>
                </div>
                <button class="btn-login"><a href="RegistroDePersonal.html">Ver Personal Actual</a></button>
            </header>

            <main class="registro-container">
                <div class="panel-registro">
                <section class="form-section">
                    <h2 class="form-title">Registrar</h2>
                    
                    <form class="grid-form">
                        <div class="input-group">
                            <label>Nmbres De La Persona</label>
                            <input type="text" placeholder="Lura Jimena"/>
                        </div>
                        <div class="input-group">
                            <label>Apelldios De La Persona</label>
                            <input type="text" placeholder="Valderrama Vaquero"/>
                        </div>

                        <div class="input-group">
                            <label>Correo Electronico</label>
                            <input type="number" placeholder="19"/>
                        </div>

                        <div class="input-group">
                            <label>Correo Electronico</label>
                            <input type="email" placeholder="hola@sitioincreible.co"/>
                        </div>

                        <div class="input-group">
                            <label>Numero De Celular</label>
                            <input type="text" placeholder="32634789"/>
                        </div>

                        <div class="input-group">
                            <label  >Fecha De Registro</label>
                            <input type="date"  class="input-estilo"/>
                        </div>

                        <div class="input-group full-width">
                            <label>Contraseña asignada</label>
                            <input type="password" placeholder="11391912900"/>
                        </div>

                        <button type="submit" class="btn-registrar">Registrar</button>
                    </form>

                </section>

                    <section class="image-section">
                        <h2 class="img-label">Foto-Trabajador</h2>
                        <div class="portrait-wrapper">
                            <img src="../img/registroDePersonal kk .png" id="vista-previa" alt="Vista previa"/>
                        </div>

                        <div class="upload-btn-wrapper">
                            <input type="file" id="foto-input" accept="image/*"/>
                        </div>
                    </section>
                </div>
            </main>

            <Footer/>

        </>
        
    )
}