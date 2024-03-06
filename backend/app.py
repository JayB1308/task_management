from flask import Flask
from flask_smorest import Api
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config


app = Flask(__name__)
app.config.from_object(Config)
CORS(app, origins="http://localhost:3000")
jwt = JWTManager(app)


db = SQLAlchemy(app)
migrate = Migrate(app, db)

import models
from routes.auth import blp as AuthBlueprint
from routes.team import blp as TeamBlueprint
from routes.project import blp as ProjectBlueprint
from routes.task import blp as TaskBlueprint

api = Api(app)

api.register_blueprint(AuthBlueprint)
api.register_blueprint(TeamBlueprint)
api.register_blueprint(ProjectBlueprint)
api.register_blueprint(TaskBlueprint)
