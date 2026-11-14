import pytest

from app.services.molde_service import MoldeService

def test_extenciion_valida_formatos_permitidos():
    nombres = ["foto.png", "FOTO.JPG", "imagen.jpeg", "molde.webp"]

    resultado =[MoldeService.extension_valida(n) for n in nombres]

    assert resultado == [True, True, True, True]

def test_extencion_valida_formatos_no_permitidos():
    nombres = ["documento.pdf", "archivo", "malicioso.png.exe"]

    resultado = [MoldeService.extencion_valida(n) for n in nombres]

    assert resultado == [False, False, False]

def test_validad_texto_valido():
    texto = ["Molde base 2026, talla M"]

    resultado = [MoldeService.validar_texto(t) for t in texto]

    assert resultado == [True]