from app.database.database import db

class EstadoUsuario(db.Model):
    __tablename__ = "estado_usuario"

    idEstado = db.Column(db.String(10), primary_key=True)
    nombreEstado = db.Column(db.String(50), nullable=False)

    usuarios = db.relationship("Usuario", back_populates="estado")
