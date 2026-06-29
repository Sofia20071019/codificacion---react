from app.database.database import db

class Usuario(db.Model):
    __tablename__ = "usuario"

    idUsuario = db.Column(db.String(10), primary_key=True)
    pNombre = db.Column(db.String(50))
    sNombre = db.Column(db.String(50))
    pApellido = db.Column(db.String(50))
    sApellido = db.Column(db.String(50))
    correo = db.Column(db.String(100), unique=True, nullable=False)
    passwordHash = db.Column(db.String(255), nullable=False)
    idRol = db.Column(db.String(10), db.ForeignKey("rol.idRol", onupdate="CASCADE"))
    idEstado = db.Column(db.String(10), db.ForeignKey("estado_usuario.idEstado", onupdate="CASCADE"))

    rol = db.relationship("Rol", back_populates="usuarios")
    estado = db.relationship("EstadoUsuario", back_populates="usuarios")
    ordenes = db.relationship("OrdenProduccion", back_populates="admin", foreign_keys="OrdenProduccion.idUsuario_Admin")
    jornadas = db.relationship("JornadaLaboral", back_populates="empleado", foreign_keys="JornadaLaboral.idUsuario_Empleado")
    pagos = db.relationship("Pago", back_populates="admin_pago", foreign_keys="Pago.idUsuario_Admin")
