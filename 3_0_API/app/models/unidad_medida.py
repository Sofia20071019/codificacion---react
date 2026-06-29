from app.database.database import db

class UnidadMedida(db.Model):
    __tablename__ = "unidad_medida"

    idUnidad = db.Column(db.String(10), primary_key=True)
    nombreUnidad = db.Column(db.String(50))

    insumos = db.relationship("Insumo", back_populates="unidad")
