from app.database.database import db, bcrypt
from app.models import Usuario

class AuthService:

    @staticmethod
    def login(correo, password):
        usuario = Usuario.query.filter_by(correo=correo).first()
        if not usuario:
            return None
        if not bcrypt.check_password_hash(usuario.passwordHash, password):
            return None
        return usuario

    @staticmethod
    def recuperar_contrasena(correo):
        usuario = Usuario.query.filter_by(correo=correo).first()
        return usuario is not None