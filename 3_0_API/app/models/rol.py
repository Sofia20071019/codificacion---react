from app.database.database import db

class Rol(db.Model):
    __tablename__ = "rol"

    id = db.Column(
        db.Integer,
        primary_key = True 
    )

    nombre = db.Column(
        db.String(50),
        nullable = False,
        unique = True
    )

    usuarios = db.relationship (
        "Usuario",
        back_populates = "rol"
    )