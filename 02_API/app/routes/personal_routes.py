from flask import Blueprint, jsonify, request
from app.database.database import db
from app.models import Personal # 🌟 Cambia la línea 3 exactamente a esto

personal_bp = Blueprint('personal_bp', __name__)

@personal_bp.route('/api/personal', methods=['GET'])
def obtener_personal():
    try:
        usuarios = Personal.query.all()
        resultado = [{"id": u.id, "nombre": u.nombre, "email": u.email, "rol": u.rol} for u in usuarios]
        return jsonify(resultado), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@personal_bp.route('/api/personal', methods=['POST'])
def registrar_personal():
    data = request.get_json()
    if not data or 'nombre' not in data or 'email' not in data or 'rol' not in data:
        return jsonify({"error": "Faltan campos obligatorios"}), 400
        
    nuevo_usuario = Personal(nombre=data['nombre'], email=data['email'], rol=data['rol'])
    try:
        db.session.add(nuevo_usuario)
        db.session.commit()
        return jsonify({"message": "Usuario registrado con éxito en Kimuka"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "El correo ya existe o hubo un problema", "detalle": str(e)}), 400