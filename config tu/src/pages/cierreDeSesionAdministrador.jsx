import { Link } from 'react-router-dom'; 
function CierreDeSesionAdministrador() {

  return (
    <>

    <nav className="top-nav"><Link to="index.jsx">CANCELAR ACCIÓN</Link></nav>

    <main className="content-wrapper flex-center">
        <div className="panel-registro max-w-550 text-center display-block">
            <h2 className="form-title margin-b-15">¿Cerrar Sesión Administrativa?</h2>
            <p className="text-muted margin-b-35">Se guardarán todos los cambios pendientes en el servidor del inventario textil y las bitácoras operativas.</p>
            
            <div className="flex-row-gap-10">
                <button className="btn-login" id="btn-permanecer"><Link to="/dashboardadmin">Permanecer</Link></button>
                <button className="btn-submit btn-alert-color" id="btn-confirmar-salida"><Link to="/">Confirmar Salida</Link> </button>
            </div>
        </div>
    </main>
    

    </>
  )
}
export default CierreDeSesionAdministrador