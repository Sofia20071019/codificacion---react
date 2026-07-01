from flask import Blueprint, jsonify, request
from app.database.database import db

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')

@admin_bp.route('/', methods=['GET'])
def index():
    return jsonify({
        "status": "success",
        "message": "¡Módulo de Administración de Kimuka corriendo perfectamente!"
    }), 200

@admin_bp.route('/pedidos', methods=['GET'])
def listar_pedidos():
    try:
        from app.models.cliente import Cliente
        
        clientes = Cliente.query.all()
        resultado = [{
            "idCliente": c.idCliente,
            "nombreCliente": c.nombreCliente,
            "telefono": c.telefono
        } for c in clientes]
        
        return jsonify({
            "status": "success",
            "data": resultado
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@admin_bp.route('/produccion/asignar-operario', methods=['POST'])
def asignar_operario():
    data = request.get_json() or {}
    id_produccion = data.get("idProduccion")
    id_operario = data.get("idOperario")
    fecha = data.get("fechaAsignacion")
    cantidad = data.get("cantidadAsignada")

    if not id_produccion or not id_operario:
        return jsonify({"status": "error", "message": "ID de Producción y Operario son obligatorios"}), 400

    try:
        return jsonify({
            "status": "success", 
            "message": f"Operario {id_operario} asignado con éxito a la producción {id_produccion}"
        }), 201
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500