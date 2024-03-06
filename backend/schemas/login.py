from marshmallow import Schema, fields


class LoginRequestSchema(Schema):
    username = fields.String(required=True)
    password = fields.String(required=True)


class LoginResponseSchema(Schema):
    access_token = fields.UUID()
    refresh_token = fields.UUID()
