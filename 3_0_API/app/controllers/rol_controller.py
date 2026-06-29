from flask import request, jsonify

class RolController:

    @staticmethod
    def listar_roles():
        try:
            from app.services.rol_service import RolService
            roles = RolService.listar_todos()
            data = [{"idRol": r.idRol, "nombreRol": r.nombreRol} for r in roles]
            return jsonify({"status": "success", "data": data}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    @staticmethod
    def crear_rol():
        data = request.get_json()
        try:
            from app.services.rol_service import RolService
            rol = RolService.crear_rol(data.get("nombreRol"))
            return jsonify({
                "status": "success",
                "data": {"idRol": rol.idRol, "nombreRol": rol.nombreRol}
            }), 201
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400
