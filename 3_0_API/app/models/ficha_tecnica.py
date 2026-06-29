from app.database.database import db

class FichaTecnica(db.Model):
    __tablename__ = "ficha_tecnica"

    idFicha = db.Column(db.String(10), primary_key=True)
    idProducto = db.Column(db.String(10), db.ForeignKey("producto.idProducto", ondelete="CASCADE"))
    idInsumo = db.Column(db.String(10), db.ForeignKey("insumo.idInsumo", ondelete="CASCADE"))
    cantidadNecesaria = db.Column(db.Numeric(10, 2))

    producto = db.relationship("Producto", back_populates="fichas_tecnicas")
    insumo = db.relationship("Insumo", back_populates="fichas_tecnicas")
