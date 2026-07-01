from app.database.database import db, bcrypt
from app.models import Usuario
from app.utils.generar_id import generar_id

class UsuarioService:

    @staticmethod
    def listar_todos():
        return Usuario.query.order_by(Usuario.pNombre).all()

    @staticmethod
    def listar_empleados():
        return Usuario.query.filter_by(idRol="ROL-002").order_by(Usuario.pNombre).all()

    @staticmethod
    def obtener_por_id(idUsuario):
        return Usuario.query.get(idUsuario)

    @staticmethod
    def crear_usuario(pNombre, sNombre, pApellido, sApellido, correo, password, idRol):
        nuevo_id = generar_id("USR", Usuario, "idUsuario")
        hash_pw = bcrypt.generate_password_hash(password).decode("utf-8")
        usuario = Usuario(
            idUsuario=nuevo_id,
            pNombre=pNombre,
            sNombre=sNombre,
            pApellido=pApellido,
            sApellido=sApellido,
            correo=correo.lower().strip(),
            passwordHash=hash_pw,
            idRol=idRol,
            idEstado="EST-001"
        )
        db.session.add(usuario)
        db.session.commit()
        return usuario

    @staticmethod
    def actualizar_usuario(idUsuario, **kwargs):
        usuario = Usuario.query.get(idUsuario)
        if not usuario:
            return None
        if "password" in kwargs and kwargs["password"]:
            usuario.passwordHash = bcrypt.generate_password_hash(kwargs["password"]).decode("utf-8")
        for key in ["pNombre", "sNombre", "pApellido", "sApellido", "correo", "idRol", "idEstado"]:
            if key in kwargs and kwargs[key] is not None:
                setattr(usuario, key, kwargs[key])
        db.session.commit()
        return usuario

    @staticmethod
    def eliminar_usuario(idUsuario):
        usuario = Usuario.query.get(idUsuario)
        if not usuario:
            return None
        db.session.delete(usuario)
        db.session.commit()
        return usuario

    @staticmethod
    def desactivar_usuario(idUsuario):
        usuario = Usuario.query.get(idUsuario)
        if not usuario:
            return None
        usuario.idEstado = "EST-002"
        db.session.commit()
        return usuario
