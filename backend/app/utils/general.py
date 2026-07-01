from app.database.database import db

def generar_id(prefijo, modelo, columna_pk):
    """
    Genera un ID secuencial alfanumérico.
    Ejemplo: generar_id("EMP", Usuario, "idUsuario") -> "EMP-001"
    """
    try:
        ultimo = db.session.query(modelo).order_by(modelo.__table__.c[columna_pk].desc()).first()
        
        if ultimo:
            id_actual = getattr(ultimo, columna_pk)
            if "-" in id_actual:
                num = int(id_actual.split("-")[1]) + 1
            else:
                import re
                numeros = re.findall(r'\d+', id_actual)
                num = int(numeros[-1]) + 1 if numeros else 1
        else:
            num = 1
            
        return f"{prefijo}-{num:03d}"
        
    except Exception as e:
        print(f"Error generando ID para {prefijo}: {str(e)}")
        return f"{prefijo}-001"