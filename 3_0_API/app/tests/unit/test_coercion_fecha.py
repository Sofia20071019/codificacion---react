from datetime import date, datetime
from app.utils.generador_excel import _coercion_fecha


# Caso 1: Cadena con formato estándar YYYY-MM-DD
def test_coercion_fecha_formato_estandar():
    # ARRANGE
    valor_entrada = "2026-10-27"
    esperado = date(2026, 10, 27)

    # ACT
    resultado = _coercion_fecha(valor_entrada)

    # ASSERT
    assert resultado == esperado


# Caso 2: Cadena con prefijo de fecha y sufijo/timestamp (ISO 8601)
def test_coercion_fecha_con_timestamp():
    # ARRANGE
    valor_entrada = "2026-10-27T15:30:00"
    esperado = date(2026, 10, 27)

    # ACT
    resultado = _coercion_fecha(valor_entrada)

    # ASSERT
    assert resultado == esperado
    assert type(resultado) is date


# Caso 3: Ya es un objeto date nativo (debe mantenerse intacto)
def test_coercion_fecha_objeto_date_existente():
    # ARRANGE
    valor_entrada = date(2026, 10, 27)
    esperado = date(2026, 10, 27)

    # ACT
    resultado = _coercion_fecha(valor_entrada)

    # ASSERT
    assert resultado == esperado
    assert resultado is valor_entrada


# Caso 4: Ya es un objeto datetime nativo (debe mantenerse intacto)
def test_coercion_fecha_objeto_datetime_existente():
    # ARRANGE
    valor_entrada = datetime(2026, 10, 27, 10, 0, 0)
    esperado = datetime(2026, 10, 27, 10, 0, 0)

    # ACT
    resultado = _coercion_fecha(valor_entrada)

    # ASSERT
    assert resultado == esperado
    assert resultado is valor_entrada
    assert type(resultado) is datetime


# Caso 5: Formato de fecha no compatible (ej. DD/MM/YYYY)
def test_coercion_fecha_formato_no_compatible():
    # ARRANGE
    valor_entrada = "27/10/2026"
    esperado = "27/10/2026"

    # ACT
    resultado = _coercion_fecha(valor_entrada)

    # ASSERT
    assert resultado == esperado


# Caso 6: Cadena incompleta o corta (menos de 10 caracteres)
def test_coercion_fecha_cadena_corta():
    # ARRANGE
    valor_entrada = "2026-10"
    esperado = "2026-10"

    # ACT
    resultado = _coercion_fecha(valor_entrada)

    # ASSERT
    assert resultado == esperado


# Caso 7: Cadena de texto arbitrario que no corresponde a una fecha
def test_coercion_fecha_texto_arbitrario():
    # ARRANGE
    valor_entrada = "no_es_una_fecha"
    esperado = "no_es_una_fecha"

    # ACT
    resultado = _coercion_fecha(valor_entrada)

    # ASSERT
    assert resultado == esperado


# Caso 8: Entrada de tipo None
def test_coercion_fecha_entrada_none():
    # ARRANGE
    valor_entrada = None
    esperado = None

    # ACT
    resultado = _coercion_fecha(valor_entrada)

    # ASSERT
    assert resultado == esperado


# Caso 9: Tipos numéricos no string (enteros y flotantes)
def test_coercion_fecha_tipo_numerico():
    # ARRANGE
    valor_entrada = 10500
    esperado = 10500

    # ACT
    resultado = _coercion_fecha(valor_entrada)

    # ASSERT
    assert resultado == esperado


# Caso 10: Cadena con fecha y hora separadas por espacio (UNIT-08)
def test_coercion_fecha_con_hora_separada_por_espacio():
    # ARRANGE
    valor_entrada = "2026-08-09 14:30:00"
    esperado = date(2026, 8, 9)

    # ACT
    resultado = _coercion_fecha(valor_entrada)

    # ASSERT
    assert resultado == esperado
    assert type(resultado) is date


# Caso 11: Mes y día fuera de rango (2026-13-45) (UNIT-09)
def test_coercion_fecha_mes_y_dia_fuera_de_rango():
    # ARRANGE
    valor_entrada = "2026-13-45"
    esperado = "2026-13-45"

    # ACT
    resultado = _coercion_fecha(valor_entrada)

    # ASSERT
    assert resultado == esperado


# Caso 12: Fecha inexistente en el calendario (30 de febrero) (UNIT-09)
def test_coercion_fecha_fecha_inexistente():
    # ARRANGE
    valor_entrada = "2026-02-30"
    esperado = "2026-02-30"

    # ACT
    resultado = _coercion_fecha(valor_entrada)

    # ASSERT
    assert resultado == esperado


# Caso 13: Cadena vacía (UNIT-09)
def test_coercion_fecha_cadena_vacia():
    # ARRANGE
    valor_entrada = ""
    esperado = ""

    # ACT
    resultado = _coercion_fecha(valor_entrada)

    # ASSERT
    assert resultado == esperado


# Caso 14: Número flotante (debe mantenerse sin cambios) (UNIT-10)
def test_coercion_fecha_tipo_flotante():
    # ARRANGE
    valor_entrada = 3.14
    esperado = 3.14

    # ACT
    resultado = _coercion_fecha(valor_entrada)

    # ASSERT
    assert resultado == esperado


# Caso 15: Número cero (valor límite, debe mantenerse sin cambios) (UNIT-10)
def test_coercion_fecha_numero_cero():
    # ARRANGE
    valor_entrada = 0
    esperado = 0

    # ACT
    resultado = _coercion_fecha(valor_entrada)

    # ASSERT
    assert resultado == esperado
