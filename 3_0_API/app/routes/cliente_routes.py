from flask import Blueprint
from app.controllers.cliente_controller import ClienteController

cliente_bp = Blueprint("cliente", __name__)

cliente_bp.add_url_rule("/api/clientes", view_func=ClienteController.listar_clientes, methods=["GET"])
cliente_bp.add_url_rule("/api/clientes", view_func=ClienteController.crear_cliente, methods=["POST"])
