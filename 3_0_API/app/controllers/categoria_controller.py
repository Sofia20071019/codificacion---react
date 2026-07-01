from flask import jsonify
from app.utils.decorators import token_requerido

class CategoriaController:

    @staticmethod
    @token_requerido
    def listar_categorias():
        try:
            from app.services.categoria_service import CategoriaService
            cats = CategoriaService.listar_todas()
            data = [{"idCategoria": c.idCategoria, "nombreCategoria": c.nombreCategoria} for c in cats]
            return jsonify({"status": "success", "data": data}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500
