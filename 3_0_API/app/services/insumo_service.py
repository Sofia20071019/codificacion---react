from app.database.database import db
from app.models import Insumo
from app.utils.generar_id import generar_id

class InsumoService:

    @staticmethod
    def listar_todos():
        return Insumo.query.all()

    @staticmethod
    def obtener_por_id(idInsumo):
        return Insumo.query.get(idInsumo)

    @staticmethod
    def crear_insumo(nombreInsumo, idCategoria=None, idUnidad=None):
        nuevo_id = generar_id("INS", Insumo, "idInsumo")
        insumo = Insumo(
            idInsumo=nuevo_id,
            nombreInsumo=nombreInsumo,
            idCategoria=idCategoria,
            idUnidad=idUnidad
        )
        db.session.add(insumo)
        db.session.commit()
        return insumo

    @staticmethod
    def actualizar_insumo(idInsumo, **kwargs):
        insumo = Insumo.query.get(idInsumo)
        if not insumo:
            return None
        for key, value in kwargs.items():
            if value is not None and hasattr(insumo, key):
                setattr(insumo, key, value)
        db.session.commit()
        return insumo

    @staticmethod
    def eliminar_insumo(idInsumo):
        insumo = Insumo.query.get(idInsumo)
        if not insumo:
            return False
        db.session.delete(insumo)
        db.session.commit()
        return True
