import { Link, useNavigate } from 'react-router-dom'; 
import { useState, useEffect } from 'react';

function CierreDeSesionAdministrador() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('ADMINISTRADOR');

  useEffect(() => {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    const nombreSesion = localStorage.getItem('kimuka_sesion_activa');

    if (usuarioLogueado) {
      const user = JSON.parse(usuarioLogueado);
      if (user.nombre) setAdminName(user.nombre.toUpperCase());
    } else if (nombreSesion) {
      setAdminName(nombreSesion.toUpperCase());
    }
  }, []);

  const handleCierreSesion = () => {
    localStorage.removeItem('kimuka_sesion_activa');
    localStorage.removeItem('usuarioLogueado');
    sessionStorage.clear();
    navigate('/login', { replace: true });
  };

  return (
    <>
      <nav className="top-nav">
        <Link to="/dashboardadmin" className="no-text-decor">CANCELAR ACCIÓN</Link>
      </nav>

      <main className="content-wrapper flex-center">
        <div className="panel-registro max-w-550 text-center display-block">
          <h2 className="form-title margin-b-15">¿Cerrar Sesión de {adminName}?</h2>
          <p className="text-muted margin-b-35">
            Se guardarán todos los cambios pendientes en el servidor del inventario textil y las bitácoras operativas.
          </p>
          
          {/* 🌟 Clases estructurales puras de tu CSS para la alineación */}
          <div className="flex-row-gap-10 container-actions-center">
            <button className="btn-login" id="btn-permanecer">
              <Link to="/dashboardadmin" className="no-text-decor">Permanecer</Link>
            </button>
            <button 
              className="btn-submit btn-alert-color" 
              id="btn-confirmar-salida"
              onClick={handleCierreSesion}
            >
              Confirmar Salida
            </button> 
          </div>
        </div>
      </main>
    </>
  );
}

export default CierreDeSesionAdministrador;