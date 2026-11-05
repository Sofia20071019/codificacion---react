# pylint: disable=redefined-outer-name,missing-function-docstring
# =============================================================================
# ARCHIVO: conftest.py
# PROPOSITO: Configuracion global de pytest y fixtures compartidas (fase
#            Arrange base). Crea una app Flask con SQLite en memoria y
#            destruye las tablas al finalizar cada prueba.
# =============================================================================

import pytest

from app import create_app
from app.config.settings import TestingConfig
from app.database.database import db, bcrypt
from app.models import EstadoUsuario, Rol, Usuario
from app.utils.jwt_utils import generar_token


@pytest.fixture
def app():
    flask_app = create_app(config_class=TestingConfig)
    with flask_app.app_context():
        db.create_all()
        yield flask_app
        db.session.remove()
        db.drop_all()


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def runner(app):
    return app.test_cli_runner()


def _asegurar_catalogos_base():
    """Inserta los roles y estados base si aun no existen."""
    if not db.session.get(Rol, "ROL-001"):
        db.session.add(Rol(idRol="ROL-001", nombreRol="ADMIN"))
    if not db.session.get(Rol, "ROL-002"):
        db.session.add(Rol(idRol="ROL-002", nombreRol="EMPLEADO"))
    if not db.session.get(EstadoUsuario, "EST-001"):
        db.session.add(EstadoUsuario(idEstado="EST-001", nombreEstado="ACTIVO"))
    if not db.session.get(EstadoUsuario, "EST-002"):
        db.session.add(EstadoUsuario(idEstado="EST-002", nombreEstado="INACTIVO"))
    db.session.commit()


def _crear_usuario(idUsuario, nombre, correo, password, idRol, idEstado="EST-001"):
    _asegurar_catalogos_base()
    usuario = Usuario(
        idUsuario=idUsuario,
        pNombre=nombre,
        pApellido="Prueba",
        correo=correo,
        passwordHash=bcrypt.generate_password_hash(password).decode("utf-8"),
        idRol=idRol,
        idEstado=idEstado,
    )
    db.session.add(usuario)
    db.session.commit()
    token = generar_token(usuario)
    return {
        "idUsuario": usuario.idUsuario,
        "correo": usuario.correo,
        "password": password,
        "token": token,
        "headers": {"Authorization": f"Bearer {token}"},
    }


@pytest.fixture
def admin(app):
    return _crear_usuario("USR-001", "Admin", "admin@test.com", "admin123", "ROL-001")


@pytest.fixture
def empleado(app):
    return _crear_usuario("USR-002", "Empleado", "empleado@test.com", "clave123", "ROL-002")