# pylint: disable=redefined-outer-name,missing-function-docstring
"""
Pruebas de integracion de autenticacion y autorizacion.

Estas pruebas ejercitan el flujo completo HTTP -> ruta -> controlador ->
servicio -> base de datos, usando la configuracion de conftest.py

Casos de la matriz: INT-01 a INT-04.
"""

import datetime

import jwt

from app.database.database import db, bcrypt
from app.models import EstadoUsuario, Rol, Usuario
from app.utils.jwt_utils import generar_token


def _preparar_datos_base():
    """Crea roles, estados y los usuarios admin y empleado para las pruebas."""
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
    return admin, empleado


def _headers_autorizacion(usuario):
    """Genera el header Authorization con un token JWT valido."""
    return {"Authorization": f"Bearer {generar_token(usuario)}"}


# Caso 1: Login con credenciales válidas retorna 200 y token (INT-01)
def test_login_correcto_retorna_200_y_token(app, client):
    """Un login con credenciales validas responde 200 y entrega un token."""
    # ARRANGE
    _preparar_datos_base()
    credenciales = {"correo": "admin@test.com", "password": "admin123"}

    # ACT
    respuesta = client.post("/api/auth/login", json=credenciales)

    # ASSERT
    assert respuesta.status_code == 200
    assert respuesta.get_json()["data"]["token"]


# Caso 2: Recuperar contraseña con un correo registrado retorna 200 (INT-01)
def test_recuperar_contrasena_correo_registrado_retorna_200(app, client):
    """Recuperar contrasena con un correo registrado responde 200."""
    # ARRANGE
    _preparar_datos_base()
    datos = {"correo": "admin@test.com"}

    # ACT
    respuesta = client.post("/api/auth/recuperar-contrasena", json=datos)

    # ASSERT
    assert respuesta.status_code == 200


# Caso 3: Un usuario desactivado no puede iniciar sesión (INT-02)
def test_login_usuario_desactivado_es_rechazado(app, client):
    """Un usuario inactivo no puede iniciar sesion aunque la clave sea correcta."""
    # ARRANGE
    _, empleado = _preparar_datos_base()
    empleado.idEstado = "EST-002"
    db.session.commit()
    credenciales = {"correo": "empleado@test.com", "password": "clave123"}

    # ACT
    respuesta = client.post("/api/auth/login", json=credenciales)

    # ASSERT
    assert respuesta.status_code in (401, 403)


# Caso 4: Ruta protegida sin token retorna 401 (INT-03)
def test_ruta_protegida_sin_token_retorna_401(app, client):
    """Acceder a una ruta protegida sin token responde 401."""
    # ARRANGE
    _preparar_datos_base()

    # ACT
    respuesta = client.get("/api/auth/verificar-token")

    # ASSERT
    assert respuesta.status_code == 401


# Caso 5: Token con formato o firma inválida retorna 401 (INT-03)
def test_ruta_protegida_token_invalido_retorna_401(app, client):
    """Un token con formato o firma invalida responde 401."""
    # ARRANGE
    _preparar_datos_base()
    headers = {"Authorization": "Bearer token.falso.123"}

    # ACT
    respuesta = client.get("/api/auth/verificar-token", headers=headers)

    # ASSERT
    assert respuesta.status_code == 401


# Caso 6: Token expirado retorna 401 (INT-03)
def test_ruta_protegida_token_expirado_retorna_401(app, client):
    """Un token cuya fecha de expiracion ya paso responde 401."""
    # ARRANGE
    admin, _ = _preparar_datos_base()
    payload = {
        "idUsuario": admin.idUsuario,
        "correo": admin.correo,
        "idRol": admin.idRol,
        "exp": datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(hours=1),
    }
    token = jwt.encode(payload, app.config["SECRET_KEY"], algorithm="HS256")
    headers = {"Authorization": f"Bearer {token}"}

    # ACT
    respuesta = client.get("/api/auth/verificar-token", headers=headers)

    # ASSERT
    assert respuesta.status_code == 401


# Caso 7: Un empleado no puede crear usuarios, retorna 403 (INT-04)
def test_empleado_no_puede_crear_usuario_retorna_403(app, client):
    """Un EMPLEADO no tiene permiso para crear usuarios."""
    # ARRANGE
    _, empleado = _preparar_datos_base()
    headers = _headers_autorizacion(empleado)
    datos = {"correo": "nuevo@test.com"}

    # ACT
    respuesta = client.post("/api/usuarios", json=datos, headers=headers)

    # ASSERT
    assert respuesta.status_code == 403


# Caso 8: Un empleado no puede listar pagos, retorna 403 (INT-04)
def test_empleado_no_puede_listar_pagos_retorna_403(app, client):
    """Un EMPLEADO no tiene permiso para listar pagos."""
    # ARRANGE
    _, empleado = _preparar_datos_base()
    headers = _headers_autorizacion(empleado)

    # ACT
    respuesta = client.get("/api/pagos", headers=headers)

    # ASSERT
    assert respuesta.status_code == 403


# Caso 9: Un empleado no puede consultar reportes, retorna 403 (INT-04)
def test_empleado_no_puede_consultar_reportes_retorna_403(app, client):
    """Un EMPLEADO no tiene permiso para consultar reportes."""
    # ARRANGE
    _, empleado = _preparar_datos_base()
    headers = _headers_autorizacion(empleado)

    # ACT
    respuesta = client.get("/api/reportes/materias-primas", headers=headers)

    # ASSERT
    assert respuesta.status_code == 403