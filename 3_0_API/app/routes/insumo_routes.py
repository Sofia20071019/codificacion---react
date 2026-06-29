from flask import Blueprint
from app.controllers.insumo_controller import InsumoController

insumo_bp = Blueprint("insumo", __name__)

insumo_bp.add_url_rule("/api/insumos", view_func=InsumoController.listar_insumos, methods=["GET"])
insumo_bp.add_url_rule("/api/insumos", view_func=InsumoController.crear_insumo, methods=["POST"])
insumo_bp.add_url_rule("/api/insumos/<string:idInsumo>", view_func=InsumoController.actualizar_insumo, methods=["PUT"])
insumo_bp.add_url_rule("/api/insumos/<string:idInsumo>", view_func=InsumoController.eliminar_insumo, methods=["DELETE"])
