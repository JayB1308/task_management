from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy_json import mutable_json_type
from enums import Status
from app import db
import uuid


class Project(db.Model):

    __tablename__ = "project"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(100), nullable=False)
    project_meta = db.Column(mutable_json_type(dbtype=JSONB, nested=True))
    status = db.Column(db.Enum(Status), default=Status.ACTIVE)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    team_id = db.Column(UUID(as_uuid=True), db.ForeignKey("team.id"), nullable=False)
    team = db.relationship("Team", back_populates="projects")
    tasks = db.relationship("Task", backref="project", lazy=True)
