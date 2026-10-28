# =============================================================================
# ARCHIVO: conftest.py
# PROPOSITO: Configuracion global de pytest y definicion de fixtures (fase
#            Arrange base) para las pruebas de la API. Crea una instancia de
#            la aplicacion Flask conectida a una base de datos temporal en
#            memoria RAM (SQLite) y destruye las tablas al finalizar cada prueba.
# =============================================================================

import pytest

from app import create_app
from app.config.settings import TestingConfig
from app.database.database import db


@pytest.fixture
def app():
    app = create_app(config_class=TestingConfig)
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def runner(app):
    return app.test_cli_runner()
