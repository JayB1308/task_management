from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from enums import Status, Type, Priority
from app import db
import uuid
import datetime


class Task(db.Model):

    __tablename__ = "task"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(), nullable=True)
    type = db.Column(db.Enum(Type), default=Type.TASK, nullable=False)
    priority = db.Column(db.Enum(Priority), default=Priority.P0, nullable=True)
    status = db.Column(db.Enum(Status), default=Status.ACTIVE)
    start_date = db.Column(db.Date(), default=datetime.date.today(), nullable=True)
    end_date = db.Column(db.Date(), default=datetime.date.today(), nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    project_id = db.Column(
        UUID(as_uuid=True), db.ForeignKey("project.id"), nullable=False
    )
    assignee_id = db.Column(UUID(as_uuid=True), db.ForeignKey("user.id"), nullable=True)
    user = db.relationship("User", back_populates="tasks")
    task_id = db.Column(UUID(as_uuid=True), db.ForeignKey("task.id"))
    subtasks = db.relationship("Task", remote_side="Task.id")
    has_subtask = db.Column(db.Boolean(), unique=False, default=False)
