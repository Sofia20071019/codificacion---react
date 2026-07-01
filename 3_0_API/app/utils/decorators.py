from functools import wraps
from flask import request, jsonify
from app.utils.jwt_utils import verificar_token

def token_requerido(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return jsonify({"status": "error", "message": "Token requerido"}), 401
        token = auth_header.split(" ", 1)[1]
        payload = verificar_token(token)
        if not payload:
            return jsonify({"status": "error", "message": "Token inválido o expirado"}), 401
        request.usuario = payload
        return f(*args, **kwargs)
    return decorated

def rol_requerido(*roles):
    def decorator(f):
        @wraps(f)
        @token_requerido
        def decorated(*args, **kwargs):
            if request.usuario.get("idRol") not in roles:
                return jsonify({"status": "error", "message": "No tienes permisos para acceder a este recurso"}), 403
            return f(*args, **kwargs)
        return decorated
    return decorator
