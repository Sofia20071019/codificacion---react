import pytest

from app.services.rol_service import RolService

def test_creacion_del_rol(app):
    nombre_rol = "admin"
    esperado = "ADMIN"

    resultado = RolService.crear_rol(nombre_rol)

    assert resultado.nombreRol == esperado
    assert resultado.idRol.startswith("ROL")

def test_listar_todos_con_roles(app):
    RolService.crear_rol("admin")
    RolService.crear_rol("empleado")

    resultado = RolService.listar_todos()

    nombres = [r.nombreRol for r in resultado]
    assert len(resultado) == 2
    assert "ADMIN" in nombres
    assert "EMPLEADO" in nombres

def test_listar_todos_sin_roles(app):
    resultado = RolService.listar_todos()

    assert resultado == []