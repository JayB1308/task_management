from flask import jsonify, request
from flask.views import MethodView
from flask_smorest import Blueprint
from flask_jwt_extended import jwt_required
from models.task import Task as TaskModel
from schemas.task import (
    CreateTaskRequestSchema,
    GetTaskResponseSchema,
    UpdateTaskRequestSchema,
)
from enums.type import Type
from app import db
import uuid


blp = Blueprint("task", __name__, url_prefix="/task", description="Task")


@blp.route("/")
class Task(MethodView):
    @jwt_required()
    @blp.response(200, GetTaskResponseSchema(many=True))
    def get(self):
        assignee_id = request.args.get("assignee_id")
        project_id = request.args.get("project_id")
        task_type = request.args.get("type")
        status = request.args.get("status")
        priority = request.args.get("priority")
        parent_task_id = request.args.get("task_id")
        task_query = TaskModel.query
        if assignee_id:
            task_query = task_query.filter(TaskModel.assignee_id == assignee_id)
        if project_id:
            task_query = task_query.filter(TaskModel.project_id == project_id)
        if task_type:
            task_query = task_query.filter(TaskModel.type == task_type)
        if status:
            task_query = task_query.filter(TaskModel.status == status)
        if priority:
            task_query = task_query.filter(TaskModel.priority == priority)
        if parent_task_id:
            task_query = task_query.filter(TaskModel.task_id == parent_task_id)
        tasks = task_query.all()
        task_schema = GetTaskResponseSchema(many=True)
        return jsonify({"tasks": (task_schema.dump(tasks))}), 200

    @jwt_required()
    @blp.arguments(CreateTaskRequestSchema)
    @blp.response(201, GetTaskResponseSchema())
    def post(self, task_data):
        task = TaskModel(
            id=uuid.uuid4().hex,
            title=task_data["title"],
            description=task_data["description"],
            project_id=task_data["project_id"],
            type=task_data["type"],
            priority=task_data["priority"],
        )

        if task_data["type"].lower() == Type.SUBTASK.value:
            parent_task_id = task_data["parent_task_id"]
            parent_task: TaskModel = TaskModel.query.get(parent_task_id)
            task.task_id = parent_task.id
            parent_task.has_subtask = True
            db.session.add(parent_task)

        db.session.add(task)
        db.session.commit()
        task_schema = GetTaskResponseSchema()
        return jsonify({"task": task_schema.dump(task)}), 201


@blp.route("/<uuid:task_id>")
class TaskByID(MethodView):
    @jwt_required()
    @blp.response(200, GetTaskResponseSchema)
    def get(self, task_id):
        task = TaskModel.query.get_or_404(task_id)
        task_schema = GetTaskResponseSchema()
        return {"task": jsonify(task_schema.dumps(task))}, 200

    @jwt_required()
    @blp.arguments(UpdateTaskRequestSchema)
    @blp.response(203, GetTaskResponseSchema)
    def put(self, task_data, task_id):
        task = TaskModel.query.filter(TaskModel.id == task_id).first()

        if task:
            if "title" in task_data and task_data["title"]:
                task.title = task_data["title"]
            if "description" in task_data and task_data["description"]:
                task.description = task_data["description"]
            if "start_date" in task_data and task_data["start_date"]:
                task.start_date = task_data["start_date"]
            if "end_date" in task_data and task_data["end_date"]:
                task.end_date = task_data["end_date"]
            if "type" in task_data and task_data["type"]:
                task.type = task_data["type"]
            if "status" in task_data and task_data["status"]:
                task.status = task_data["status"]
            if "priority" in task_data and task_data["priority"]:
                task.priority = task_data["priority"]
            if "assignee_id" in task_data and task_data["assignee_id"]:
                task.assignee_id = task_data["assignee_id"]

        db.session.commit()
        task_schema = GetTaskResponseSchema()
        return jsonify({"task": (task_schema.dump(task))}), 203

    @jwt_required()
    @blp.response(204)
    def delete(self, task_id):
        task = TaskModel.query.get_or_404(task_id)
        db.session.delete(task)
        db.session.commit()
        return {"data": "Task deleted successfully!"}, 204
