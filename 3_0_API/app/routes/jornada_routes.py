from flask import Blueprint
from app.controllers.jornada_controller import JornadaController

jornada_bp = Blueprint("jornada", __name__)

jornada_bp.add_url_rule("/api/jornadas", view_func=JornadaController.listar_jornadas, methods=["GET"])
jornada_bp.add_url_rule("/api/jornadas", view_func=JornadaController.crear_jornada, methods=["POST"])
jornada_bp.add_url_rule("/api/jornadas/<string:idJornada>", view_func=JornadaController.finalizar_jornada, methods=["PUT"])
jornada_bp.add_url_rule("/api/jornadas/empleado/<string:idUsuario>", view_func=JornadaController.jornadas_empleado, methods=["GET"])
jornada_bp.add_url_rule("/api/jornadas/calcular-pago/<string:idUsuario>", view_func=JornadaController.calcular_pago, methods=["GET"])
