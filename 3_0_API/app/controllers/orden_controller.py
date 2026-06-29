from flask import request, jsonify

class OrdenController:

    @staticmethod
    def listar_ordenes():
        try:
            from app.services.orden_service import OrdenService
            ordenes = OrdenService.listar_todas()
            data = []
            for o in ordenes:
                data.append({
                    "idOrden": o.idOrden,
                    "idCliente": o.idCliente,
                    "nombreCliente": o.cliente.nombreCliente if o.cliente else None,
                    "idUsuario_Admin": o.idUsuario_Admin,
                    "fechaPedido": str(o.fechaPedido) if o.fechaPedido else None,
                    "estadoProd": o.estadoProd,
                    "detalles": [
                        {
                            "idDetalle": d.idDetalle,
                            "idProducto": d.idProducto,
                            "nombreProducto": d.producto.nombreProducto if d.producto else None,
                            "cantidadTotal": d.cantidadTotal
                        } for d in o.detalles
                    ]
                })
            return jsonify({"status": "success", "data": data}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    @staticmethod
    def obtener_orden(idOrden):
        try:
            from app.services.orden_service import OrdenService
            o = OrdenService.obtener_por_id(idOrden)
            if not o:
                return jsonify({"status": "error", "message": "Orden no encontrada"}), 404
            return jsonify({
                "status": "success",
                "data": {
                    "idOrden": o.idOrden,
                    "idCliente": o.idCliente,
                    "nombreCliente": o.cliente.nombreCliente if o.cliente else None,
                    "idUsuario_Admin": o.idUsuario_Admin,
                    "fechaPedido": str(o.fechaPedido) if o.fechaPedido else None,
                    "estadoProd": o.estadoProd,
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
            return jsonify({"status": "error", "message": str(e)}), 500

    @staticmethod
    def crear_orden():
        data = request.get_json()
        try:
            from app.services.orden_service import OrdenService
            orden = OrdenService.crear_orden(
                idCliente=data.get("idCliente"),
                idUsuario_Admin=data.get("idUsuario_Admin"),
                fechaPedido=data.get("fechaPedido"),
                estadoProd=data.get("estadoProd", "..")
            )
            return jsonify({
                "status": "success",
                "data": {"idOrden": orden.idOrden}
            }), 201
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400

    @staticmethod
    def actualizar_orden(idOrden):
        data = request.get_json()
        try:
            from app.services.orden_service import OrdenService
            orden = OrdenService.actualizar_orden(idOrden, **data)
            if not orden:
                return jsonify({"status": "error", "message": "Orden no encontrada"}), 404
            return jsonify({"status": "success", "message": "Orden actualizada"}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400
