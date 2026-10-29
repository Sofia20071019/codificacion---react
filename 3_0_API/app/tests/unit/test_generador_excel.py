from app.utils.generador_excel import normalizar_texto


# Caso 1: Tildes y eñes en minúsculas (UNIT-02)
def test_normalizar_texto_tildes_y_enies_minusculas():
    # ARRANGE
    texto_entrada = "áéíóúñü"
    esperado = "aeiounu"

    # ACT
    resultado = normalizar_texto(texto_entrada)

    # ASSERT
    assert resultado == esperado


# Caso 2: Tildes y eñes en mayúsculas (se conserva la mayúscula) (UNIT-02)
def test_normalizar_texto_tildes_y_enies_mayusculas():
    # ARRANGE
    texto_entrada = "ÁÉÍÓÚÑÜ"
    esperado = "AEIOUNU"

    # ACT
    resultado = normalizar_texto(texto_entrada)

    # ASSERT
    assert resultado == esperado


# Caso 3: Frase con tildes, eñes y espacios (espacios reemplazados por "_") (UNIT-02)
def test_normalizar_texto_frase_con_tildes_y_enies():
    # ARRANGE
    texto_entrada = "Reporte de Producción Año Ñandú"
    esperado = "Reporte_de_Produccion_Ano_Nandu"

    # ACT
    resultado = normalizar_texto(texto_entrada)

    # ASSERT
    assert resultado == esperado


# Caso 4: Texto con espacios y signos de puntuación (UNIT-03)
def test_normalizar_texto_espacios_y_puntuacion():
    # ARRANGE
    texto_entrada = "¡Hola, mundo!"
    esperado = "Hola_mundo"

    # ACT
    resultado = normalizar_texto(texto_entrada)

    # ASSERT
    assert resultado == esperado


# Caso 5: Símbolos especiales y múltiples espacios consecutivos (UNIT-03)
def test_normalizar_texto_simbolos_y_espacios_multiples():
    # ARRANGE
    texto_entrada = "Ventas  @2026!!   (Q1)/Final"
    esperado = "Ventas_2026_Q1Final"

    # ACT
    resultado = normalizar_texto(texto_entrada)

    # ASSERT
    assert resultado == esperado


# Caso 6: Cadena vacía retorna el valor por defecto (UNIT-01)
def test_normalizar_texto_cadena_vacia():
    # ARRANGE
    texto_entrada = ""
    esperado = "reporte"

    # ACT
    resultado = normalizar_texto(texto_entrada)

    # ASSERT
    assert resultado == esperado


# Caso 7: Entrada None retorna el valor por defecto (UNIT-01)
def test_normalizar_texto_entrada_none():
    # ARRANGE
    texto_entrada = None
    esperado = "reporte"

    # ACT
    resultado = normalizar_texto(texto_entrada)

    # ASSERT
    assert resultado == esperado


# Caso 8: Solo símbolos (queda vacío tras limpiar) (UNIT-04)
def test_normalizar_texto_solo_simbolos():
    # ARRANGE
    texto_entrada = "@#$%^&*()"
    esperado = "reporte"

    # ACT
    resultado = normalizar_texto(texto_entrada)

    # ASSERT
    assert resultado == esperado


# Caso 9: Solo espacios (queda vacío tras limpiar) (UNIT-04)
def test_normalizar_texto_solo_espacios():
    # ARRANGE
    texto_entrada = "   "
    esperado = "reporte"

    # ACT
    resultado = normalizar_texto(texto_entrada)

    # ASSERT
    assert resultado == esperado


# Caso 10: Solo signos de exclamación (queda vacío tras limpiar) (UNIT-04)
def test_normalizar_texto_solo_signos_exclamacion():
    # ARRANGE
    texto_entrada = "!!!"
    esperado = "reporte"

    # ACT
    resultado = normalizar_texto(texto_entrada)

    # ASSERT
    assert resultado == esperado


# Caso 11: Texto sin caracteres especiales (debe mantenerse igual)
def test_normalizar_texto_sin_caracteres_especiales():
    # ARRANGE
    texto_entrada = "Python"
    esperado = "Python"

    # ACT
    resultado = normalizar_texto(texto_entrada)

    # ASSERT
    assert resultado == esperado
