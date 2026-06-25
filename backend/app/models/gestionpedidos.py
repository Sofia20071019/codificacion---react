from app.database.database import db

class GestionPedidos(db.Model):
    __tablename__ = 'gestion_pedidos'

    id = db.Column(
        db.Integer, 
        primary_key=True
    )

    nombre = db.Column(
        db.String(100),
        nullable = False
    )

    