from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app import db
import uuid


class Team(db.Model):
    __tablename__ = "team"
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(100))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    members = db.relationship("User", back_populates="team")
    projects = db.relationship("Project", back_populates="team")
