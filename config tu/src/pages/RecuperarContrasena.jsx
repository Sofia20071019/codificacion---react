import { Link } from 'react-router-dom';

function RecuperarContrasena() {
  const handleRecuperar = (e) => {
    e.preventDefault();
    // Aquí puedes añadir la lógica operativa más adelante
    alert('Solicitud enviada al administrador.');
  };

  return (
    <>
      <nav className="top-nav">
        {/* Corrección: Apuntar a la ruta del enrutador de React, no al archivo .html */}
        <Link to="/login">VOLVER</Link>
      </nav>

      <main className="content-wrapper flex-center">
        <div className="panel-registro max-w-500">
          <div className="form-section-cell w-100">
            <h2 className="form-title font-size-lg text-center margin-b-20">Restablecer Contraseña</h2>
            <p className="text-muted font-size-md text-center margin-b-25">
              Ingrese el correo institucional de su administrador registrado. Él se encargará de darle una nueva contraseña.
            </p>

            <form className="grid-form" id="form-recuperar" onSubmit={handleRecuperar}>
              <div className="input-group">
                <label htmlFor="recuperar-email">Correo Electrónico Corporativo</label>
                {/* Corrección: input autocontenido /> */}
                <input 
                  type="email" 
                  id="recuperar-email" 
                  placeholder="ejemplo@titansports.com" 
                  required 
                />
              </div>

              <button type="submit" className="btn-submit w-100 margin-t-15">Enviar</button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default RecuperarContrasena;