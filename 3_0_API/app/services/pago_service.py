from app.database.database import db
from app.models import Pago
from app.utils.generar_id import generar_id

class PagoService:

    @staticmethod
    def listar_todos():
        return Pago.query.all()

    @staticmethod
    def obtener_por_id(idPago):
        return Pago.query.get(idPago)

    @staticmethod
    def crear_pago(idJornada, idUsuario_Admin, montoPagado, idMetodo, fechaPago=None):
        nuevo_id = generar_id("PAG", Pago, "idPago")
        pago = Pago(
            idPago=nuevo_id,
            idJornada=idJornada,
            idUsuario_Admin=idUsuario_Admin,
            montoPagado=montoPagado,
            idMetodo=idMetodo,
            fechaPago=fechaPago
        )
        db.session.add(pago)
        db.session.commit()
        return pago

    @staticmethod
    def aprobar_pago(idPago, **kwargs):
        pago = Pago.query.get(idPago)
        if not pago:
            return None
        for key, value in kwargs.items():
            if value is not None and hasattr(pago, key):
                setattr(pago, key, value)
        db.session.commit()
        return pago
