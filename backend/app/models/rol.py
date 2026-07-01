from app.database.database import db

class Rol(db.Model):
    __tablename__ = "rol"

    idRol = db.Column(db.String(10), primary_key=True)
    nombreRol = db.Column(db.String(50), nullable=False)

    usuarios = db.relationship("Usuario", back_populates="rol")