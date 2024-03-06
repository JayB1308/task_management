from marshmallow import Schema, fields


class UserResponseSchema(Schema):
    id = fields.UUID()
    email = fields.Email()
    username = fields.String()
    password = fields.String()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    team_id = fields.UUID()
    access_token = fields.String()
