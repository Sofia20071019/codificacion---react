import pytest

from datetime import date, time
from app.database.database import db
from app.models import JornadaLaboral, MetodoPago, Pago


@pytest.fixture
def metodo_pago(app):
    """
        Es un fixture que crea el metodo de pago (MET-001) en la base de datos temporal.
        Los test que lo piden lo reciben ya creado y se necesita porque (Pago) tiene
        una llave foranea hacia (MetodoPago)
    """
    db.session.add(MetodoPago(idMetodo="MET-001", nombreMetodo="Efectivo"))

    db.session.commit()


def _crear_jornada(id_jornada, fecha, h_inicio, h_fin):
    """
        Es una funcion auxiliar que inserta una jornada del empleado (USR-002) directo
        a la base de datos y se usa para armar el escenario sin pasar por la API.
        Si (h_fin) es (None), la jornada queda abierta
    """
    db.session.add(JornadaLaboral(
        idJornada=id_jornada, idUsuario_Empleado="USR-002",
        fecha=fecha, hInicio=h_inicio, hFin=h_fin,
    ))
    db.session.commit()


# Prueba que iniciar una jornada funciona y queda guardada sin hora de fin
def test_crear_jornada_retorna_201(client, admin, empleado):

    # Arrange: Prepara el JSON que envia el frontend
    datos = {"idUsuario_Empleado": "USR-002", "fecha": "2026-10-27", "hInicio": "08:00:00"}

    # Act: Hace el POST a la API con el token admin
    respuesta = client.post("/api/jornadas", json=datos, headers=admin["headers"])

    # Assert: La API la crea, busca su jornada, queda guardada y queda abierta sin hora de fin
    assert respuesta.status_code == 201
    jornada = JornadaLaboral.query.filter_by(idUsuario_Empleado="USR-002").first()
    assert jornada is not None
    assert jornada.hFin is None


# Prueba que un empleado con jornada abierta no pueda abrir otra
def test_crear_segunda_jornada_retorna_409(client, admin, empleado):

    # Arrange: Jornada abierta directa en la base de datos
    _crear_jornada("JOR-001", date(2026, 10, 27), time(8, 0), None)
    datos = {"idUsuario_Empleado": "USR-002", "fecha": "2026-10-27", "hInicio": "09:00:00"}

    # Act
    respuesta = client.post("/api/jornadas", json=datos, headers=admin["headers"])

    # Assert
    assert respuesta.status_code == 409
    assert JornadaLaboral.query.filter_by(idUsuario_Empleado="USR-002").count() == 1


# Prueba que la lista de pendientes de pago no incluye jornadas ya pagadas
def test_jornadas_pendientes_excepto_la_de_pago(client, admin, empleado, metodo_pago):

    # Arrange
    _crear_jornada("JOR-001", date(2026, 10, 27), time(8, 0), time(16, 0))
    _crear_jornada("JOR-002", date(2026, 10, 28), time(8, 0), time(12, 0))
    db.session.add(Pago(idPago="PAG-001", idJornada="JOR-001", idUsuario_Admin="USR-001",
                        montoPagado=120000, idMetodo="MET-001", fechaPago=date(2026, 10, 28)))
    db.session.commit()

    # Act
    respuesta = client.get("/api/jornadas/pendientes/USR-002", headers=admin["headers"])

    # Assert
    datos = respuesta.get_json()["data"]
    assert respuesta.status_code == 200
    assert len(datos) == 1
    assert datos[0]["idJornada"] == "JOR-002"
    assert datos[0]["horas"] == 4.0
    assert datos[0]["pagoEstimado"] == 60000.0


# Prueba que registrar un pago funciona y queda guardado
def test_crear_pago_retorna_201(client, admin, empleado, metodo_pago):

    # Arrange
    _crear_jornada("JOR-001", date(2026, 10, 27), time(8, 0), time(16, 0))
    datos = {"idJornada": "JOR-001", "idUsuario_Admin": "USR-001",
             "montoPagado": 120000, "idMetodo": "MET-001"}

    # Act
    respuesta = client.post("/api/pagos", json=datos, headers=admin["headers"])

    # Assert
    assert respuesta.status_code == 201
    assert Pago.query.filter_by(idJornada="JOR-001").count() == 1


# Prueba que una jornada no se pueda pagar dos veces
def test_crear_pago_duplicado_misma_jornada_400(client, admin, empleado, metodo_pago):

    # Arrange
    _crear_jornada("JOR-001", date(2026, 10, 27), time(8, 0), time(16, 0))
    db.session.add(Pago(idPago="PAG-001", idJornada="JOR-001", idUsuario_Admin="USR-001",
                        montoPagado=120000, idMetodo="MET-001", fechaPago=date(2026, 10, 28)))
    db.session.commit()
    datos = {"idJornada": "JOR-001", "idUsuario_Admin": "USR-001",
             "montoPagado": 120000, "idMetodo": "MET-001"}

    # Act
    respuesta = client.post("/api/pagos", json=datos, headers=admin["headers"])

    # Assert
    assert respuesta.status_code == 400
    assert Pago.query.filter_by(idJornada="JOR-001").count() == 1