from app.database.database import db

class Producto(db.Model):
    __tablename__ = "producto"

    idProducto = db.Column(db.String(10), primary_key=True)
    nombreProducto = db.Column(db.String(100))
    talla = db.Column(db.String(10))
    color = db.Column(db.String(50))

    fichas_tecnicas = db.relationship("FichaTecnica", back_populates="producto")
    detalles_orden = db.relationship("DetalleOrden", back_populates="producto")
