from app.database.database import db
from app.models import MetodoPago
from app.utils.generar_id import generar_id

class MetodoPagoService:

    @staticmethod
    def listar_todos():
        return MetodoPago.query.all()

    @staticmethod
    def crear_metodo(nombreMetodo):
        nuevo_id = generar_id("MET", MetodoPago, "idMetodo")
        m = MetodoPago(idMetodo=nuevo_id, nombreMetodo=nombreMetodo)
        db.session.add(m)
        db.session.commit()
        return m
