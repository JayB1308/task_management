import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY") or "a_secret_key"
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")
    JWT_SECRET_KEY = os.environ.get("SECRET_KEY") or "jwt"
    API_TITLE = "Block_Work API"
    API_VERSION = "v1"
    OPENAPI_VERSION = "3.0.3"
