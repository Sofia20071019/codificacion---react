from flask import Blueprint
from app.controllers.auth_controller import AuthController

auth_bp = Blueprint("auth", __name__)

auth_bp.add_url_rule("/api/auth/login", view_func=AuthController.login, methods=["POST"])
auth_bp.add_url_rule("/api/auth/recuperar-contrasena", view_func=AuthController.recuperar_contrasena, methods=["POST"])
