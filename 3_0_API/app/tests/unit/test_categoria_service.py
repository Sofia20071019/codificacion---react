from unittest.mock import patch

from app.services.categoria_service import CategoriaService

# Categoria es unobjeto falso y python lo pasa al test como pparametro 
@patch("app.services.categoria_service.Categoria")

# Es un objeto falso 
def test_listar_todas_retorna_las_categorias(mock_categoria):
    
    # Arrange: la consulta simulada devuelve dos categorías
    mock_categoria.query.all.return_value = ["cat1", "cat2"]

    # Act: Esta invoca el "listar_todas"
    resultado = CategoriaService.listar_todas()

    # Assert: Comprueba que debolvio las dos categorias
    assert resultado == ["cat1", "cat2"]


"""
    Hace 5 cosas: pide un ID, crea la categoria, la agrega, hace commit y la devuelve y para provarlo sin base de datos, se remplazan 3 piezzas por falsas con el @patch
"""
@patch("app.services.categoria_service.db")
@patch("app.services.categoria_service.generar_id", return_value="CAT-001")
@patch("app.services.categoria_service.Categoria")


def test_crear_categoria_genera_id_guarda_y_retorna(mock_categoria, mock_generar_id, mock_db):
    
    # Arrange: generar_id simulado y lo devuelve en  "CAT-001"
    nombre = "Telas"

    # Act: Hace el llamado de "crear_categoria" y define el nombre 
    resultado = CategoriaService.crear_categoria(nombre)

    #Assert:     
    # Pide el ID con el prefijo "CAT"
    mock_generar_id.assert_called_once_with("CAT", mock_categoria, "idCategoria")
    
    # Xrea la categoria con ese ID y ese nombre 
    mock_categoria.assert_called_once_with(idCategoria="CAT-001", nombreCategoria="Telas")
    
    # Agrega a la sesion la categoria creada
    mock_db.session.add.assert_called_once_with(mock_categoria.return_value)
    
    # Confirma los cambios una sola vez
    mock_db.session.commit.assert_called_once()
    
    # Debuelve la categoria creada
    assert resultado is mock_categoria.return_value