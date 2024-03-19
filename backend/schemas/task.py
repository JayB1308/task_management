from marshmallow import Schema, fields


class CreateTaskRequestSchema(Schema):
    title = fields.String(required=True)
    description = fields.String()
    project_id = fields.UUID(required=True)
    type = fields.Raw()
    priority = fields.Raw()
    parent_task_id = fields.UUID()


class GetTaskResponseSchema(Schema):
    id = fields.UUID()
    title = fields.String()
    description = fields.String()
    type = fields.String()
    priority = fields.String()
    status = fields.String()
    start_date = fields.DateTime()
    end_date = fields.DateTime()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    project_id = fields.UUID()
    assignee_id = fields.UUID()
    task_id = fields.UUID()
    has_subtask = fields.Boolean()


class UpdateTaskRequestSchema(Schema):
    title = fields.String()
    description = fields.String()
    start_date = fields.Date()
    end_date = fields.Date()
    type = fields.Raw()
    status = fields.String()
    priority = fields.String()
    assignee_id = fields.UUID(allow_none=True)
