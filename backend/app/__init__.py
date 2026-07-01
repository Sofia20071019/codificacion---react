# app/__init__.py
from flask import Flask
from app.database.database import db, bcrypt
from app.config.settings import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    bcrypt.init_app(app)

    from app.routers.routes import admin_bp
    from app.routers.empleado_routes import empleado_bp 
    from app.routers.auth_routes import auth_bp

    app.register_blueprint(admin_bp)
    app.register_blueprint(empleado_bp)
    app.register_blueprint(auth_bp)

    return app