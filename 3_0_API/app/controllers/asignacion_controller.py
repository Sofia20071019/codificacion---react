from flask import request, jsonify
from app.utils.decorators import token_requerido, rol_requerido

class AsignacionController:

    @staticmethod
    @rol_requerido("ROL-001")
    def listar_asignaciones():
        try:
            from app.services.asignacion_service import AsignacionService
            from app.models import Usuario, Insumo
            asignaciones = AsignacionService.listar_todas()
            data = []
            for a in asignaciones:
                empleado = Usuario.query.get(a.idUsuario_Empleado)
                insumo = Insumo.query.get(a.idInsumo)
                data.append({
                    "idAsignacion": a.idAsignacion,
                    "idUsuario_Empleado": a.idUsuario_Empleado,
                    "nombreEmpleado": f"{empleado.pNombre or ''} {empleado.pApellido or ''}".strip() if empleado else "Desconocido",
                    "idInsumo": a.idInsumo,
                    "nombreInsumo": insumo.nombreInsumo if insumo else "Desconocido",
                    "cantidad": float(a.cantidad) if a.cantidad else 0,
                    "fechaAsignacion": str(a.fechaAsignacion) if a.fechaAsignacion else None,
                    "estado": a.estado
                })
            return jsonify({"status": "success", "data": data}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    @staticmethod
    @token_requerido
    def asignaciones_empleado(idUsuario):
        try:
            from app.services.asignacion_service import AsignacionService
            from app.models import Insumo
            asignaciones = AsignacionService.listar_por_empleado(idUsuario)
            data = []
            for a in asignaciones:
                insumo = Insumo.query.get(a.idInsumo)
                data.append({
                    "idAsignacion": a.idAsignacion,
                    "idInsumo": a.idInsumo,
                    "nombreInsumo": insumo.nombreInsumo if insumo else "Desconocido",
                    "cantidad": float(a.cantidad) if a.cantidad else 0,
                    "fechaAsignacion": str(a.fechaAsignacion) if a.fechaAsignacion else None,
                    "estado": a.estado
                })
            return jsonify({"status": "success", "data": data}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    @staticmethod
    @rol_requerido("ROL-001")
    def crear_asignacion():
        data = request.get_json()
        try:
            from app.services.asignacion_service import AsignacionService
            asignacion = AsignacionService.crear_asignacion(
                idUsuario_Empleado=data.get("idUsuario_Empleado"),
                idInsumo=data.get("idInsumo"),
                cantidad=data.get("cantidad")
            )
            return jsonify({
                "status": "success",
                "data": {
                    "idAsignacion": asignacion.idAsignacion,
                    "empleado": asignacion.empleado.pNombre if asignacion.empleado else None,
                    "insumo": asignacion.insumo.nombreInsumo if asignacion.insumo else None,
                    "cantidad": float(asignacion.cantidad)
                }
            }), 201
        except ValueError as e:
            return jsonify({"status": "error", "message": str(e)}), 409
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400

    @staticmethod
    @token_requerido
    def cambiar_estado(idAsignacion):
        data = request.get_json()
        try:
            from app.services.asignacion_service import AsignacionService
            asignacion = AsignacionService.cambiar_estado(idAsignacion, data.get("estado"))
            if not asignacion:
                return jsonify({"status": "error", "message": "Asignacion no encontrada"}), 404
            return jsonify({"status": "success", "message": f"Estado actualizado a {asignacion.estado}"}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400
