from flask import jsonify, request
from app.database.database import db

class EmpleadoController:

    @staticmethod
    def obtener_mis_asignaciones(id_empleado):
        """
        Retorna las órdenes o tareas asignadas al operario logueado.
        (Equivalente a lo que se ve en tu módulo de producción)
        """
        try:
            from app.models.usuario import Usuario
            
            empleado = Usuario.query.get(id_empleado)
            if not empleado:
                return jsonify({"status": "error", "message": "Empleado no encontrado"}), 404

            asignaciones = [
                {
                    "idProduction": "101",
                    "operario": f"{empleado.pNombre} {empleado.pApellido}",
                    "fechaAsignacion": "02/06/2026 08:00",
                    "cantidad": 150,
                    "estado": "Asignada"
                }
            ]
            return jsonify({"status": "success", "data": asignaciones}), 200
            
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500