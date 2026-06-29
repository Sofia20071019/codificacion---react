from app.database.database import db
from app.models import Rol
from app.utils.generar_id import generar_id

class RolService:

    @staticmethod
    def listar_todos():
        return Rol.query.all()

    @staticmethod
    def crear_rol(nombreRol):
        nuevo_id = generar_id("ROL", Rol, "idRol")
        rol = Rol(idRol=nuevo_id, nombreRol=nombreRol.upper())
        db.session.add(rol)
        db.session.commit()
        return rol
