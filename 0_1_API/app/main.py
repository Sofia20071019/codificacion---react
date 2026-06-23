from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.database.connection import engine, Base, get_db
from app.models.test_model import RegistroPrueba

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Kimuka API - Pruebas")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ruta POST modificada para recibir nombre y detalle
@app.post("/api/v1/prueba-conexion", tags=["Prueba MySQL"])
def crear_registro(nombre: str, detalle: str, db: Session = Depends(get_db)):
    nuevo_registro = RegistroPrueba(nombre=nombre, detalle=detalle)
    db.add(nuevo_registro)
    db.commit()
    db.refresh(nuevo_registro)
    return {"status": "success", "message": "¡Conectado exitosamente a Kimuka2_db!", "data": nuevo_registro}

@app.get("/api/v1/prueba-conexion", tags=["Prueba MySQL"])
def obtener_registros(db: Session = Depends(get_db)):
    return db.query(RegistroPrueba).all()