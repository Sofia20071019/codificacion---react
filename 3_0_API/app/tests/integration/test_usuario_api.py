"""
Pruebas de integracion basicas para los servicios de usuario.

Estas pruebas ejercitan el flujo completo HTTP -> ruta -> controlador ->
servicio -> base de datos, usando la configuracion de conftest.py
(TestingConfig con SQLite en memoria).
"""

import pytest

from app.database.database import db, bcrypt
from app.models import EstadoUsuario, Rol, Usuario
from app.utils.jwt_utils import generar_token


def _preparar_datos_base():
    """Crea roles, estados y usuarios base para las pruebas."""
    db.session.add_all([
        Rol(idRol="ROL-001", nombreRol="ADMIN"),
        Rol(idRol="ROL-002", nombreRol="EMPLEADO"),
        EstadoUsuario(idEstado="EST-001", nombreEstado="ACTIVO"),
        EstadoUsuario(idEstado="EST-002", nombreEstado="INACTIVO"),
    ])

    admin = Usuario(
        idUsuario="USR-001",
        pNombre="Admin",
        pApellido="Sistema",
        correo="admin@test.com",
        passwordHash=bcrypt.generate_password_hash("admin123").decode("utf-8"),
        idRol="ROL-001",
        idEstado="EST-001",
    )
    empleado = Usuario(
        idUsuario="USR-002",
        pNombre="Empleado",
        pApellido="Prueba",
        correo="empleado@test.com",
        passwordHash=bcrypt.generate_password_hash("clave123").decode("utf-8"),
        idRol="ROL-002",
        idEstado="EST-001",
    )

    db.session.add_all([admin, empleado])
    db.session.commit()
    return admin


def _crear_usuario_extra(idEstado="EST-001"):
    """Crea un usuario adicional para operaciones sobre un registro existente."""
    usuario = Usuario(
        idUsuario="USR-010",
        pNombre="Extra",
        pApellido="Prueba",
        correo="extra@test.com",
        passwordHash=bcrypt.generate_password_hash("clave123").decode("utf-8"),
        idRol="ROL-002",
        idEstado=idEstado,
    )
    db.session.add(usuario)
    db.session.commit()
    return usuario


def _headers_autorizacion(usuario):
    """Genera el header Authorization con un token JWT valido."""
    return {"Authorization": f"Bearer {generar_token(usuario)}"}


def test_crear_usuario_retorna_201_y_persiste(app, client):
    # Arrange
    admin = _preparar_datos_base()
    headers = _headers_autorizacion(admin)
    datos = {
        "pNombre": "Juan",
        "sNombre": "Perez",
        "pApellido": "Lopez",
        "sApellido": "Diaz",
        "correo": "juan@test.com",
        "password": "Secreta123",
        "idRol": "ROL-002",
    }

    # Act
    respuesta = client.post("/api/usuarios", json=datos, headers=headers)

    # Assert
    assert respuesta.status_code == 201
    assert respuesta.get_json()["data"]["correo"] == "juan@test.com"
    usuario = Usuario.query.filter_by(correo="juan@test.com").first()
    assert usuario is not None
    assert usuario.passwordHash != "Secreta123"



def test_listar_usuarios_retorna_todos_los_registros(app, client):
    # Arrange
    admin = _preparar_datos_base()
    headers = _headers_autorizacion(admin)

    # Act
    respuesta = client.get("/api/usuarios", headers=headers)

    # Assert
    assert respuesta.status_code == 200
    correos = {usuario["correo"] for usuario in respuesta.get_json()["data"]}
    assert correos == {"admin@test.com", "empleado@test.com"}


def test_obtener_usuario_existente_retorna_datos(app, client):
    # Arrange
    admin = _preparar_datos_base()
    headers = _headers_autorizacion(admin)

    # Act
    respuesta = client.get("/api/usuarios/USR-002", headers=headers)

    # Assert
    assert respuesta.status_code == 200
    datos = respuesta.get_json()["data"]
    assert datos["idUsuario"] == "USR-002"
    assert datos["correo"] == "empleado@test.com"


