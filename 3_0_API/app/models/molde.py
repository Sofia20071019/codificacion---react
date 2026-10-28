"""
ARCHIVO: app/models/molde.py
PROPOSITO: Modelos SQLAlchemy para la gestion de categorias de moldes,
           moldes principales e imagenes organizadas por tallas (5XS a 5XL).
"""
from app.database.database import db

class CategoriaMolde(db.Model):
    __tablename__ = "categoria_molde"

    idCategoriaMolde = db.Column(db.String(10), primary_key=True)
    nombreCategoria = db.Column(db.String(100), nullable=False)

    # Relación inversa con Molde
    moldes = db.relationship("Molde", back_populates="categoria", cascade="all, delete-orphan")


class Molde(db.Model):
    __tablename__ = "molde"

    idMolde = db.Column(db.String(10), primary_key=True)
    nombreMolde = db.Column(db.String(150), nullable=False)
    descripcion = db.Column(db.Text)
    indicaciones = db.Column(db.Text)
    genero = db.Column(db.Enum('hombre', 'mujer', 'niño', 'niña', 'unisex', name='genero_enum'), nullable=False, default='unisex')
    idCategoriaMolde = db.Column(db.String(10), db.ForeignKey("categoria_molde.idCategoriaMolde", onupdate="CASCADE"), nullable=False)

    # Relaciones con CategoriaMolde y MoldeTallaImagen
    categoria = db.relationship("CategoriaMolde", back_populates="moldes")
    imagenes_tallas = db.relationship("MoldeTallaImagen", back_populates="molde", cascade="all, delete-orphan")


class MoldeTallaImagen(db.Model):
    __tablename__ = "molde_talla_imagen"

    idMoldeTalla = db.Column(db.String(10), primary_key=True)
    idMolde = db.Column(db.String(10), db.ForeignKey("molde.idMolde", ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    talla = db.Column(db.String(10), nullable=False)
    imagenUrl = db.Column(db.Text, nullable=False)

    # Relación inversa con Molde
    molde = db.relationship("Molde", back_populates="imagenes_tallas")