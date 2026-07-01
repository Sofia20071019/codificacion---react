from datetime import date, time, datetime, timedelta
from app.database.database import db
from app.models import JornadaLaboral, Usuario
from app.utils.generar_id import generar_id

TARIFA_POR_HORA = 15000

class JornadaService:

    @staticmethod
    def listar_todas():
        return JornadaLaboral.query.order_by(JornadaLaboral.fecha.desc()).all()

    @staticmethod
    def obtener_por_id(idJornada):
        return JornadaLaboral.query.get(idJornada)

    @staticmethod
    def listar_por_empleado(idUsuario_Empleado):
        return JornadaLaboral.query.filter_by(idUsuario_Empleado=idUsuario_Empleado).order_by(JornadaLaboral.fecha.desc()).all()

    @staticmethod
    def iniciar_jornada(idUsuario_Empleado, fecha=None, hInicio=None):
        nuevo_id = generar_id("JOR", JornadaLaboral, "idJornada")
        jornada = JornadaLaboral(
            idJornada=nuevo_id,
            idUsuario_Empleado=idUsuario_Empleado,
            fecha=fecha or date.today(),
            hInicio=hInicio or datetime.now().time().replace(microsecond=0)
        )
        db.session.add(jornada)
        db.session.commit()
        return jornada

    @staticmethod
    def finalizar_jornada(idJornada, hFin=None):
        jornada = JornadaLaboral.query.get(idJornada)
        if not jornada:
            return None
        jornada.hFin = hFin or datetime.now().time().replace(microsecond=0)
        db.session.commit()
        return jornada

    @staticmethod
    def crear_jornada(idUsuario_Empleado, fecha, hInicio, hFin=None):
        activa = JornadaLaboral.query.filter_by(
            idUsuario_Empleado=idUsuario_Empleado,
            hFin=None
        ).first()
        if activa:
            raise ValueError("El empleado ya tiene una jornada activa sin finalizar. Debe cerrarla primero.")
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

    @staticmethod
    def calcular_horas_totales(idUsuario_Empleado):
        jornadas = JornadaLaboral.query.filter(
            JornadaLaboral.idUsuario_Empleado == idUsuario_Empleado,
            JornadaLaboral.hFin.isnot(None)
        ).all()
        total_segundos = 0
        for j in jornadas:
            if j.hInicio and j.hFin:
                inicio = datetime.combine(date.today(), j.hInicio)
                fin = datetime.combine(date.today(), j.hFin)
                if fin < inicio:
                    fin += timedelta(days=1)
                total_segundos += (fin - inicio).total_seconds()
        horas_totales = total_segundos / 3600
        pago_total = round(horas_totales * TARIFA_POR_HORA, 2)
        return {
            "horasTotales": round(horas_totales, 2),
            "pagoTotal": pago_total,
            "tarifaPorHora": TARIFA_POR_HORA,
            "totalJornadas": len(jornadas)
        }
