from flask import Blueprint
from app.controllers.pago_controller import PagoController

pago_bp = Blueprint("pago", __name__)

pago_bp.add_url_rule("/api/pagos", view_func=PagoController.listar_pagos, methods=["GET"])
pago_bp.add_url_rule("/api/pagos", view_func=PagoController.crear_pago, methods=["POST"])
pago_bp.add_url_rule("/api/pagos/<string:idPago>", view_func=PagoController.aprobar_pago, methods=["PUT"])
pago_bp.add_url_rule("/api/pagos/jornada/<string:idJornada>", view_func=PagoController.pagos_por_jornada, methods=["GET"])
