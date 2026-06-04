import Footer from "../components/Footer";

function PanelReportes() {

    return (

        <>

            <nav className="top-nav">
                <h3>PANEL DE REPORTES</h3>
            </nav>

            <header className="main-header">

                <div className="logo-principal">

                    <div className="logo-circle">
                        <img
                            src="/img/logo-kimuka.png"
                            alt=""
                        />
                    </div>

                    <h1>Kimuka</h1>

                </div>

                <button className="btn-login">
                    Administrador
                </button>

            </header>

            <main className="Reportes-container">

                <h2>Reportes disponibles</h2>

                <br />

                <div
                    style={{
                        display:"grid",
                        gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
                        gap:"30px"
                    }}
                >

                    <div className="card">

                        <img
                            src="/img/inventario.jpg"
                            alt=""
                            style={{
                                width:"100%",
                                height:"220px",
                                objectFit:"cover",
                                borderRadius:"20px"
                            }}
                        />

                        <br />

                        <h2>
                            Reporte de Inventario
                        </h2>

                    </div>

                    <div className="card">

                        <img
                            src="/img/pedidos.jpg"
                            alt=""
                            style={{
                                width:"100%",
                                height:"220px",
                                objectFit:"cover",
                                borderRadius:"20px"
                            }}
                        />

                        <br />

                        <h2>
                            Reporte de Pedidos
                        </h2>

                    </div>

                    <div className="card">

                        <img
                            src="/img/empleados.jpg"
                            alt=""
                            style={{
                                width:"100%",
                                height:"220px",
                                objectFit:"cover",
                                borderRadius:"20px"
                            }}
                        />

                        <br />

                        <h2>
                            Reporte de Empleados
                        </h2>

                    </div>

                </div>

            </main>
            
            <Footer/>
        </>

    );
}

export default PanelReportes;