from flask import Blueprint
from app.controllers.metodo_pago_controller import MetodoPagoController

metodo_pago_bp = Blueprint("metodo_pago", __name__)

metodo_pago_bp.add_url_rule("/api/metodos-pago", view_func=MetodoPagoController.listar_metodos, methods=["GET"])
