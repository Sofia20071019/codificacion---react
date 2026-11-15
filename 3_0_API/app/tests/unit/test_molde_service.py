# Trae el modulo de expresiones regulares de python y sirve para comprobar si un texto cumple el patron
import re

from app.services.molde_service import MoldeService

def test_generar_id_prefijo():

    #Arrage: El prefijo usado es el MOL
    prefijo = "MOL"

    #Act: Genera dos IDS pra que se pueda comparar
    id1 = MoldeService._generar_id(prefijo)
    id2 = MoldeService._generar_id(prefijo)

    #Assert: El formato MOL-000000 (hex. 6 en mayuscula) y distintos entre si 
    assert re.match(r"^MOL-[0-9A-F]{6}$", id1)
    assert id1 != id2

def test_validar_texto_valido():
    """
       Funciona con un estilo para poder probar varios textos a la vez y con un solo texto podrias escribirlo mas simple 
    """

    # Arrage: Tiene una lista con solo texto, letras, numeros, comas y espacios y todo eso lo permite la "REGEX"
    texto = ["Molde base 2026, talla M"]

    # Act: Por cada texto (t) de la lista llama la validacion y la guarda
    resultado = [MoldeService.validar_texto(t) for t in texto]

    # Assert: Compara lo que salio con lo que se esperaba (True)
    assert resultado == [True]

 
"""
    Las dos funciones comprueban la misma funcion con distintos nombres de archivo con los permisos que solo acepta (png, jpg, jpeg y webp)
"""
def test_extension_valida_formatos_permitidos():

    # Arrage: Tiene una lista con cuatro nombres de archivo que deberian aceptarse
    nombres = ["foto.png", "FOTO.JPG", "imagen.jpeg", "molde.webp"]

    # Act: Prueba cada nombre con "extencion_valida" y guarda la respuesta en una lista
    resultado =[MoldeService.extension_valida(n) for n in nombres]

    #Assert: Valida que los cuatros archivos dieran (True)
    assert resultado == [True, True, True, True]


def test_extension_valida_formatos_no_permitidos():
    
    #Arrage: tres nombres que deberian rechazarse 
    nombres = ["documento.pdf", "archivo", "malicioso.png.exe"]

    # Act: Prueba que los nombres se guarden en la lista
    resultado = [MoldeService.extension_valida(n) for n in nombres]

    #Assert: Valida que los tres archivos dieran (False)
    assert resultado == [False, False, False]