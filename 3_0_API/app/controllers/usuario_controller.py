from flask import request, jsonify
from app.utils.decorators import token_requerido, rol_requerido

class UsuarioController:

    @staticmethod
    @rol_requerido("ROL-001")
    def listar_usuarios():
        try:
            from app.services.usuario_service import UsuarioService
            usuarios = UsuarioService.listar_todos()
            data = []
            for u in usuarios:
                pNombreCompleto = f"{u.pNombre or ''} {u.sNombre or ''}".strip()
                pApellidoCompleto = f"{u.pApellido or ''} {u.sApellido or ''}".strip()
                nombreCompleto = f"{pNombreCompleto} {pApellidoCompleto}".strip()
                data.append({
                    "idUsuario": u.idUsuario,
                    "nombre": nombreCompleto,
                    "pNombre": u.pNombre,
                    "sNombre": u.sNombre,
                    "pApellido": u.pApellido,
                    "sApellido": u.sApellido,
                    "correo": u.correo,
                    "idRol": u.idRol,
                    "rol": u.rol.nombreRol if u.rol else None,
                    "idEstado": u.idEstado,
                    "estado": u.estado.nombreEstado if u.estado else None
                })
            return jsonify({"status": "success", "data": data}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    @staticmethod
    @rol_requerido("ROL-001")
    def crear_usuario():
        data = request.get_json()
        try:
            from app.services.usuario_service import UsuarioService
            usuario = UsuarioService.crear_usuario(
                pNombre=data.get("pNombre"),
                sNombre=data.get("sNombre"),
                pApellido=data.get("pApellido"),
                sApellido=data.get("sApellido"),
                correo=data.get("correo"),
                password=data.get("password"),
                idRol=data.get("idRol")
            )
            return jsonify({
                "status": "success",
                "data": {
                    "idUsuario": usuario.idUsuario,
                    "nombre": f"{usuario.pNombre} {usuario.pApellido}",
                    "correo": usuario.correo
                }
            }), 201
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400

    @staticmethod
    @token_requerido
    def obtener_usuario(idUsuario):
        try:
            from app.services.usuario_service import UsuarioService
            usuario = UsuarioService.obtener_por_id(idUsuario)
            if not usuario:
                return jsonify({"status": "error", "message": "Usuario no encontrado"}), 404
            return jsonify({
                "status": "success",
                "data": {
                    "idUsuario": usuario.idUsuario,
                    "pNombre": usuario.pNombre,
                    "sNombre": usuario.sNombre,
                    "pApellido": usuario.pApellido,
                    "sApellido": usuario.sApellido,
                    "correo": usuario.correo,
                    "idRol": usuario.idRol,
                    "rol": usuario.rol.nombreRol if usuario.rol else None,
                    "idEstado": usuario.idEstado,
                    "estado": usuario.estado.nombreEstado if usuario.estado else None
                }
            }), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    @staticmethod
    @rol_requerido("ROL-001")
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
    @rol_requerido("ROL-001")
    def eliminar_usuario(idUsuario):
        try:
            from app.services.usuario_service import UsuarioService
            usuario = UsuarioService.eliminar_usuario(idUsuario)
            if not usuario:
                return jsonify({"status": "error", "message": "Usuario no encontrado"}), 404
            return jsonify({"status": "success", "message": "Usuario eliminado"}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400

    @staticmethod
    @rol_requerido("ROL-001")
    def desactivar_usuario(idUsuario):
        try:
            from app.services.usuario_service import UsuarioService
            usuario = UsuarioService.desactivar_usuario(idUsuario)
            if not usuario:
                return jsonify({"status": "error", "message": "Usuario no encontrado"}), 404
            return jsonify({"status": "success", "message": "Usuario desactivado"}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400

    @staticmethod
    @token_requerido
    def listar_empleados():
        try:
            from app.services.usuario_service import UsuarioService
            empleados = UsuarioService.listar_empleados()
            data = []
            for u in empleados:
                pNombreCompleto = f"{u.pNombre or ''} {u.sNombre or ''}".strip()
                pApellidoCompleto = f"{u.pApellido or ''} {u.sApellido or ''}".strip()
                nombreCompleto = f"{pNombreCompleto} {pApellidoCompleto}".strip()
                data.append({
                    "idUsuario": u.idUsuario,
                    "nombre": nombreCompleto,
                    "correo": u.correo,
                    "idEstado": u.idEstado,
                    "estado": u.estado.nombreEstado if u.estado else None
                })
            return jsonify({"status": "success", "data": data}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500
