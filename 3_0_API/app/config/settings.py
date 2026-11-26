# =============================================================================
# ARCHIVO: settings.py
# PROPOSITO: Modulo de configuracion centralizada de la aplicacion Flask.
#            Carga las variables de entorno desde un archivo .env y define
#            la clase Config con todas las configuraciones necesarias para
#            el funcionamiento de la API, incluyendo la clave secreta de
#            Flask y la URI de conexion a la base de datos MySQL.
# =============================================================================

# Importar el modulo os para acceder a variables de entorno del sistema
# operativo y configuraciones del entorno de ejecucion
import os
from pathlib import Path
from urllib.parse import quote_plus
from dotenv import load_dotenv

# Construir la ruta absoluta al archivo .env ubicado en la raiz del
# proyecto (tres niveles arriba desde este archivo: config/ -> app/ -> 3_0_API/)
env_path = Path(__file__).resolve().parent.parent.parent / ".env"

# Cargar todas las variables definidas en el archivo .env al entorno
# del proceso actual, haciendolas disponibles via os.getenv()
load_dotenv(env_path)


def _construir_mysql_uri(nombre_bd):
    """Construye la URI de MySQL codificando caracteres especiales de la clave."""
    usuario = quote_plus(os.getenv("MYSQL_USER") or "root")
    password = quote_plus(os.getenv("MYSQL_PASSWORD") or "")
    host = os.getenv("MYSQL_HOST") or "127.0.0.1"
    port = os.getenv("MYSQL_PORT") or "3306"
    return f"mysql+pymysql://{usuario}:{password}@{host}:{port}/{nombre_bd}?charset=utf8mb4"


class Config:
    """
    Clase de configuracion principal de la aplicacion Flask.
    Contiene todas las constantes y ajustes necesarios para el
    funcionamiento correcto de la API REST y su conexion a la
    base de datos MySQL.
    """

    # Clave secreta de Flask utilizada para firmar sesiones, tokens JWT
    # y otros datos sensibles. Se obtiene de la variable de entorno
    # SECRET_KEY, con un valor por defecto para entorno de desarrollo
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-key-cambiar-en-produccion")

    # URI de conexion a la base de datos MySQL: acepta DATABASE_URL directa
    # o la construye desde las variables MYSQL_* con driver PyMySQL.
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL") or _construir_mysql_uri(
        os.getenv("MYSQL_DATABASE") or "Kimuka3_db"
    )

    # MySQL cierra conexiones inactivas: evita "MySQL server has gone away" en produccion
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
        "pool_recycle": 280,
    }

    # Desactivar el seguimiento de modificaciones de SQLAlchemy para
    # reducir el uso de memoria y mejorar el rendimiento.
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
    SQLALCHEMY_ENGINE_OPTIONS = {}
    WTF_CSRF_ENABLED = False


class IntegrationTestingConfig(Config):
    """
    Configuracion para las pruebas de integracion. Usa una base de datos MySQL
    REAL pero exclusiva de pruebas (por defecto Kimuka3_test), distinta a la de
    desarrollo. El nombre se toma de MYSQL_TEST_DATABASE en el archivo .env.
    """

    TESTING = True
    BCRYPT_LOG_ROUNDS = 4  # hash rapido solo para pruebas
    SQLALCHEMY_DATABASE_URI = _construir_mysql_uri(
        os.getenv("MYSQL_TEST_DATABASE", "Kimuka3_test")
    )
