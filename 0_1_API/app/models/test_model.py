from sqlalchemy import Column, Integer, String
from app.database.connection import Base

class RegistroPrueba(Base):
    # Cambiamos el nombre de la tabla interna a algo genérico de prueba para Kimuka
    __tablename__ = "kimuka_prueba"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    detalle = Column(String(100), nullable=False)