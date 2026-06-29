from datetime import date, time
from app.database.database import db
from app.models import JornadaLaboral
from app.utils.generar_id import generar_id

class JornadaService:

    @staticmethod
    def listar_todas():
        return JornadaLaboral.query.all()

    @staticmethod
    def obtener_por_id(idJornada):
        return JornadaLaboral.query.get(idJornada)

    @staticmethod
    def iniciar_jornada(idUsuario_Empleado, fecha=None, hInicio=None):
        nuevo_id = generar_id("JOR", JornadaLaboral, "idJornada")
        jornada = JornadaLaboral(
            idJornada=nuevo_id,
            idUsuario_Empleado=idUsuario_Empleado,
            fecha=fecha or date.today(),
            hInicio=hInicio or time.now().replace(microsecond=0)
        )
        db.session.add(jornada)
        db.session.commit()
        return jornada

    @staticmethod
    def finalizar_jornada(idJornada, hFin=None):
        jornada = JornadaLaboral.query.get(idJornada)
        if not jornada:
            return None
        jornada.hFin = hFin or time.now().replace(microsecond=0)
        db.session.commit()
        return jornada

    @staticmethod
    def crear_jornada(idUsuario_Empleado, fecha, hInicio, hFin=None):
        nuevo_id = generar_id("JOR", JornadaLaboral, "idJornada")
        jornada = JornadaLaboral(
            idJornada=nuevo_id,
            idUsuario_Empleado=idUsuario_Empleado,
            fecha=fecha,
            hInicio=hInicio,
            hFin=hFin
        )
        db.session.add(jornada)
        db.session.commit()
        return jornada
