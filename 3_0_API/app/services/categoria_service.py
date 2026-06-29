from app.database.database import db
from app.models import Categoria
from app.utils.generar_id import generar_id

class CategoriaService:

    @staticmethod
    def listar_todas():
        return Categoria.query.all()

    @staticmethod
    def crear_categoria(nombreCategoria):
        nuevo_id = generar_id("CAT", Categoria, "idCategoria")
        cat = Categoria(idCategoria=nuevo_id, nombreCategoria=nombreCategoria)
        db.session.add(cat)
        db.session.commit()
        return cat
