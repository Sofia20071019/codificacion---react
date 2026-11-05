import pytest

from app.services.rol_service import RolService

def test_creacion_del_rol():
    nombre_rol = "admin"
    esperado = "ADMIN"

    resultado = RolService.crear_rol(nombre_rol)

    assert resultado.nombreRol == esperado
    assert resultado.idRol.strartswith("Rol")