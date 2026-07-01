from app.database.database import db

class DetalleEmpleado(db.Model):
    __tablename__ = 'detalle_empleado'

    id = db.Column(db.Integer, primary_key=True)
    idUsuario = db.Column(db.String(10), db.ForeignKey("usuario.idUsuario", onupdate="CASCADE"))
    
    usuario = db.relationship("Usuario", backref="detalles_empleado")