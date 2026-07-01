from app import create_app
from app.database.database import db, bcrypt
from app.models import Rol, EstadoUsuario, Usuario

app = create_app()

with app.app_context():
    db.create_all()

    if Rol.query.filter_by(idRol="ROL-001").first() is None:
        db.session.add(Rol(idRol="ROL-001", nombreRol="ADMIN"))
        db.session.add(Rol(idRol="ROL-002", nombreRol="EMPLEADO"))
        db.session.commit()
        print("Roles creados.")

    if EstadoUsuario.query.filter_by(idEstado="EST-001").first() is None:
        db.session.add(EstadoUsuario(idEstado="EST-001", nombreEstado="ACTIVO"))
        db.session.add(EstadoUsuario(idEstado="EST-002", nombreEstado="INACTIVO"))
        db.session.commit()
        print("Estados de usuario creados.")

    if Usuario.query.filter_by(correo="admin@titan.com").first() is None:
        admin = Usuario(
            idUsuario="USR-001",
            pNombre="Administrador",
            sNombre=None,
            pApellido="General",
            sApellido=None,
            correo="admin@titan.com",
            passwordHash=bcrypt.generate_password_hash("admin123").decode("utf-8"),
            idRol="ROL-001",
            idEstado="EST-001"
        )
        db.session.add(admin)
        db.session.commit()
        print("Administrador creado: admin@titan.com / admin123")


    print("Seed completado.")