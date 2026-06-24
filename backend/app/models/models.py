from app.database.database import db

class Personal(db.Model):
    __tablename__ = 'personal'
    
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    rol = db.Column(db.String(50), nullable=False)

#   PARA LA MATERIA PRIMA
class MateriaPrima(db.Model):
    __tablename__ = 'materia_prima'
    
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    cantidad = db.Column(db.Float, nullable=False)  # Usamos Float por si guardas metros con decimales (ej: 15.5)
    unidad = db.Column(db.String(20), nullable=False)   # 'metros' o 'unidades'
    categoria = db.Column(db.String(50), nullable=False)
    referenciaColor = db.Column(db.String(50), nullable=True)
    imagen = db.Column(db.String(255), nullable=True)