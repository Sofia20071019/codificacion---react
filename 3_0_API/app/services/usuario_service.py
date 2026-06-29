from app.database.database import db, bcrypt
from app.models import Usuario
from app.utils.generar_id import generar_id

class UsuarioService:

    @staticmethod
    def listar_todos():
        return Usuario.query.all()

    @staticmethod
    def obtener_por_id(idUsuario):
        return Usuario.query.get(idUsuario)

    @staticmethod
    def crear_usuario(pNombre, sNombre, pApellido, sApellido, correo, password, idRol, idEstado):
        password_encriptado = bcrypt.generate_password_hash(password).decode("utf-8")
        nuevo_id = generar_id("USR", Usuario, "idUsuario")
        usuario = Usuario(
            idUsuario=nuevo_id,
            pNombre=pNombre,
            sNombre=sNombre,
            pApellido=pApellido,
            sApellido=sApellido,
            correo=correo,
            passwordHash=password_encriptado,
            idRol=idRol,
            idEstado=idEstado
        )
        db.session.add(usuario)
        db.session.commit()
        return usuario

    @staticmethod
    def actualizar_usuario(idUsuario, **kwargs):
        usuario = Usuario.query.get(idUsuario)
        if not usuario:
            return None
        for key, value in kwargs.items():
            if key == "password" and value:
                setattr(usuario, "passwordHash", bcrypt.generate_password_hash(value).decode("utf-8"))
            elif value is not None and hasattr(usuario, key):
                setattr(usuario, key, value)
        db.session.commit()
        return usuario

    @staticmethod
    def eliminar_usuario(idUsuario):
        usuario = Usuario.query.get(idUsuario)
        if not usuario:
            return False
        db.session.delete(usuario)
        db.session.commit()
        return True
