from flask import Blueprint
from app.controllers.categoria_controller import CategoriaController

categoria_bp = Blueprint("categoria", __name__)

categoria_bp.add_url_rule("/api/categorias", view_func=CategoriaController.listar_categorias, methods=["GET"])
