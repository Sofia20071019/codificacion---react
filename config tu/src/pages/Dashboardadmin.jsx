import Footer from "../components/Footer"; 

function Dashboardadmin() {
    return (
        <>

            <nav className="top-nav">
                <h3>INICIO</h3>
            </nav>

            <header className="main-header">

                <div className="logo-principal">
                    <div className="logo-circle">
                        <img src="/img/logo-kimuka.png" alt="Logo" />
                    </div>

                    <h1>Kimuka</h1>
                </div>

                <div style={{display:"flex", gap:"10px"}}>
                    <button className="btn-login">
                        Administrador
                    </button>

                    <button className="btn-login">
                        Cerrar sesión
                    </button>
                </div>

            </header>

            <main className="content">

                <div className="hero-container">

                    <img
                        src="/img/dashboard-admin.jpg"
                        alt=""
                        className="hero-img"
                    />

                    <div className="hero-overlay">

                        <h1>
                            Sistema de Gestión Interna
                        </h1>

                        <h1>
                            Titan Sports
                        </h1>

                    </div>

                </div>

                <br />

                <h2>Módulos del sistema</h2>

                <br />

                <div
                    style={{
                        display:"grid",
                        gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",
                        gap:"30px"
                    }}
                >

                    <Link
                        to="/empleados"
                        style={{textDecoration:"none"}}
                    >

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

                            <h2>Gestión de empleados</h2>

                        </div>

                    </Link>

                    <Link
                        to="/reportes"
                        style={{textDecoration:"none"}}
                    >

                        <div className="card">

                            <img
                                src="/img/reportes.jpg"
                                alt=""
                                style={{
                                    width:"100%",
                                    height:"220px",
                                    objectFit:"cover",
                                    borderRadius:"20px"
                                }}
                            />

                            <br />

                            <h2>Panel de reportes</h2>

                        </div>

                    </Link>

                </div>

            </main>
            
            <Footer/>
        </>
    );
}

export default Dashboardadmin;