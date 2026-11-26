# =============================================================================
# ARCHIVO: wsgi.py
# PROPOSITO: Punto de entrada WSGI para servidores de produccion como Gunicorn.
#            Gunicorn no usa run.py directamente; necesita este modulo que
#            expone la instancia de la app Flask como "app".
#
# USO en produccion (en el servidor EC2):
#   gunicorn --workers 3 --bind unix:kimuka.sock -m 007 wsgi:app
#
# USO para prueba local con Gunicorn:
#   gunicorn --bind 0.0.0.0:5000 wsgi:app
# =============================================================================

from werkzeug.middleware.proxy_fix import ProxyFix
from app import create_app

# Crear la instancia de la aplicacion usando la fabrica
app = create_app()

# Confiar en las cabeceras X-Forwarded-* enviadas por Nginx (Paso 8.3 de la guia)
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1)
