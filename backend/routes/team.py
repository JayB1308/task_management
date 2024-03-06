from flask import jsonify
from flask.views import MethodView
from flask_smorest import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.team import Team
from models.user import User
from schemas.team import CreateTeamRequestSchema, TeamResponseSchema
from app import db
import uuid

blp = Blueprint("team", __name__, url_prefix="/team", description="Team")


@blp.route("/")
class CreateTeam(MethodView):
    @jwt_required()
    @blp.arguments(CreateTeamRequestSchema)
    @blp.response(201, TeamResponseSchema)
    def post(self, team_data):
        user = User.query.filter_by(id=get_jwt_identity()).first()
        team = Team(
            id=uuid.uuid4().hex, name=team_data["name"], members=[user], projects=[]
        )
        db.session.add(team)
        db.session.commit()
        team_schema = TeamResponseSchema()
        return (
            jsonify(
                {
                    "data": team_schema.dump(team),
                    "message": "Team created successfully!",
                }
            ),
            201,
        )


@blp.route("/<uuid:team_id>")
class TeamByID(MethodView):
    @jwt_required()
    @blp.response(201, TeamResponseSchema)
    def get(self, team_id):
        team = Team.query.get_or_404(team_id)
        team_schema = TeamResponseSchema()
        return jsonify({"data": team_schema.dump(team)}), 200
