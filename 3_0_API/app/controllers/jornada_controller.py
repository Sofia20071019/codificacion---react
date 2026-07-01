from flask import request, jsonify
from app.utils.decorators import token_requerido, rol_requerido

class JornadaController:

    @staticmethod
    @token_requerido
    def listar_jornadas():
        try:
            from app.services.jornada_service import JornadaService
            from app.models import Usuario
            usuario_id = request.usuario.get("idUsuario")
            id_rol = request.usuario.get("idRol")

            if id_rol == "ROL-001":
                jornadas = JornadaService.listar_todas()
            else:
                jornadas = JornadaService.listar_por_empleado(usuario_id)

            data = []
            for j in jornadas:
                empleado = Usuario.query.get(j.idUsuario_Empleado)
                nombre_empleado = f"{empleado.pNombre or ''} {empleado.pApellido or ''}".strip() if empleado else "Desconocido"
                data.append({
                    "idJornada": j.idJornada,
                    "idUsuario_Empleado": j.idUsuario_Empleado,
                    "nombreEmpleado": nombre_empleado,
                    "fecha": str(j.fecha) if j.fecha else None,
                    "hInicio": str(j.hInicio) if j.hInicio else None,
                    "hFin": str(j.hFin) if j.hFin else None
                })
            return jsonify({"status": "success", "data": data}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    @staticmethod
    @token_requerido
    def crear_jornada():
        data = request.get_json()
        try:
            from app.services.jornada_service import JornadaService
            jornada = JornadaService.crear_jornada(
                idUsuario_Empleado=data.get("idUsuario_Empleado"),
                fecha=data.get("fecha"),
                hInicio=data.get("hInicio"),
                hFin=data.get("hFin")
            )
            return jsonify({
                "status": "success",
                "data": {
                    "idJornada": jornada.idJornada,
                    "operario": jornada.empleado.pNombre if jornada.empleado else None,
                    "horaEntrada": str(jornada.hInicio) if jornada.hInicio else None
                }
            }), 201
        except ValueError as e:
            return jsonify({"status": "error", "message": str(e)}), 409
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400

    @staticmethod
    @token_requerido
    def finalizar_jornada(idJornada):
        data = request.get_json()
        try:
            from app.services.jornada_service import JornadaService
            jornada = JornadaService.finalizar_jornada(idJornada, hFin=data.get("hFin"))
            if not jornada:
                return jsonify({"status": "error", "message": "Jornada no encontrada"}), 404
            return jsonify({"status": "success", "message": "Jornada finalizada"}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400

    @staticmethod
    @token_requerido
    def jornadas_empleado(idUsuario):
        try:
            from app.services.jornada_service import JornadaService
            from app.models import Usuario
            jornadas = JornadaService.listar_por_empleado(idUsuario)
            empleado = Usuario.query.get(idUsuario)
            nombre_empleado = f"{empleado.pNombre or ''} {empleado.pApellido or ''}".strip() if empleado else "Desconocido"
            data = []
            for j in jornadas:
                data.append({
                    "idJornada": j.idJornada,
                    "fecha": str(j.fecha) if j.fecha else None,
                    "hInicio": str(j.hInicio) if j.hInicio else None,
                    "hFin": str(j.hFin) if j.hFin else None
                })
            return jsonify({
                "status": "success",
                "data": {
                    "empleado": nombre_empleado,
                    "idUsuario": idUsuario,
                    "jornadas": data
                }
            }), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    @staticmethod
    @token_requerido
    def calcular_pago(idUsuario):
        try:
            from app.services.jornada_service import JornadaService
            calculo = JornadaService.calcular_horas_totales(idUsuario)
            return jsonify({"status": "success", "data": calculo}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500
