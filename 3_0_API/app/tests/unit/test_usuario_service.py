import pytest
from sqlalchemy.exc import IntegrityError

from app.database.database import db
from app.models import Usuario
from app.services.usuario_service import UsuarioService
from app.services.rol_service import RolService


def test_rol_crear_rol_normaliza_mayusculas(app):
    # Arrange
    nombreRol = "admin"

    # Act
    rol = RolService.crear_rol(nombreRol)

    # Assert
    assert rol.idRol is not None
    assert rol.nombreRol == "ADMIN"

def test_crear_usuario_valido_crea_usuario_exitoso(app):
    # Arrange
    datos = {
        "pNombre": "Juan",
        "sNombre": "Perez",
        "pApellido": "Lopez",
        "sApellido": "Diaz",
        "correo": "juan@example.com",
        "password": "Secreta123",
        "idRol": "ROL-002",
    }

    # Act
    usuario = UsuarioService.crear_usuario(**datos)

    # Assert
    assert usuario.idUsuario is not None
    assert usuario.correo == "juan@example.com"
    assert usuario.passwordHash != "Secreta123"
    assert usuario.passwordHash.startswith("$2")
    assert usuario.idRol == "ROL-002"
    assert usuario.idEstado == "EST-001"


def test_crear_usuario_email_duplicado_no_crea_usuario_duplicado(app):
    # Arrange
    UsuarioService.crear_usuario(
        pNombre="Juan",
        sNombre="Perez",
        pApellido="Lopez",
        sApellido="Diaz",
        correo="duplicado@example.com",
        password="Secreta123",
        idRol="ROL-002",
    )

    # Act
    with pytest.raises(IntegrityError):
        UsuarioService.crear_usuario(
            pNombre="Segundo",
            sNombre=None,
            pApellido=None,
            sApellido=None,
            correo="duplicado@example.com",
            password="Secreta123",
            idRol="ROL-002",
        )
    db.session.rollback()

    # Assert
    assert Usuario.query.filter_by(correo="duplicado@example.com").count() == 1


def test_crear_usuario_email_invalido_rechaza_usuario(app):
    # Arrange
    datos = {
        "pNombre": "Juan",
        "sNombre": "Perez",
        "pApellido": "Lopez",
        "sApellido": "Diaz",
        "correo": "correo-invalido",
        "password": "Secreta123",
        "idRol": "ROL-002",
    }

    # Act
    with pytest.raises(ValueError):
        UsuarioService.crear_usuario(**datos)
    db.session.rollback()

    # Assert
    assert Usuario.query.filter_by(correo="correo-invalido").count() == 0


def test_crear_usuario_password_corta_rechaza_usuario(app):
    # Arrange
    datos = {
        "pNombre": "Juan",
        "sNombre": "Perez",
        "pApellido": "Lopez",
        "sApellido": "Diaz",
        "correo": "juan@example.com",
        "password": "123",
        "idRol": "ROL-002",
    }

    # Act
    with pytest.raises(ValueError):
        UsuarioService.crear_usuario(**datos)
    db.session.rollback()

    # Assert
    assert Usuario.query.filter_by(correo="juan@example.com").count() == 0


def test_crear_usuario_campos_faltantes_rechazan_usuario(app):
    # Arrange
    datos = {
        "pNombre": None,
        "sNombre": None,
        "pApellido": None,
        "sApellido": None,
        "correo": "sin-nombre@example.com",
        "password": "Secreta123",
        "idRol": "ROL-002",
    }

    # Act
    with pytest.raises(ValueError):
        UsuarioService.crear_usuario(**datos)
    db.session.rollback()

    # Assert
    assert Usuario.query.filter_by(correo="sin-nombre@example.com").count() == 0


def test_crear_usuario_datos_invalidos_rechazan_typeerror(app):
    # Arrange
    datos = {
        "pNombre": "Juan",
        "sNombre": "Perez",
        "pApellido": "Lopez",
        "sApellido": "Diaz",
        "correo": 123,
        "password": "Secreta123",
        "idRol": "ROL-002",
    }

    # Act
    with pytest.raises(TypeError):
        UsuarioService.crear_usuario(**datos)
    db.session.rollback()


def test_crear_usuario_password_se_almacena_como_hash_no_texto_plano(app):
    # Arrange
    datos = {
        "pNombre": "Juan",
        "sNombre": "Perez",
        "pApellido": "Lopez",
        "sApellido": "Diaz",
        "correo": "juan@example.com",
        "password": "Secreta123",
        "idRol": "ROL-002",
    }

    # Act
    usuario = UsuarioService.crear_usuario(**datos)

    # Assert
    assert usuario.passwordHash != "Secreta123"
    assert usuario.passwordHash.startswith("$2")


def test_eliminar_usuario_existente_retorna_usuario_eliminado(app):
    # Arrange
    usuario = UsuarioService.crear_usuario(
        pNombre="Juan",
        sNombre="Perez",
        pApellido="Lopez",
        sApellido="Diaz",
        correo="borrar@example.com",
        password="Secreta123",
        idRol="ROL-002",
    )

    # Act
    eliminado = UsuarioService.eliminar_usuario(usuario.idUsuario)

    # Assert
    assert eliminado.idUsuario == usuario.idUsuario
    assert UsuarioService.obtener_por_id(usuario.idUsuario) is None


def test_eliminar_usuario_inexistente_retorna_none(app):
    # Arrange
    idUsuario = "USR-999"

    # Act
    resultado = UsuarioService.eliminar_usuario(idUsuario)

    # Assert
    assert resultado is None

    
