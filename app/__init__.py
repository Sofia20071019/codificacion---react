from flask import Flask
from app.config.settings import Config
from app.database.database import db
from app.routes.routes import main_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    db.init_app(app)
    
    from app.routes.routes import main_bp
    app.register_blueprint(main_bp)
    
    with app.app_context():
        db.create_all()
        
    return app