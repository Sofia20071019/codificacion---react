from app.database.database import db

class JornadaLaboral(db.Model):
    __tablename__ = "jornada_laboral"

    idJornada = db.Column(db.String(10), primary_key=True)
    idUsuario_Empleado = db.Column(db.String(10), db.ForeignKey("usuario.idUsuario"))
    fecha = db.Column(db.Date)
    hInicio = db.Column(db.Time)
    hFin = db.Column(db.Time)

    empleado = db.relationship("Usuario", back_populates="jornadas", foreign_keys=[idUsuario_Empleado])
    pagos = db.relationship("Pago", back_populates="jornada")
