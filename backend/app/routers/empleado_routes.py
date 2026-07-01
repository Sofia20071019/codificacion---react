from flask import Blueprint
from app.controllers.empleado_controllers import EmpleadoController

empleado_bp = Blueprint('empleado', __name__, url_prefix='/api/empleado')

@empleado_bp.route('/<string:id_empleado>/asignaciones', methods=['GET'])
def ver_mis_tareas(id_empleado):
    return EmpleadoController.obtener_mis_asignaciones(id_empleado)