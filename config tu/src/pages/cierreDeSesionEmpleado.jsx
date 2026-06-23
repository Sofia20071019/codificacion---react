import { Link } from 'react-router-dom';
function CierreDeSesionEmpleado() {

  return (
    <>

    <nav className="top-nav"><Link to="index.html">VOLVER</Link></nav>

    <header className="main-header">
        <div className="header-container">
            <div className="logo-principal-cell">
                <div className="logo-principal">
                    <div className="logo-circle"><img src="../img/logo kimuka.png" alt="Logo"></img></div>
                    <h1>Kimuka - Cierre de Jornada</h1>
                </div>
            </div>
            <div clsassName="header-actions-cell">
                <button className="btn-login"><Link to="#">Jimena Martínez</Link></button>
            </div>
        </div>
    </header>

    
    <main className="content-wrapper">
        <div className="panel-registro">
            <div className="image-section-cell">
                <div className="portrait-wrapper">
                    <img src="../img/horasDeTrabajadores kk.png" alt="Salida"></img>
                </div>
            </div>

            <div className="form-section-cell">
                <h2 className="user-name text-center margin-b-25 font-size-xl">Cierre de Turno</h2>
                
                <form className="grid-form" id="form-salida">
                    <div className="input-group">
                        <label for="hora-salida">Marque la hora de Fin</label>
                        <input type="time" id="hora-salida" value="18:00" required></input>
                    </div>

                    <div className="input-group">
                        <label for="fecha-salida">Ingrese el día</label>
                        <input type="date" id="fecha-salida" value="2026-05-29" required></input>
                    </div>

                    <button type="submit" className="btn-submit w-100 margin-t-15 btn-alert-color">Registrar Salida y Salir</button>
                </form>
            </div>
        </div>
    </main>
    
    </>
  )
}
export default CierreDeSesionEmpleado