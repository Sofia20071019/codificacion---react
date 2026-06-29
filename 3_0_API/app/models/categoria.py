from app.database.database import db

class Categoria(db.Model):
    __tablename__ = "categoria"

    idCategoria = db.Column(db.String(10), primary_key=True)
    nombreCategoria = db.Column(db.String(100), nullable=False)

    insumos = db.relationship("Insumo", back_populates="categoria")
