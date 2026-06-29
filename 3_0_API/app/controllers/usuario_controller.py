from flask import request, jsonify

class UsuarioController:

    @staticmethod
    def listar_usuarios():
        try:
            from app.services.usuario_service import UsuarioService
            usuarios = UsuarioService.listar_todos()
            data = []
            for u in usuarios:
                data.append({
                    "idUsuario": u.idUsuario,
                    "pNombre": u.pNombre,
                    "sNombre": u.sNombre,
                    "pApellido": u.pApellido,
                    "sApellido": u.sApellido,
                    "correo": u.correo,
                    "idRol": u.idRol,
                    "nombreRol": u.rol.nombreRol if u.rol else None,
                    "idEstado": u.idEstado,
                    "nombreEstado": u.estado.nombreEstado if u.estado else None
                })
            return jsonify({"status": "success", "data": data}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    @staticmethod
    def obtener_usuario(idUsuario):
        try:
            from app.services.usuario_service import UsuarioService
            u = UsuarioService.obtener_por_id(idUsuario)
            if not u:
                return jsonify({"status": "error", "message": "Usuario no encontrado"}), 404
            return jsonify({
                "status": "success",
                "data": {
                    "idUsuario": u.idUsuario,
                    "pNombre": u.pNombre,
                    "sNombre": u.sNombre,
                    "pApellido": u.pApellido,
                    "sApellido": u.sApellido,
                    "correo": u.correo,
                    "idRol": u.idRol,
                    "nombreRol": u.rol.nombreRol if u.rol else None,
                    "idEstado": u.idEstado,
                    "nombreEstado": u.estado.nombreEstado if u.estado else None
                }
            }), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    @staticmethod
    def crear_usuario():
        data = request.get_json()
        try:
            from app.services.usuario_service import UsuarioService
            usuario = UsuarioService.crear_usuario(
                pNombre=data.get("pNombre"),
                sNombre=data.get("sNombre"),
                pApellido=data.get("pApellido"),
                sApellido=data.get("sApellido"),
                correo=data.get("correo", "").lower().strip(),
                password=data.get("password"),
                idRol=data.get("idRol"),
                idEstado=data.get("idEstado", "EST-001")
            )
            return jsonify({
                "status": "success",
                "message": "Usuario registrado exitosamente",
                "data": {"idUsuario": usuario.idUsuario, "correo": usuario.correo}
            }), 201
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400

    @staticmethod
    def actualizar_usuario(idUsuario):
        data = request.get_json()
        try:
            from app.services.usuario_service import UsuarioService
            usuario = UsuarioService.actualizar_usuario(idUsuario, **data)
            if not usuario:
                return jsonify({"status": "error", "message": "Usuario no encontrado"}), 404
            return jsonify({"status": "success", "message": "Usuario actualizado"}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400

    @staticmethod
    def eliminar_usuario(idUsuario):
        try:
            from app.services.usuario_service import UsuarioService
            if UsuarioService.eliminar_usuario(idUsuario):
                return jsonify({"status": "success", "message": "Usuario eliminado"}), 200
            return jsonify({"status": "error", "message": "Usuario no encontrado"}), 404
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500
