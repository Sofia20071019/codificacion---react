from app.database.database import db

class GestionProduccion(db.Model):
    __tablename__ = 'gestion_produccion'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text, nullable=True)
    fecha_creacion = db.Column(db.DateTime, nullable=False)

    