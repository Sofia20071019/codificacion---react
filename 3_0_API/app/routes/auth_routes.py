from flask import Blueprint
from app.controllers.auth_controller import AuthController
from app.utils.decorators import token_requerido
from flask import jsonify

auth_bp = Blueprint("auth", __name__)

auth_bp.add_url_rule("/api/auth/login", view_func=AuthController.login, methods=["POST"])
auth_bp.add_url_rule("/api/auth/recuperar-contrasena", view_func=AuthController.recuperar_contrasena, methods=["POST"])

@auth_bp.route("/api/auth/verificar-token", methods=["GET"])
@token_requerido
def verificar_token():
    return AuthController.verificar_token()
