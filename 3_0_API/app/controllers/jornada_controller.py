from flask import request, jsonify

class JornadaController:

    @staticmethod
    def listar_jornadas():
        try:
            from app.services.jornada_service import JornadaService
            jornadas = JornadaService.listar_todas()
            data = []
            for j in jornadas:
                data.append({
                    "idJornada": j.idJornada,
                    "idUsuario_Empleado": j.idUsuario_Empleado,
                    "fecha": str(j.fecha) if j.fecha else None,
                    "hInicio": str(j.hInicio) if j.hInicio else None,
                    "hFin": str(j.hFin) if j.hFin else None
                })
            return jsonify({"status": "success", "data": data}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    @staticmethod
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
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400

    @staticmethod
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
