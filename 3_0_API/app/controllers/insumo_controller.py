from flask import request, jsonify

class InsumoController:

    @staticmethod
    def listar_insumos():
        try:
            from app.services.insumo_service import InsumoService
            insumos = InsumoService.listar_todos()
            data = []
            for i in insumos:
                data.append({
                    "idInsumo": i.idInsumo,
                    "nombreInsumo": i.nombreInsumo,
                    "idCategoria": i.idCategoria,
                    "nombreCategoria": i.categoria.nombreCategoria if i.categoria else None,
                    "idUnidad": i.idUnidad,
                    "nombreUnidad": i.unidad.nombreUnidad if i.unidad else None
                })
            return jsonify({"status": "success", "data": data}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    @staticmethod
    def crear_insumo():
        data = request.get_json()
        try:
            from app.services.insumo_service import InsumoService
            insumo = InsumoService.crear_insumo(
                nombreInsumo=data.get("nombreInsumo"),
                idCategoria=data.get("idCategoria"),
                idUnidad=data.get("idUnidad")
            )
            return jsonify({
                "status": "success",
                "data": {"idInsumo": insumo.idInsumo, "nombreInsumo": insumo.nombreInsumo}
            }), 201
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400

    @staticmethod
    def actualizar_insumo(idInsumo):
        data = request.get_json()
        try:
            from app.services.insumo_service import InsumoService
            insumo = InsumoService.actualizar_insumo(idInsumo, **data)
            if not insumo:
                return jsonify({"status": "error", "message": "Insumo no encontrado"}), 404
            return jsonify({"status": "success", "message": "Insumo actualizado"}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400

    @staticmethod
    def eliminar_insumo(idInsumo):
        try:
            from app.services.insumo_service import InsumoService
            if InsumoService.eliminar_insumo(idInsumo):
                return jsonify({"status": "success", "message": "Insumo eliminado"}), 200
            return jsonify({"status": "error", "message": "Insumo no encontrado"}), 404
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500
