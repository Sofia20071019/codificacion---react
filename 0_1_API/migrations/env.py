from logging.config import fileConfig
import os
from dotenv import load_dotenv

from sqlalchemy import engine_from_config, create_engine
from sqlalchemy import pool

from alembic import context

# 1. 🔌 CARGAR LAS VARIABLES DEL ARCHIVO .ENV DE FORMA INDIVIDUAL
load_dotenv()

DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_HOST = os.getenv("DB_HOST", "127.0.0.1")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "kimuka2_db")

# 2. 🛠️ ARMAR LA URL DINÁMICA EN EL FORMATO CORRECTO PARA MYSQL
DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# 3. 🤐 INYECTAR LA URL DINÁMICA EN LA CONFIGURACIÓN DE ALEMBIC
# Esto hace que la línea 89 de alembic.ini ya no sea obligatoria
config.set_main_option("sqlalchemy.url", DATABASE_URL)

# Interpret the config file for Python logging.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# 4. 🗂️ VINCULAR LOS MODELOS (Crucial para que 'alembic revision --autogenerate' funcione)
from app.database.connection import Base
# Importamos tus modelos aquí para que Alembic sepa que existen al escanear la app
from app.models.test_model import RegistroPrueba 

target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    # Usamos create_engine directamente con nuestra URL dinámica para evitar conflictos de lectura del .ini
    connectable = create_engine(DATABASE_URL, poolclass=pool.NullPool)

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
