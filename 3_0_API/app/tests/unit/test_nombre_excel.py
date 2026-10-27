from datetime import date
from unittest.mock import patch
from app.utils.generador_excel import nombre_archivo_excel


# Caso 1: Nombre normal con espacios
def test_nombre_archivo_excel_flujo_normal():
    #  ARRANGE 
    nombre = "Reporte Ventas"
    fecha = date(2026, 10, 27)
    esperado = "Reporte_Ventas_2026-10-27.xlsx"

    # ACT 
    with patch("app.utils.generador_excel.date") as mock_date:
        mock_date.today.return_value = fecha
        resultado = nombre_archivo_excel(nombre)

    # ASSERT 
    assert resultado == esperado


# Caso 2: Cadena vacía (tu normalizador usa "reporte" por defecto)
def test_nombre_archivo_excel_cadena_vacia():
    # ARRANGE 
    nombre = ""
    fecha = date(2026, 10, 27)
    esperado = "reporte_2026-10-27.xlsx"

    # ACT
    with patch("app.utils.generador_excel.date") as mock_date:
        mock_date.today.return_value = fecha
        resultado = nombre_archivo_excel(nombre)

    # ASSERT 
    assert resultado == esperado


# Caso 3: Entrada None (tu normalizador también le asigna el valor por defecto)
def test_nombre_archivo_excel_entrada_none():
    #  ARRANGE
    nombre = None
    fecha = date(2026, 10, 27)
    esperado = "reporte_2026-10-27.xlsx"

    # ACT
    with patch("app.utils.generador_excel.date") as mock_date:
        mock_date.today.return_value = fecha
        resultado = nombre_archivo_excel(nombre)

    # ASSERT 
    assert resultado == esperado