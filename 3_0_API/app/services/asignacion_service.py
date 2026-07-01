from datetime import date
from app.database.database import db
from app.models import Asignacion, Insumo
from app.utils.generar_id import generar_id

class AsignacionService:

    @staticmethod
    def listar_todas():
        return Asignacion.query.order_by(Asignacion.fechaAsignacion.desc()).all()

    @staticmethod
    def listar_por_empleado(idUsuario):
        return Asignacion.query.filter_by(idUsuario_Empleado=idUsuario).order_by(Asignacion.fechaAsignacion.desc()).all()

    @staticmethod
    def listar_por_insumo(idInsumo):
        return Asignacion.query.filter_by(idInsumo=idInsumo).all()

    @staticmethod
    def crear_asignacion(idUsuario_Empleado, idInsumo, cantidad):
        insumo = Insumo.query.get(idInsumo)
        if not insumo:
            raise ValueError("Insumo no encontrado")
        cantidad_disponible = float(insumo.cantidad or 0)
        if cantidad_disponible < float(cantidad):
            raise ValueError(f"Stock insuficiente. Disponible: {cantidad_disponible}")
        nuevo_id = generar_id("ASI", Asignacion, "idAsignacion")
        asignacion = Asignacion(
            idAsignacion=nuevo_id,
            idUsuario_Empleado=idUsuario_Empleado,
            idInsumo=idInsumo,
            cantidad=cantidad,
            fechaAsignacion=date.today(),
            estado="Pendiente"
        )
        insumo.cantidad = float(insumo.cantidad or 0) - float(cantidad)
        db.session.add(asignacion)
        db.session.commit()
        return asignacion

    @staticmethod
    def cambiar_estado(idAsignacion, estado):
        asignacion = Asignacion.query.get(idAsignacion)
        if not asignacion:
            return None
        asignacion.estado = estado
        db.session.commit()
        return asignacion
