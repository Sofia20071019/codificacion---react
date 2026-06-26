from app.database.database import db
from app.models import Rol

class RolService:

    @staticmethod
    def crear_rol(nombre):
        # 1. Instanciar el modelo Rol
        nuevo_rol = Rol(
            nombre=nombre.upper()  # Guardamos siempre en mayúsculas (ej: ADMIN, USER)
        )

        # 2. Guardar el registro
        db.session.add(nuevo_rol)
        db.session.commit()

        return nuevo_rol

    @staticmethod
    def obtener_todos():
        # Retorna la lista completa de roles directo desde MySQL
        return Rol.query.all()