"""
ARCHIVO: cliente_service.py
PROPOSITO: Servicio de gestion de clientes del sistema.
           Permite listar todos los clientes existentes y registrar nuevos clientes
           que realizan pedidos en la empresa. Los clientes son utilizados
           en las ordenes de produccion.
"""

# Importacion de la instancia de base de datos para operaciones de persistencia
from app.database.database import db

# Importacion del modelo Cliente para interactuar con la tabla de clientes
from app.models import Cliente

# Importacion de la funcion utilitaria para generar identificadores unicos
from app.utils.generar_id import generar_id


class ClienteService:
    """Clase que concentra los servicios de gestion de clientes."""

    @staticmethod
    def listar_todos():
        """
        Metodo estatico que obtiene todos los clientes registrados en el sistema.
        
        Returns:
            list: Lista de todos los objetos Cliente existentes en la base de datos.
        """
        # Consultar y retornar todos los clientes de la tabla
        return Cliente.query.all()

    @staticmethod
    def crear_cliente(nombreCliente, telefono=None):
        """
        Metodo estatico que registra un nuevo cliente en el sistema.
        Genera automaticamente un ID unico con prefijo "CLI" para el cliente.
        
        Args:
            nombreCliente (str): Nombre o razon social del cliente.
            telefono (str, optional): Numero de telefono del cliente. Por defecto None.
        
        Returns:
            Cliente: Objeto del cliente recien creado con su ID asignado.
        """
        # Generar un nuevo ID unico con prefijo "CLI" para el modelo Cliente
        nuevo_id = generar_id("CLI", Cliente, "idCliente")

        # Crear la instancia del nuevo cliente con los datos proporcionados
        c = Cliente(idCliente=nuevo_id, nombreCliente=nombreCliente, telefono=telefono)

        # Agregar el nuevo cliente a la sesion de la base de datos
        db.session.add(c)

        # Confirmar los cambios en la base de datos
        db.session.commit()

        # Retornar el cliente recien creado
        return c
