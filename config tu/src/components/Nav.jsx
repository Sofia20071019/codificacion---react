import {Link} from 'react-router-dom';

function Nav() {
    return(
        <nav class="top-nav">
            <Link to="/">TITAN SPORTS &copy; 2026</Link> &nbsp;|&nbsp;
            <Link to="/">INICIO</Link> &nbsp;|&nbsp;
            <Link to="/gestionProduccion">MÓDULO INVENTARIO</Link> &nbsp;|&nbsp;
            <Link to="/gestionPedidos">MÓDULO PEDIDOS</Link>
        </nav>
    )
}

export default Nav