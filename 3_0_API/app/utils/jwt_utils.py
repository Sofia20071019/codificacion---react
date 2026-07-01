import jwt
import datetime
from flask import current_app

def generar_token(usuario):
    payload = {
        "idUsuario": usuario.idUsuario,
        "correo": usuario.correo,
        "idRol": usuario.idRol,
        "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=12),
        "iat": datetime.datetime.now(datetime.timezone.utc)
    }
    secret = current_app.config.get("SECRET_KEY", "kimuka-jwt-secret-key-titan-sports-2026")
    return jwt.encode(payload, secret, algorithm="HS256")

def verificar_token(token):
    secret = current_app.config.get("SECRET_KEY", "kimuka-jwt-secret-key-titan-sports-2026")
    try:
        payload = jwt.decode(token, secret, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
