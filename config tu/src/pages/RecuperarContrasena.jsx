import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

function RecuperarContrasena() {
  const [correo, setCorreo] = useState('');

  const handleRecuperar = async (e) => {
    e.preventDefault();
    try {
      await api.auth.recuperarContrasena(correo);
      alert('Solicitud enviada al administrador.');
    } catch (error) {
      alert(error.message || 'Correo no registrado.');
    }
  };

  return (
    <>
      <nav className="top-nav">
        <Link to="/login">VOLVER</Link>
      </nav>

      <main className="content-wrapper flex-center">
        <div className="panel-registro max-w-500">
          <div className="form-section-cell w-100">
            <h2 className="form-title font-size-lg text-center margin-b-20">Restablecer Contraseña</h2>
            <p className="text-muted font-size-md text-center margin-b-25">
              Ingrese el correo institucional. El administrador se encargará de darle una nueva contraseña.
            </p>

            <form className="grid-form" onSubmit={handleRecuperar}>
              <div className="input-group">
                <label>Correo Electrónico Corporativo</label>
                <input
                  type="email"
                  placeholder="ejemplo@titansports.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-submit w-100 margin-t-15">Enviar</button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default RecuperarContrasena;
