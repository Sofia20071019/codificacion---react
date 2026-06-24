from app import create_app
from app.database.database import db, bcrypt
from app.models.usuario import Usuario
from app.models.rol import Rol

app = create_app()

with app.app_context():

    if Rol.query.filter_by(nombre="ADMIN").first() is None:
        db.session.add(Rol(nombre="ADMIN"))

    if Rol.query.filter_by(nombre="USER").first() is None:
        db.session.add(Rol(nombre="USUARIO"))

    db.session.commit()

    #Busca rol ADMIN
    rol_admin = Rol.query.filter_by(nombre="ADMIN").first()

    #Crear administrador si no existe
    if Usuario.query.filter_by(email="admin@musigest.com").first() is None:

        admin = Usuario(
            nombre_usuario = "admin",
            email = "admin@musigest.com",
            password = bcrypt.generate_password_hash(
                "Admin123*"
            ).decode("utf-8"),
            avatar = "default.png",
            rol_id = rol_admin.id
        )

        db.session.add(admin)
        db.session.commit()

        print("Administrador creado correctamente")