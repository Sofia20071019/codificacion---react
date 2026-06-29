from app.database.database import db

class MetodoPago(db.Model):
    __tablename__ = "metodo_pago"

    idMetodo = db.Column(db.String(10), primary_key=True)
    nombreMetodo = db.Column(db.String(50))

    pagos = db.relationship("Pago", back_populates="metodo")
