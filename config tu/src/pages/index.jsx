
import { Link } from 'react-router-dom'; 

function Inicio() {
  return (
    <>
      <nav className="top-nav">
        <Link to="/">TITAN SPORTS 2026</Link>
      </nav>

      <header className="main-header">
        <div className="header-container">
          <div className="logo-principal-cell">
            <div className="logo-principal">
              <div className="logo-circle">
                <img src="../img/logo kimuka.png" alt="Logo" />
              </div>
              <h1>Kimuka ERP</h1>
            </div>
          </div>
          <div className="header-actions-cell">
            {/* CORRECCIÓN 3: Se quitaron los <button> de encima y se dejó solo el <Link> con la clase */}
            <Link to="/login" className="btn-login">Ingresar</Link>
          </div>
        </div>
      </header>

      <main className="content-wrapper">
        <h2 className="form-title text-center margin-b-10">Panel de Control General</h2>
        <p className="text-center color-secondary margin-b-40">Seleccione el módulo del sistema al que desea acceder</p>

        <div className="card-grid">
          <div className="panel-gestion module-card">
            <h3>Módulo de Suministros</h3>
            <p className="color-secondary font-size-sm margin-block-15">Administración de inventarios, telas y materias primas en stock.</p>
            <Link to="/materia-prima" className="btn-login w-100">Abrir Inventario</Link>
          </div>

          <div className="panel-gestion module-card">
            <h3>Gestión de Pedidos</h3>
            <p className="color-secondary font-size-sm margin-block-15">Control de solicitudes de confección, clientes y estados de entrega.</p>
            <Link to="/gestion-pedidos" className="btn-login w-100">Ver Pedidos</Link>
          </div>

          <div className="panel-gestion module-card">
            <h3>Control de Operarios</h3>
            <p className="color-secondary font-size-sm margin-block-15">Gestión de talento humano, registros de ingresos y horas trabajadas.</p>
            <Link to="/registro-personal" className="btn-login w-100">Administrar Personal</Link>
          </div>

          <div className="panel-gestion module-card">
            <h3>Módulo de Analítica</h3>
            <p className="color-secondary font-size-sm margin-block-15">Reportes de rendimiento, gráficos analíticos y balances mensuales.</p>
            <Link to="/reporte-pedidos" className="btn-login w-100">Ver Dashboard</Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default Inicio;