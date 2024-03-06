from marshmallow import Schema, fields


class RegisterRequestSchema(Schema):
    email = fields.Email(required=True)
    username = fields.String(required=True)
    password = fields.String(required=True)


class RegisterResponseSchema(Schema):
    message = fields.String()
