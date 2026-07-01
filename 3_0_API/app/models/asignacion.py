from app.database.database import db

class Asignacion(db.Model):
    __tablename__ = "asignacion"

    idAsignacion = db.Column(db.String(10), primary_key=True)
    idUsuario_Empleado = db.Column(db.String(10), db.ForeignKey("usuario.idUsuario"))
    idInsumo = db.Column(db.String(10), db.ForeignKey("insumo.idInsumo"))
    cantidad = db.Column(db.Numeric(10, 2), nullable=False)
    fechaAsignacion = db.Column(db.Date)
    estado = db.Column(db.String(20), default="Pendiente")

    empleado = db.relationship("Usuario", backref="asignaciones")
    insumo = db.relationship("Insumo", back_populates="asignaciones")
