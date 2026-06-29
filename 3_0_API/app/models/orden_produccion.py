from app.database.database import db

class OrdenProduccion(db.Model):
    __tablename__ = "orden_produccion"

    idOrden = db.Column(db.String(10), primary_key=True)
    idCliente = db.Column(db.String(10), db.ForeignKey("cliente.idCliente"))
    idUsuario_Admin = db.Column(db.String(10), db.ForeignKey("usuario.idUsuario"))
    fechaPedido = db.Column(db.Date)
    estadoProd = db.Column(db.String(50))

    cliente = db.relationship("Cliente", back_populates="ordenes")
    admin = db.relationship("Usuario", back_populates="ordenes", foreign_keys=[idUsuario_Admin])
    detalles = db.relationship("DetalleOrden", back_populates="orden", cascade="all, delete-orphan")
