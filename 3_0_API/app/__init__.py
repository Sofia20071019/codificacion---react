# =============================================================================
# ARCHIVO: __init__.py
# PROPOSITO: Modulo initializer del paquete "app". Implementa el patron
#            factory (fabrica) para crear y configurar la instancia de la
#            aplicacion Flask. Configura las extensiones (CORS, SQLAlchemy,
#            Bcrypt, Migrate), registra todos los blueprints de rutas y
#            centraliza la logica de inicializacion de la API REST.
# =============================================================================

# Importar la clase Flask para crear la instancia principal de la aplicacion
from flask import Flask

# Importar CORS para habilitar el intercambio de recursos de origen cruzado,
# permitiendo que el frontend consuma la API desde un dominio diferente
from flask_cors import CORS

# Importar Migrate para gestionar migraciones automaticas de la base de datos
# mediante Flask-Migrate (basado en Alembic)
from flask_migrate import Migrate

# Importar la clase de configuracion que contiene las variables de la
# aplicacion (claves secretas, URI de base de datos, etc.)
from app.config.settings import Config

# Importar las instancias de SQLAlchemy y Bcrypt inicializadas en el
# modulo de base de datos, que seran vinculadas a la app en esta fabrica
from app.database.database import db, bcrypt

# Importar todos los modelos ORM necesarios para que SQLAlchemy los
# reconozca y genere las tablas correspondientes en la base de datos
from app.models import (
    Rol, EstadoUsuario, Usuario, Categoria, UnidadMedida,
    Insumo, Producto, FichaTecnica, Cliente, OrdenProduccion,
    DetalleOrden, MetodoPago, JornadaLaboral, Pago
)

# Crear la instancia de Migrate sin vincularla aun, se hara dentro de la fabrica
migrate = Migrate()

def create_app():
    """
    Fabrica de aplicaciones Flask. Crea, configura y retorna una instancia
    completa de la aplicacion con todas las extensiones y blueprints registrados.

    Retorna:
        Flask: Instancia configurada y lista para servir peticiones HTTP.
    """

    # Crear la instancia principal de la aplicacion Flask
    app = Flask(__name__)

    # Cargar la configuracion desde la clase Config (claves secretas, BD, etc.)
    app.config.from_object(Config)

    # Habilitar CORS en toda la aplicacion para permitir peticiones
    # del frontend ubicado en un origen/dominio diferente
    CORS(app)

    # Inicializar SQLAlchemy con la aplicacion para gestionar la conexion
    # y las operaciones con la base de datos
    db.init_app(app)

    # Inicializar Bcrypt con la aplicacion para habilitar el hashing
    # y verificacion de contrasenas de forma segura
    bcrypt.init_app(app)

    # Inicializar Flask-Migrate con la aplicacion y la instancia de db
    # para poder ejecutar migraciones de esquema desde la linea de comandos
    migrate.init_app(app, db)

    # --- IMPORTACIONES DE BLUEPRINTS DE RUTAS ---
    # Cada blueprint encapsula un grupo de rutas relacionadas con un
    # dominio especifico de la aplicacion (auth, usuarios, productos, etc.)

    # Blueprint para rutas de autenticacion (login, registro, token)
    from app.routes.auth_routes import auth_bp

    # Blueprint para rutas de gestion de usuarios (CRUD)
    from app.routes.usuario_routes import usuario_bp

    # Blueprint para rutas de gestion de roles (CRUD)
    from app.routes.rol_routes import rol_bp

    # Blueprint para rutas de gestion de insumos (CRUD)
    from app.routes.insumo_routes import insumo_bp

    # Blueprint para rutas de ordenes de produccion (CRUD)
    from app.routes.orden_routes import orden_bp

    # Blueprint para rutas de jornadas laborales (CRUD)
    from app.routes.jornada_routes import jornada_bp

    # Blueprint para rutas de pagos (CRUD)
    from app.routes.pago_routes import pago_bp

    # Blueprint para rutas de categorias de insumos (CRUD)
    from app.routes.categoria_routes import categoria_bp

    # Blueprint para rutas de unidades de medida (CRUD)
    from app.routes.unidad_medida_routes import unidad_medida_bp

    # Blueprint para rutas de clientes (CRUD)
    from app.routes.cliente_routes import cliente_bp

    # Blueprint para rutas de productos (CRUD)
    from app.routes.producto_routes import producto_bp

    # Blueprint para rutas de metodos de pago (CRUD)
    from app.routes.metodo_pago_routes import metodo_pago_bp

    # Blueprint para rutas de asignaciones (asignar insumos a ordenes/productos)
    from app.routes.asignacion_routes import asignacion_bp

    # Blueprint para rutas de reportes (consulta y exportacion a Excel)
    from app.routes.reporte_routes import reporte_bp

    # --- REGISTRO DE BLUEPRINTS ---
    # Registrar cada blueprint en la aplicacion Flask para que sus rutas
    # esten disponibles bajo los prefijos definidos en cada blueprint

    # Registrar blueprint de autenticacion
    app.register_blueprint(auth_bp)

    # Registrar blueprint de usuarios
    app.register_blueprint(usuario_bp)

    # Registrar blueprint de roles
    app.register_blueprint(rol_bp)

    # Registrar blueprint de insumos
    app.register_blueprint(insumo_bp)

    # Registrar blueprint de ordenes de produccion
    app.register_blueprint(orden_bp)

    # Registrar blueprint de jornadas laborales
    app.register_blueprint(jornada_bp)

    # Registrar blueprint de pagos
    app.register_blueprint(pago_bp)

    # Registrar blueprint de categorias
    app.register_blueprint(categoria_bp)

    # Registrar blueprint de unidades de medida
    app.register_blueprint(unidad_medida_bp)

    # Registrar blueprint de clientes
    app.register_blueprint(cliente_bp)

    # Registrar blueprint de productos
    app.register_blueprint(producto_bp)

    # Registrar blueprint de metodos de pago
    app.register_blueprint(metodo_pago_bp)

    # Registrar blueprint de asignaciones
    app.register_blueprint(asignacion_bp)

    # Registrar blueprint de reportes
    app.register_blueprint(reporte_bp)

    # Retornar la instancia completamente configurada de la aplicacion Flask
    return app
