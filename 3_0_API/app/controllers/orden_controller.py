"""
ARCHIVO: orden_controller.py
PROPOSITO: Controlador de órdenes encargado de gestionar las operaciones CRUD
           (Crear, Leer, Actualizar) relacionadas con las órdenes de producción
           del sistema. Permite listar todas las órdenes, obtener una orden
           específica por ID, crear nuevas órdenes con sus detalles y actualizar
           órdenes existentes. No requiere autenticación para acceder a los endpoints.
"""

# Importación de 'request' para acceder a los datos de la petición HTTP entrante
from flask import request
# Importación de 'jsonify' para construir respuestas HTTP en formato JSON
from flask import jsonify


class OrdenController:
    """
    Clase controladora que agrupa los métodos estáticos para la gestión
    completa de órdenes de producción del sistema.
    """

    @staticmethod
    def listar_ordenes():
        """
        Endpoint para listar todas las órdenes de producción registradas.
        No requiere autenticación.
        Retorna una lista completa con la información de cada orden incluyendo
        datos del cliente, fecha, estado de producción y detalles de productos.
        """
        try:
            # Importación diferida del servicio de reportes para evitar dependencias circulares.
            # El servicio de reportes es la fuente única de datos que comparten la vista
            # y la exportación a Excel, garantizando consistencia entre ambas.
            from app.services.reporte_service import ReporteService
            # Obtener todas las órdenes registradas en la base de datos
            data = ReporteService.obtener_ordenes()
            # Retornar respuesta exitosa con la lista de órdenes
            return jsonify({"status": "success", "data": data}), 200
        except Exception as e:
            # Capturar excepciones y retornar error 500
            return jsonify({"status": "error", "message": str(e)}), 500

    @staticmethod
    def obtener_orden(idOrden):
        """
        Endpoint para obtener los detalles completos de una orden específica.
        No requiere autenticación.
        Retorna la información de la orden incluyendo cliente y detalles
        de productos, o error 404 si la orden no existe.
        """
        try:
            # Importación diferida del servicio de órdenes
            from app.services.orden_service import OrdenService
            # Buscar la orden por su ID en la base de datos
            o = OrdenService.obtener_por_id(idOrden)
            # Si no se encontró la orden, retornar error 404
            if not o:
                return jsonify({"status": "error", "message": "Orden no encontrada"}), 404
            # Retornar respuesta exitosa con los datos completos de la orden
            return jsonify({
                "status": "success",
                "data": {
                    "idOrden": o.idOrden,
                    "idCliente": o.idCliente,
                    "nombreCliente": o.cliente.nombreCliente if o.cliente else None,
                    "idUsuario_Admin": o.idUsuario_Admin,
                    "fechaPedido": str(o.fechaPedido) if o.fechaPedido else None,
                    "estadoProd": o.estadoProd,
                    # Construir lista de detalles de productos de la orden
                    "detalles": [
                        {
                            "idDetalle": d.idDetalle,
                            "idProducto": d.idProducto,
                            "nombreProducto": d.producto.nombreProducto if d.producto else None,
                            "cantidadTotal": d.cantidadTotal
                        } for d in o.detalles
                    ]
                }
            }), 200
        except Exception as e:
            # Capturar excepciones y retornar error 500
            return jsonify({"status": "error", "message": str(e)}), 500

    @staticmethod
    def crear_orden():
        """
        Endpoint para crear una nueva orden de producción.
        No requiere autenticación.
        Recibe ID del cliente, ID del administrador, fecha de pedido
        y estado de producción en el cuerpo JSON.
        Retorna el ID de la orden creada con código 201.
        """
        # Obtener el cuerpo de la petición HTTP en formato JSON
        data = request.get_json()
        try:
            # Importación diferida del servicio de órdenes
            from app.services.orden_service import OrdenService
            # Crear la orden con los datos recibidos del JSON
            # El estado de producción tiene un valor por defecto ".." si no se proporciona
            orden = OrdenService.crear_orden(
                idCliente=data.get("idCliente"),
                idUsuario_Admin=data.get("idUsuario_Admin"),
                fechaPedido=data.get("fechaPedido"),
                estadoProd=data.get("estadoProd", "..")
            )
            # Retornar respuesta exitosa con el ID de la orden creada (código 201)
            return jsonify({
                "status": "success",
                "data": {"idOrden": orden.idOrden}
            }), 201
        except Exception as e:
            # Capturar excepciones y retornar error 400
            return jsonify({"status": "error", "message": str(e)}), 400

    @staticmethod
    def actualizar_orden(idOrden):
        """
        Endpoint para actualizar los datos de una orden existente.
        No requiere autenticación.
        Recibe los campos a actualizar en el cuerpo JSON.
        Retorna mensaje de éxito o error 404 si la orden no existe.
        """
        # Obtener el cuerpo de la petición HTTP en formato JSON
        data = request.get_json()
        try:
            # Importación diferida del servicio de órdenes
            from app.services.orden_service import OrdenService
            # Llamar al servicio para actualizar la orden con los datos recibidos
            # Se desempaqueta el diccionario **data para pasar cada campo como argumento
            orden = OrdenService.actualizar_orden(idOrden, **data)
            # Si la orden no fue encontrada, retornar error 404
            if not orden:
                return jsonify({"status": "error", "message": "Orden no encontrada"}), 404
            # Retornar mensaje de éxito si la actualización fue correcta
            return jsonify({"status": "success", "message": "Orden actualizada"}), 200
        except Exception as e:
            # Capturar excepciones y retornar error 400
            return jsonify({"status": "error", "message": str(e)}), 400
