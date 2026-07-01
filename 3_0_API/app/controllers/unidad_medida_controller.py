from flask import jsonify
from app.utils.decorators import token_requerido

class UnidadMedidaController:

    @staticmethod
    @token_requerido
    def listar_unidades():
        try:
            from app.services.unidad_medida_service import UnidadMedidaService
            unidades = UnidadMedidaService.listar_todas()
            data = [{"idUnidad": u.idUnidad, "nombreUnidad": u.nombreUnidad} for u in unidades]
            return jsonify({"status": "success", "data": data}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500
