from app.database.database import db
from app.models import UnidadMedida
from app.utils.generar_id import generar_id

class UnidadMedidaService:

    @staticmethod
    def listar_todas():
        return UnidadMedida.query.all()

    @staticmethod
    def crear_unidad(nombreUnidad):
        nuevo_id = generar_id("MED", UnidadMedida, "idUnidad")
        u = UnidadMedida(idUnidad=nuevo_id, nombreUnidad=nombreUnidad)
        db.session.add(u)
        db.session.commit()
        return u
