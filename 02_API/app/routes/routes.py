# app/routes/routes.py
from flask import Blueprint, jsonify, request
from app.database.database import db
from app.models.models import MateriaPrima # 🌟 Ahora sí lo importamos directo

main_bp = Blueprint('main', __name__)

@main_bp.route('/', methods=['GET'])
def index():
    return jsonify({
        "status": "success",
        "message": "¡API de Kimuka corriendo perfectamente!"
    }), 200

@main_bp.route('/api/inventario', methods=['GET', 'POST'])
def inventario():
    if request.method == 'POST':
        data = request.get_json()
        
        if not data or 'nombre' not in data or 'cantidad' not in data or 'categoria' not in data:
            return jsonify({"error": "Faltan campos obligatorios"}), 400
        
        nuevo_material = MateriaPrima(
            nombre=data['nombre'],
            cantidad=data['cantidad'],
            unidad=data['unidad'],
            categoria=data['categoria'],
            referenciaColor=data.get('referenciaColor', ''),
            imagen=data.get('imagen', '')
        )
        
        try:
            db.session.add(nuevo_material)
            db.session.commit()
            return jsonify({"message": "Insumo registrado con éxito"}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": "No se pudo guardar el insumo", "detalle": str(e)}), 500

    # Lógica para retornar la lista completa (GET)
    try:
        materiales = MateriaPrima.query.all()
        resultado = [{
            "id": m.id,
            "nombre": m.nombre,
            "cantidad": m.cantidad,
            "unidad": m.unidad,
            "categoria": m.categoria,
            "referenciaColor": m.referenciaColor,
            "imagen": m.imagen
        } for m in materiales]
        
        return jsonify(resultado), 200
    except Exception as e:
        return jsonify({"error": "Error al consultar el inventario", "detalle": str(e)}), 500