from flask import request, jsonify

class ClienteController:

    @staticmethod
    def listar_clientes():
        try:
            from app.services.cliente_service import ClienteService
            clientes = ClienteService.listar_todos()
            data = [{"idCliente": c.idCliente, "nombreCliente": c.nombreCliente, "telefono": c.telefono} for c in clientes]
            return jsonify({"status": "success", "data": data}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    @staticmethod
    def crear_cliente():
        data = request.get_json()
        try:
            from app.services.cliente_service import ClienteService
            c = ClienteService.crear_cliente(data.get("nombreCliente"), telefono=data.get("telefono"))
            return jsonify({"status": "success", "data": {"idCliente": c.idCliente}}), 201
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400
