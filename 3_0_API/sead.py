from app import create_app
from app.database.database import db, bcrypt 
from app.models.usuario import Usuario 
from app.models.rol import Rol

app = create_app()

with app.app_context():
    # 1. Crear roles de manera segura si no existen
    if Rol.query.filter_by(nombre="ADMIN").first() is None:
        db.session.add(Rol(nombre="ADMIN")) 

    if Rol.query.filter_by(nombre="USER").first() is None:
        db.session.add(Rol(nombre="USER"))

    db.session.commit() 

    # 2. Buscar el rol de administrador para asignarlo
    rol_admin = Rol.query.filter_by(nombre="ADMIN").first()

    # 3. Crear el administrador por defecto si no existe
    if Usuario.query.filter_by(email="admin@titan.com").first() is None:
        admin = Usuario(
            nombre="Administrador",
            apellido="General",
            edad=30,
            celular="3000000000",
            email="admin@titan.com",
            password=bcrypt.generate_password_hash("admin123").decode("utf-8"),
            avatar="default.png",
            rol_id=rol_admin.id
        )
        db.session.add(admin)
        db.session.commit()  

        print("¡Administrador creado correctamente!")