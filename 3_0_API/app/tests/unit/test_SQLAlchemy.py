import pytest

from app.services.rol_service import RolService

def test_creacion_del_rol(app):
    """
        El app prepara la base de datos temporal y pytest lo entrega solo porque existe en el confest.py
    """

    # Arrange: Lo que entra y lo que debe salir en mayusculas
    nombre_rol = "admin"
    esperado = "ADMIN"

    # Act: Crea el rol y lo debuelve al objeto guardado 
    resultado = RolService.crear_rol(nombre_rol)

    # Assert: El nombre_rol queda en mayusculas y el id empieza por ROL
    assert resultado.nombreRol == esperado
    assert resultado.idRol.startswith("ROL")


def test_listar_todos_con_roles(app):

    # Arrage: Se crean los dos roles 
    RolService.crear_rol("admin")
    RolService.crear_rol("empleado")

    # Act: Se pide la lista que contenga los dos roles "ADMIN" Y "EMPLEADO"
    resultado = RolService.listar_todos()
    nombres = [r.nombreRol for r in resultado]
    
    # Assert: Hay dos roles y tienen que mostrar solo los dos roles
    assert len(resultado) == 2
    assert "ADMIN" in nombres
    assert "EMPLEADO" in nombres


def test_listar_todos_sin_roles(app):
    
    """
        No se crea nada ya que esta vacia y es una lista sin roles
    """
    resultado = RolService.listar_todos()

    assert resultado == []