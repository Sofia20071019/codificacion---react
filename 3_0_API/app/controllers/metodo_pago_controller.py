from flask import jsonify

class MetodoPagoController:

    @staticmethod
    def listar_metodos():
        try:
            from app.services.metodo_pago_service import MetodoPagoService
            metodos = MetodoPagoService.listar_todos()
            data = [{"idMetodo": m.idMetodo, "nombreMetodo": m.nombreMetodo} for m in metodos]
            return jsonify({"status": "success", "data": data}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500
