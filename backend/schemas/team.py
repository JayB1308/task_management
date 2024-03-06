from marshmallow import Schema, fields


class CreateTeamRequestSchema(Schema):
    name = fields.Str(required=True)


class TeamResponseSchema(Schema):
    id = fields.UUID()
    name = fields.String()
