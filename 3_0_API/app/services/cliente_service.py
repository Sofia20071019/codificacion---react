from app.database.database import db
from app.models import Cliente
from app.utils.generar_id import generar_id

class ClienteService:

    @staticmethod
    def listar_todos():
        return Cliente.query.all()

    @staticmethod
    def crear_cliente(nombreCliente, telefono=None):
        nuevo_id = generar_id("CLI", Cliente, "idCliente")
        c = Cliente(idCliente=nuevo_id, nombreCliente=nombreCliente, telefono=telefono)
        db.session.add(c)
        db.session.commit()
        return c
