# =============================================================================
# ARCHIVO: run.py
# PROPOSITO: Punto de entrada principal de la aplicacion Flask. Este script
#            instancia la aplicacion mediante la fabrica create_app() y la
#            ejecuta. El modo debug se controla via variable de entorno
#            FLASK_DEBUG=true (solo en desarrollo, NUNCA en produccion).
# =============================================================================

import os

# Importar la funcion factory que genera y configura la instancia de Flask
from app import create_app

# Crear la instancia de la aplicacion Flask usando la fabrica de aplicaciones
app = create_app()


# Verificar si el script se ejecuta directamente (no importado como modulo)
# para iniciar el servidor de desarrollo de Flask
if __name__ == "__main__":
    # CORRECCION DE SEGURIDAD: debug mode controlado por variable de entorno.
    # En produccion FLASK_DEBUG no debe existir o debe ser "false".
    # En desarrollo local: agregar FLASK_DEBUG=true al archivo .env
    debug_mode = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    app.run(debug=debug_mode)
