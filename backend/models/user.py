from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app import db
import uuid


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = db.Column(db.String(), nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(), nullable=False)
    avatar_hash = db.Column(db.String())
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    team_id = db.Column(
        UUID(as_uuid=True), db.ForeignKey("team.id"), unique=True, nullable=True
    )
    team = db.relationship("Team", back_populates="members")
    tasks = db.relationship("Task", back_populates="user")

    def __repr__(self):
        return f"{self.id} - {self.username} - {self.email} - {self.password} - {self.created_at}"
