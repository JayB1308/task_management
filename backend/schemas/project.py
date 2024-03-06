from marshmallow import Schema, fields


class CreateProjectRequestSchema(Schema):
    name = fields.String(required=True)
    team_id = fields.String(required=True)


class ProjectResponseSchema(Schema):
    id = fields.UUID()
    name = fields.String()
    status = fields.String()
    project_meta = fields.Raw()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    team_id = fields.UUID()


class UpdateProjectRequestSchema(Schema):
    name = fields.String()
    status = fields.Raw()
    project_meta = fields.Raw()
