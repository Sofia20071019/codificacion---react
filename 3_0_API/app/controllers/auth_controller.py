from flask import request, jsonify
from app.utils.jwt_utils import generar_token

class AuthController:

    @staticmethod
    def login():
        data = request.get_json()
        correo = data.get("correo", "").lower().strip()
        password = data.get("password", "")

        try:
            from app.services.auth_service import AuthService
            usuario = AuthService.login(correo, password)
            if not usuario:
                return jsonify({"status": "error", "message": "Credenciales inválidas"}), 401

            token = generar_token(usuario)

            pNombreCompleto = f"{usuario.pNombre or ''} {usuario.sNombre or ''}".strip()
            pApellidoCompleto = f"{usuario.pApellido or ''} {usuario.sApellido or ''}".strip()
            nombreCompleto = f"{pNombreCompleto} {pApellidoCompleto}".strip()

            return jsonify({
                "status": "success",
                "data": {
                    "idUsuario": usuario.idUsuario,
                    "nombre": nombreCompleto,
                    "correo": usuario.correo,
                    "rol": usuario.rol.nombreRol if usuario.rol else None,
                    "idRol": usuario.idRol,
                    "token": token
                }
            }), 200

        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    @staticmethod
    def recuperar_contrasena():
        data = request.get_json()
        correo = data.get("correo", "").lower().strip()

        try:
            from app.services.auth_service import AuthService
            existe = AuthService.recuperar_contrasena(correo)
            if existe:
                return jsonify({"status": "success", "message": "Solicitud enviada al administrador."}), 200
            return jsonify({"status": "error", "message": "Correo no registrado."}), 404
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    @staticmethod
    def verificar_token():
        from app.utils.decorators import token_requerido
        return jsonify({
            "status": "success",
            "data": request.usuario
        }), 200
