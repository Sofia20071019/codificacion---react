from app.database.database import db
from app.models import Producto
from app.utils.generar_id import generar_id

class ProductoService:

    @staticmethod
    def listar_todos():
        return Producto.query.all()

    @staticmethod
    def crear_producto(nombreProducto, talla=None, color=None):
        nuevo_id = generar_id("PRO", Producto, "idProducto")
        p = Producto(idProducto=nuevo_id, nombreProducto=nombreProducto, talla=talla, color=color)
        db.session.add(p)
        db.session.commit()
        return p
