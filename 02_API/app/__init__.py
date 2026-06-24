from flask import Flask
from flask_cors import CORS
from app.config.settings import Config
from app.database.database import db
from app.routes.personal_routes import personal_bp
from app.routes.routes import main_bp # 🌟 1. Importa el blueprint principal

def create_app():
    app = Flask(__name__)
    
    CORS(app) # Permite el acceso desde el frontend
    
    app.config.from_object(Config)
    
    db.init_app(app)
    
    # 🌟 2. Registra ambos Blueprints para que Flask reconozca todas tus URLs
    app.register_blueprint(personal_bp)
    app.register_blueprint(main_bp)
    
    with app.app_context():
        db.create_all()
        
    return app