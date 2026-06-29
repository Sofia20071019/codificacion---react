from flask import Blueprint
from app.controllers.rol_controller import RolController

rol_bp = Blueprint("rol", __name__)

rol_bp.add_url_rule("/api/roles", view_func=RolController.listar_roles, methods=["GET"])
rol_bp.add_url_rule("/api/roles", view_func=RolController.crear_rol, methods=["POST"])
