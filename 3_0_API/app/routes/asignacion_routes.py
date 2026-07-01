from flask import Blueprint
from app.controllers.asignacion_controller import AsignacionController

asignacion_bp = Blueprint("asignacion", __name__)

asignacion_bp.add_url_rule("/api/asignaciones", view_func=AsignacionController.listar_asignaciones, methods=["GET"])
asignacion_bp.add_url_rule("/api/asignaciones", view_func=AsignacionController.crear_asignacion, methods=["POST"])
asignacion_bp.add_url_rule("/api/asignaciones/empleado/<string:idUsuario>", view_func=AsignacionController.asignaciones_empleado, methods=["GET"])
asignacion_bp.add_url_rule("/api/asignaciones/<string:idAsignacion>/estado", view_func=AsignacionController.cambiar_estado, methods=["PUT"])
