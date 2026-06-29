from flask import Blueprint
from app.controllers.usuario_controller import UsuarioController

usuario_bp = Blueprint("usuario", __name__)

usuario_bp.add_url_rule("/api/usuarios", view_func=UsuarioController.listar_usuarios, methods=["GET"])
usuario_bp.add_url_rule("/api/usuarios", view_func=UsuarioController.crear_usuario, methods=["POST"])
usuario_bp.add_url_rule("/api/usuarios/<string:idUsuario>", view_func=UsuarioController.obtener_usuario, methods=["GET"])
usuario_bp.add_url_rule("/api/usuarios/<string:idUsuario>", view_func=UsuarioController.actualizar_usuario, methods=["PUT"])
usuario_bp.add_url_rule("/api/usuarios/<string:idUsuario>", view_func=UsuarioController.eliminar_usuario, methods=["DELETE"])
