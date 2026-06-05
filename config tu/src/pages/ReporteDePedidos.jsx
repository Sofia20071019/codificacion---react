import { Link } from 'react-router-dom';
function ReporteDePedidos() {

  return (
    <>

    <nav className="top-nav"><Link to="index.html">VOLVER MENÚ</Link></nav>

    <header className="main-header">
        <div className="header-container">
            <div className="logo-principal-cell">
                <div className="logo-principal">
                    <div className="logo-circle"><img src="../img/logo kimuka.png" alt="Logo"></img></div>
                    <h1>Kimuka - Reporte De Pedidos</h1>
                </div>
            </div>
            <div className="header-actions-cell">
                <button className="btn-login"><Link to="/dashboardadmin">Administrador</Link></button>
                <button className="btn-login"><Link to="/cierre-admin">Cerrar Sesión</Link></button>
            </div>
        </div>
    </header>

    <main className="content-wrapper">
        <div className="img-principal">
            <img src="../img/panelDeReportes kk  .png" alt="Análisis Operativo"></img>
        </div>

        <div className="toolbar">
            <h2 className="table-title">Reporte de pedidos / Materiales</h2>
        </div>

        <section className="panel-gestion">
            <div className="filters-grid">
                <div className="filter-cell">
                    <label for="filtro-mes">Mes de Análisis</label>
                    <select id="filtro-mes" className="filter-select">
                        <option value="todos">Seleccionar mes</option>
                        <option value="01">Enero</option>
                        <option value="02">Febrero</option>
                        <option value="03">Marzo</option>
                    </select>
                </div>
                <div className="filter-cell">
                    <label for="filtro-material">Material Solicitado</label>
                    <select id="filtro-material" className="filter-select">
                        <option value="todos">Seleccionar material</option>
                        <option value="Seda">Seda</option>
                        <option value="Algodón">Algodón</option>
                        <option value="Lino">Lino</option>
                    </select>
                </div>
                <div className="filter-cell">
                    <label for="filtro-estado-reporte">Filtrado por Estado</label>
                    <select id="filtro-estado-reporte" className="filter-select">
                        <option value="todos">Filtrar Estado</option>
                        <option value="✔">Entregados</option>
                        <option value="✖">Cancelados</option>
                        <option value="..">En proceso</option>
                    </select>
                </div>
            </div>
        </section>

        <section className="panel-gestion">
            <div className="stats-container">
                <div className="stats-cell-left">
                    <div className="chart-box">
                        <canvas id="graficoPedidos"></canvas>
                    </div>
                </div>
                <div className="stats-cell-right">
                    <div className="highlight-info">
                        <h4>Top Comprador</h4>
                        <p id="mejor-cliente">Esperando filtro...</p>
                        <small id="detalle-material" className="display-block margin-t-10 text-muted"></small>
                    </div>
                </div>
            </div>
        </section>
    </main>
    
    </>
  )
}
export default ReporteDePedidos