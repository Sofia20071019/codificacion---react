from flask import Blueprint
from app.controllers.unidad_medida_controller import UnidadMedidaController

unidad_medida_bp = Blueprint("unidad_medida", __name__)

unidad_medida_bp.add_url_rule("/api/unidades-medida", view_func=UnidadMedidaController.listar_unidades, methods=["GET"])
