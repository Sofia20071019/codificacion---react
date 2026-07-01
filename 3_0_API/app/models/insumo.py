from app.database.database import db

class Insumo(db.Model):
    __tablename__ = "insumo"

    idInsumo = db.Column(db.String(10), primary_key=True)
    nombreInsumo = db.Column(db.String(100))
    idCategoria = db.Column(db.String(10), db.ForeignKey("categoria.idCategoria"))
    idUnidad = db.Column(db.String(10), db.ForeignKey("unidad_medida.idUnidad"))
    cantidad = db.Column(db.Numeric(10, 2), default=0)

    categoria = db.relationship("Categoria", back_populates="insumos")
    unidad = db.relationship("UnidadMedida", back_populates="insumos")
    fichas_tecnicas = db.relationship("FichaTecnica", back_populates="insumo")
    asignaciones = db.relationship("Asignacion", back_populates="insumo")
