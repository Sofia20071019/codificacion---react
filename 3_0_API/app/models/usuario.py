from datetime import datetime
from app.database.database import db

class Usuario(db.Model):
    __tablename__ = "usuarios"  

    id = db.Column(db.Integer, primary_key=True)
    
    # Datos personales mapeados desde el formulario de React
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    edad = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    celular = db.Column(db.String(15), nullable=False)
    
    # Campo para almacenar el hash de la identificación/password
    password = db.Column(db.String(255), nullable=False)
    
    # Datos de control e imágenes
    fecha_registro = db.Column(db.DateTime, default=datetime.utcnow)
    avatar = db.Column(db.String(255), nullable=False, default="default.png")
    
    # Relación de Clave Foránea con la tabla Rol
    rol_id = db.Column(db.Integer, db.ForeignKey("rol.id"), nullable=False)
    
    # Relación inversa con el modelo Rol
    rol = db.relationship("Rol", back_populates="usuarios")

    def __repr__(self):
        return f"<Usuario {self.nombre} {self.apellido} - {self.email}>"