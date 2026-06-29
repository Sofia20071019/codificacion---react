from app.database.database import db

def generar_id(prefijo, modelo, columna_pk):
    ultimo = db.session.query(modelo).order_by(modelo.__table__.c[columna_pk].desc()).first()
    if ultimo:
        num = int(getattr(ultimo, columna_pk).split("-")[1]) + 1
    else:
        num = 1
    return f"{prefijo}-{num:03d}"
