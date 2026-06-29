from app.database.database import db
from app.models import OrdenProduccion, DetalleOrden
from app.utils.generar_id import generar_id

class OrdenService:

    @staticmethod
    def listar_todas():
        return OrdenProduccion.query.all()

    @staticmethod
    def obtener_por_id(idOrden):
        return OrdenProduccion.query.get(idOrden)

    @staticmethod
    def crear_orden(idCliente, idUsuario_Admin, fechaPedido, estadoProd=".."):
        nuevo_id = generar_id("ORD", OrdenProduccion, "idOrden")
        orden = OrdenProduccion(
            idOrden=nuevo_id,
            idCliente=idCliente,
            idUsuario_Admin=idUsuario_Admin,
            fechaPedido=fechaPedido,
            estadoProd=estadoProd
        )
        db.session.add(orden)
        db.session.commit()
        return orden

    @staticmethod
    def actualizar_orden(idOrden, **kwargs):
        orden = OrdenProduccion.query.get(idOrden)
        if not orden:
            return None
        for key, value in kwargs.items():
            if value is not None and hasattr(orden, key):
                setattr(orden, key, value)
        db.session.commit()
        return orden

    @staticmethod
    def agregar_detalle(idOrden, idProducto, cantidadTotal):
        nuevo_id = generar_id("DET", DetalleOrden, "idDetalle")
        detalle = DetalleOrden(
            idDetalle=nuevo_id,
            idOrden=idOrden,
            idProducto=idProducto,
            cantidadTotal=cantidadTotal
        )
        db.session.add(detalle)
        db.session.commit()
        return detalle
