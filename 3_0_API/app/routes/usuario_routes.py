from flask import Blueprint
from app.controllers.usuario_controller import UsuarioController

# Creamos el Blueprint para los usuarios
usuario_bp = Blueprint("usuario", __name__)

# Mapeo directo al método del controlador para registrar (POST)
# Esto equivale a enlazar la URL /usuarios con la función del controlador
usuario_bp.add_url_rule(
    "/usuarios", 
    view_func=UsuarioController.registrar_usuario, 
    methods=["POST"]
)