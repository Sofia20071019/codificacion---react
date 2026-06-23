import { Link } from 'react-router-dom'; 

function CierreDeSesionAdministrador() {
  // Definimos el nombre del usuario con sesión activa
  const usuarioActivo = "Brayan Valderrama";

  return (
    <>
      {/* Se corrigió "index.jsx" por "/" para un enrutamiento válido en React */}
      <nav className="top-nav">
        <Link to="/">CANCELAR ACCIÓN</Link>
      </nav>

      <main className="content-wrapper flex-center">
          <div className="panel-registro max-w-550 text-center display-block">
              <h2 className="form-title margin-b-15">¿Cerrar Sesión de {usuarioActivo}?</h2>
              <p className="text-muted margin-b-35">
                Se guardarán todos los cambios pendientes en el servidor del inventario textil y las bitácoras operativas.
              </p>
              
              <div className="flex-row-gap-10">
                  <button className="btn-login" id="btn-permanecer">
                    <Link to="/dashboardadmin">Permanecer</Link>
                  </button>
                  <button className="btn-submit btn-alert-color" id="btn-confirmar-salida">
                    <Link to="/">Confirmar Salida</Link> 
                  </button>
              </div>
          </div>
      </main>
    </>
  );
}

export default CierreDeSesionAdministrador;