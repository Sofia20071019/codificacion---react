from flask import Blueprint, jsonify, request
from app.database.database import db
from app.models.models import Personal

main_bp = Blueprint('main', __name__)

# 🌟 AGREGA ESTA RUTA GET QUE TE HACÍA FALTA:
@main_bp.route('/', methods=['GET'])
def index():
    return jsonify({
        "status": "success",
        "message": "¡API de Kimuka corriendo perfectamente!"
    }), 200

# Tu ruta POST (Esta ya te funciona perfecto, déjala tal cual)
@main_bp.route('/api/personal', methods=['POST'])
def registrar_personal():
    data = request.get_json()
    
    if not data or 'nombre' not in data or 'email' not in data or 'rol' not in data:
        return jsonify({"error": "Faltan campos obligatorios"}), 400
        
    nuevo_usuario = Personal(
        nombre=data['nombre'],
        email=data['email'],
        rol=data['rol']
    )
    
    try:
        db.session.add(nuevo_usuario)
        db.session.commit()
        return jsonify({"message": "Usuario registrado con éxito en Kimuka"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "El correo ya existe o hubo un problema", "detalle": str(e)}), 400