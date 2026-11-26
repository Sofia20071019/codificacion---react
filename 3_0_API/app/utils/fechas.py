"""
ARCHIVO: fechas.py
PROPOSITO: Utilidades reutilizables para convertir fechas y horas enviadas como
           cadenas ISO desde JSON a objetos date y time de Python, manteniendo
           compatibilidad estricta entre MySQL y SQLite.
"""

from datetime import date, datetime, time


def parsear_fecha(valor):
    """Convierte una cadena YYYY-MM-DD (o datetime) en un objeto datetime.date."""
    if valor is None:
        return None
    if isinstance(valor, datetime):
        return valor.date()
    if isinstance(valor, date):
        return valor
    if isinstance(valor, str):
        texto = valor.strip()
        if not texto:
            return None
        return date.fromisoformat(texto[:10])
    raise ValueError(f"Formato de fecha inválido: {valor!r}")


def parsear_hora(valor):
    """Convierte una cadena HH:MM o HH:MM:SS (o datetime) en un objeto datetime.time."""
    if valor is None:
        return None
    if isinstance(valor, datetime):
        return valor.time().replace(microsecond=0)
    if isinstance(valor, time):
        return valor
    if isinstance(valor, str):
        texto = valor.strip()
        if not texto:
            return None
        if len(texto) == 5:
            texto = f"{texto}:00"
        return time.fromisoformat(texto)
    raise ValueError(f"Formato de hora inválido: {valor!r}")
