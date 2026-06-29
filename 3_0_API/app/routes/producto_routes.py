from flask import Blueprint
from app.controllers.producto_controller import ProductoController

producto_bp = Blueprint("producto", __name__)

producto_bp.add_url_rule("/api/productos", view_func=ProductoController.listar_productos, methods=["GET"])
producto_bp.add_url_rule("/api/productos", view_func=ProductoController.crear_producto, methods=["POST"])
