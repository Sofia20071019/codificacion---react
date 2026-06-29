from app.database.database import db

class Cliente(db.Model):
    __tablename__ = "cliente"

    idCliente = db.Column(db.String(10), primary_key=True)
    nombreCliente = db.Column(db.String(100))
    telefono = db.Column(db.BigInteger)

    ordenes = db.relationship("OrdenProduccion", back_populates="cliente")
