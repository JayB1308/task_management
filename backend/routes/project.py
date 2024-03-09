from flask import jsonify, request
from flask.views import MethodView
from flask_smorest import Blueprint
from flask_jwt_extended import jwt_required
from models.project import Project as ProjectModel
from enums.status import Status
from schemas.project import (
    CreateProjectRequestSchema,
    ProjectResponseSchema,
    UpdateProjectRequestSchema,
    ProjectStatsSchema,
)
from app import db
import uuid

blp = Blueprint("project", __name__, url_prefix="/project", description="Project")


@blp.route("/")
class Project(MethodView):
    @jwt_required()
    @blp.arguments(CreateProjectRequestSchema)
    @blp.response(200, ProjectResponseSchema)
    def post(self, data):
        project = ProjectModel(
            id=uuid.uuid4().hex, name=data["name"], team_id=data["team_id"], tasks=[]
        )
        db.session.add(project)
        db.session.commit()
        schema = ProjectResponseSchema()
        return (
            jsonify(
                {
                    "data": schema.dump(project),
                }
            ),
            200,
        )

    @jwt_required()
    @blp.response(200, ProjectResponseSchema(many=True))
    def get(self):
        team = request.args.get("team_id")
        project_query = ProjectModel.query
        if team:
            project_query = project_query.filter(ProjectModel.team_id == team)
        projects = project_query.all()
        schema = ProjectResponseSchema(many=True)
        return jsonify({"data": (schema.dump(projects))})


@blp.route("/stats")
class ProjectStats(MethodView):
    @jwt_required()
    @blp.response(200, ProjectStatsSchema)
    def get(self):
        team = request.args.get("team_id")
        project_query = ProjectModel.query
        if team:
            project_query = project_query.filter(ProjectModel.team_id == team)
            active_query = project_query.filter(ProjectModel.status == Status.ACTIVE)
            pending_query = project_query.filter(ProjectModel.status == Status.PENDING)
            closed_query = project_query.filter(ProjectModel.status == Status.CLOSED)

        return (
            jsonify(
                {
                    "active": active_query.count(),
                    "pending": pending_query.count(),
                    "closed": closed_query.count(),
                }
            ),
            200,
        )


@blp.route("/<uuid:project_id>")
class ProjectByID(MethodView):
    @jwt_required()
    @blp.response(200, ProjectResponseSchema)
    def get(self, project_id):
        project = ProjectModel.query.get_or_404(project_id)
        project_schema = ProjectResponseSchema()
        return jsonify({"data": project_schema.dump(project)})

    @jwt_required()
    @blp.response(200)
    def delete(self, project_id):
        project = ProjectModel.query.get_or_404(project_id)
        db.session.delete(project)
        db.session.commit()
        return {"message": "Project deleted successfully!"}, 200

    @jwt_required()
    @blp.arguments(UpdateProjectRequestSchema)
    @blp.response(203, ProjectResponseSchema)
    def put(self, project_data, project_id):
        project = ProjectModel.query.get(project_id)
        if project:
            if "name" in project_data and project_data["name"]:
                project.name = project_data["name"]
            if "status" in project_data and project_data["status"]:
                project.status = project_data["status"]
            if "project_meta" in project_data and project_data["project_meta"]:
                project.project_meta = project_data["project_meta"]

        db.session.commit()
        project_schema = ProjectResponseSchema()
        return jsonify({"data": (project_schema.dump(project))})
