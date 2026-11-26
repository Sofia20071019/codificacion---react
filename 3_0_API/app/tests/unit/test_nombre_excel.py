from datetime import date
from unittest.mock import patch
from app.utils.generador_excel import nombre_archivo_excel


# Caso 1: Nombre normal con espacios (UNIT-05)
def test_nombre_archivo_excel_flujo_normal():
    # ARRANGE
    nombre = "Reporte de Materias Primas"
    fecha = date(2026, 8, 9)
    esperado = "Reporte_de_Materias_Primas_2026-08-09.xlsx"

    # ACT
    with patch("app.utils.generador_excel.date") as mock_date:
        mock_date.today.return_value = fecha
        resultado = nombre_archivo_excel(nombre)

    # ASSERT
    assert resultado == esperado


# Caso 2: Cadena vacía (el normalizador usa "reporte" por defecto) (UNIT-06)
def test_nombre_archivo_excel_cadena_vacia():
    # ARRANGE
    nombre = ""
    fecha = date(2026, 8, 9)
    esperado = "reporte_2026-08-09.xlsx"

    # ACT
    with patch("app.utils.generador_excel.date") as mock_date:
        mock_date.today.return_value = fecha
        resultado = nombre_archivo_excel(nombre)

    # ASSERT
    assert resultado == esperado


# Caso 3: Entrada None (el normalizador también asigna el valor por defecto) (UNIT-06)
def test_nombre_archivo_excel_entrada_none():
    # ARRANGE
    nombre = None
    fecha = date(2026, 8, 9)
    esperado = "reporte_2026-08-09.xlsx"

    # ACT
    with patch("app.utils.generador_excel.date") as mock_date:
        mock_date.today.return_value = fecha
        resultado = nombre_archivo_excel(nombre)

    # ASSERT
    assert resultado == esperado


# Caso 4: El nombre devuelto siempre termina en la extensión .xlsx
def test_nombre_archivo_excel_extension_xlsx():
    # ARRANGE
    nombre = "Inventario"
    fecha = date(2026, 8, 9)

    # ACT
    with patch("app.utils.generador_excel.date") as mock_date:
        mock_date.today.return_value = fecha
        resultado = nombre_archivo_excel(nombre)

    # ASSERT
    assert resultado.endswith(".xlsx")
