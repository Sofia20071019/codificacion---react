from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from app.config.settings import Config
from app.database.database import db, bcrypt
from app.models import (
    Rol, EstadoUsuario, Usuario, Categoria, UnidadMedida,
    Insumo, Producto, FichaTecnica, Cliente, OrdenProduccion,
    DetalleOrden, MetodoPago, JornadaLaboral, Pago
)

migrate = Migrate()

def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)

    from app.routes.auth_routes import auth_bp
    from app.routes.usuario_routes import usuario_bp
    from app.routes.rol_routes import rol_bp
    from app.routes.insumo_routes import insumo_bp
    from app.routes.orden_routes import orden_bp
    from app.routes.jornada_routes import jornada_bp
    from app.routes.pago_routes import pago_bp
    from app.routes.categoria_routes import categoria_bp
    from app.routes.unidad_medida_routes import unidad_medida_bp
    from app.routes.cliente_routes import cliente_bp
    from app.routes.producto_routes import producto_bp
    from app.routes.metodo_pago_routes import metodo_pago_bp
    from app.routes.asignacion_routes import asignacion_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(usuario_bp)
    app.register_blueprint(rol_bp)
    app.register_blueprint(insumo_bp)
    app.register_blueprint(orden_bp)
    app.register_blueprint(jornada_bp)
    app.register_blueprint(pago_bp)
    app.register_blueprint(categoria_bp)
    app.register_blueprint(unidad_medida_bp)
    app.register_blueprint(cliente_bp)
    app.register_blueprint(producto_bp)
    app.register_blueprint(metodo_pago_bp)
    app.register_blueprint(asignacion_bp)

    return app
