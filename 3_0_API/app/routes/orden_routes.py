from flask import Blueprint
from app.controllers.orden_controller import OrdenController

orden_bp = Blueprint("orden", __name__)

orden_bp.add_url_rule("/api/ordenes", view_func=OrdenController.listar_ordenes, methods=["GET"])
orden_bp.add_url_rule("/api/ordenes", view_func=OrdenController.crear_orden, methods=["POST"])
orden_bp.add_url_rule("/api/ordenes/<string:idOrden>", view_func=OrdenController.obtener_orden, methods=["GET"])
orden_bp.add_url_rule("/api/ordenes/<string:idOrden>", view_func=OrdenController.actualizar_orden, methods=["PUT"])
