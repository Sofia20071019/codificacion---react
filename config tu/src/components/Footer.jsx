function Footer() {
    const anio = new Date().getFullYear();
    return (
        <footer className="main-footer">
            <p>Kimuka ERP - Titan Sports &copy; {anio}</p>
            <p>Datos de contacto del área de soporte.</p>
        </footer>
    );
}

export default Footer;