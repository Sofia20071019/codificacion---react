import os
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(env_path)

class Config:

    SECRET_KEY = os.getenv("SECRET_KEY", "dev-key-cambiar-en-produccion")

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{os.getenv('MYSQL_USER')}:"
        f"{os.getenv('MYSQL_PASSWORD')}@"
        f"{os.getenv('MYSQL_HOST')}:"
        f"{os.getenv('MYSQL_PORT')}/"
        f"{os.getenv('MYSQL_DATABASE')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False 