from app.database.database import db, bcrypt
from app.models import Usuario

class UsuarioService:

    @staticmethod
    def crear_usuario(nombre, apellido, edad, email, celular, password, rol_id):
        # 1. Encriptar la contraseña antes de guardarla en la base de datos
        password_encriptado = bcrypt.generate_password_hash(password).decode('utf-8')

        # 2. Instanciar el modelo con los datos recibidos
        usuario = Usuario(
            nombre=nombre,
            apellido=apellido,
            edad=edad,
            email=email,
            celular=celular,
            password=password_encriptado,  # Guardamos la versión segura encriptada
            rol_id=rol_id
        )

        # 3. Guardar en la base de datos siguiendo tu patrón
        db.session.add(usuario)
        db.session.commit()

        return usuario