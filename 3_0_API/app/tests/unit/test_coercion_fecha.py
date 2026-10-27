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


# Caso 3: Ya es un objeto date nativo (debe mantenerse intacto)
def test_coercion_fecha_objeto_date_existente():
    # ARRANGE
    valor_entrada = date(2026, 10, 27)
    esperado = date(2026, 10, 27)

    # ACT
    resultado = _coercion_fecha(valor_entrada)

    # ASSERT
    assert resultado == esperado


# Caso 4: Ya es un objeto datetime nativo (debe mantenerse intacto)
def test_coercion_fecha_objeto_datetime_existente():
    # ARRANGE
    valor_entrada = datetime(2026, 10, 27, 10, 0, 0)
    esperado = datetime(2026, 10, 27, 10, 0, 0)

    # ACT
    resultado = _coercion_fecha(valor_entrada)

    # ASSERT
    assert resultado == esperado


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