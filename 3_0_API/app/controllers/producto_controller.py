from flask import request, jsonify

class ProductoController:

    @staticmethod
    def listar_productos():
        try:
            from app.services.producto_service import ProductoService
            productos = ProductoService.listar_todos()
            data = [{"idProducto": p.idProducto, "nombreProducto": p.nombreProducto, "talla": p.talla, "color": p.color} for p in productos]
            return jsonify({"status": "success", "data": data}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    @staticmethod
    def crear_producto():
        data = request.get_json()
        try:
            from app.services.producto_service import ProductoService
            p = ProductoService.crear_producto(data.get("nombreProducto"), talla=data.get("talla"), color=data.get("color"))
            return jsonify({"status": "success", "data": {"idProducto": p.idProducto}}), 201
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400
