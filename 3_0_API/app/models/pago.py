from app.database.database import db

class Pago(db.Model):
    __tablename__ = "pago"

    idPago = db.Column(db.String(10), primary_key=True)
    idJornada = db.Column(db.String(10), db.ForeignKey("jornada_laboral.idJornada"))
    idUsuario_Admin = db.Column(db.String(10), db.ForeignKey("usuario.idUsuario"))
    montoPagado = db.Column(db.Numeric(10, 2))
    idMetodo = db.Column(db.String(10), db.ForeignKey("metodo_pago.idMetodo"))
    fechaPago = db.Column(db.Date)

    jornada = db.relationship("JornadaLaboral", back_populates="pagos")
    admin_pago = db.relationship("Usuario", back_populates="pagos", foreign_keys=[idUsuario_Admin])
    metodo = db.relationship("MetodoPago", back_populates="pagos")
