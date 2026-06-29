from app.database.database import db

class DetalleOrden(db.Model):
    __tablename__ = "detalle_orden"

    idDetalle = db.Column(db.String(10), primary_key=True)
    idOrden = db.Column(db.String(10), db.ForeignKey("orden_produccion.idOrden", ondelete="CASCADE"))
    idProducto = db.Column(db.String(10), db.ForeignKey("producto.idProducto"))
    cantidadTotal = db.Column(db.Integer)

    orden = db.relationship("OrdenProduccion", back_populates="detalles")
    producto = db.relationship("Producto", back_populates="detalles_orden")
