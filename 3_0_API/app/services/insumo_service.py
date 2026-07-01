from app.database.database import db
from app.models import Insumo
from app.utils.generar_id import generar_id

class InsumoService:

    @staticmethod
    def listar_todos():
        return Insumo.query.order_by(Insumo.nombreInsumo).all()

    @staticmethod
    def crear_insumo(nombreInsumo, idCategoria, idUnidad):
        nuevo_id = generar_id("INS", Insumo, "idInsumo")
        insumo = Insumo(
            idInsumo=nuevo_id,
            nombreInsumo=nombreInsumo,
            idCategoria=idCategoria,
            idUnidad=idUnidad,
            cantidad=0
        )
        db.session.add(insumo)
        db.session.commit()
        return insumo

    @staticmethod
    def actualizar_insumo(idInsumo, **kwargs):
        insumo = Insumo.query.get(idInsumo)
        if not insumo:
            return None
        for key in ["nombreInsumo", "idCategoria", "idUnidad", "cantidad"]:
            if key in kwargs and kwargs[key] is not None:
                setattr(insumo, key, kwargs[key])
        db.session.commit()
        return insumo

    @staticmethod
    def eliminar_insumo(idInsumo):
        insumo = Insumo.query.get(idInsumo)
        if not insumo:
            return None
        db.session.delete(insumo)
        db.session.commit()
        return insumo
