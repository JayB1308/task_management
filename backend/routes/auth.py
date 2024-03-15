from flask import jsonify, make_response, request
from flask.views import MethodView
from flask_smorest import abort
from flask_smorest.blueprint import Blueprint
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    unset_jwt_cookies,
    create_refresh_token,
    get_jwt_identity,
)
from passlib.hash import pbkdf2_sha256
from models.user import User
from schemas.register import RegisterRequestSchema, RegisterResponseSchema
from schemas.login import LoginRequestSchema, LoginResponseSchema
from schemas.user import UserResponseSchema
from hashlib import md5
from app import db
import uuid

blp = Blueprint("auth", __name__, url_prefix="/auth", description="Authorization")


@blp.route("/login")
class Login(MethodView):
    @blp.arguments(LoginRequestSchema)
    @blp.response(200, UserResponseSchema)
    def post(self, item_data):
        user = User.query.filter(User.username == item_data["username"]).first()
        if user and pbkdf2_sha256.verify(item_data["password"], user.password):
            access_token = create_access_token(identity=user.id)
            refresh_token = create_refresh_token(user.id)
            user_schema = UserResponseSchema()
            return (
                jsonify(
                    {
                        "access_token": access_token,
                        "refresh_token": refresh_token,
                        "user": user_schema.dump(user),
                    }
                ),
                200,
            )
        else:
            abort(401, message="Invalid Credentials!")


@blp.route("/refresh")
class TokenRefresh(MethodView):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=True)
        return jsonify({"access_token": new_token}), 200


@blp.route("/logout")
class Logout(MethodView):
    @jwt_required()
    def post(self):
        response = make_response(jsonify({"message": "Logged out successfully"}))
        unset_jwt_cookies(response)
        return jsonify({"message": "Logged out successfully"}), 200


@blp.route("/register")
class Register(MethodView):
    @blp.arguments(RegisterRequestSchema)
    @blp.response(200, RegisterResponseSchema)
    def post(self, item_data):
        user = User(
            id=uuid.uuid4().hex,
            username=item_data["username"],
            email=item_data["email"],
            password=pbkdf2_sha256.hash(item_data["password"]),
            avatar_hash=md5(item_data["email"].encode("utf-8")).hexdigest(),
        )
        db.session.add(user)
        db.session.commit()
        return (
            {"message": "User created successfully!"},
            201,
        )


@blp.route("/check_username")
class CheckEmail(MethodView):
    @blp.response(200)
    @blp.alt_response(403)
    def post(self, item_data):
        user = User.query.filter(User.username == item_data["username"])
        if not user:
            return {"message": "Username available"}, 200
        else:
            return {"message": "Username unavailable"}, 403


@blp.route("/user/<uuid:user_id>")
class GetUserName(MethodView):
    @blp.response(200, UserResponseSchema)
    def get(self, user_id):
        user = User.query.get(user_id)
        user_schema = UserResponseSchema()
        return jsonify({"username": user_schema.dump(user)}), 200


@blp.route("/get_users")
class GetUsers(MethodView):
    @blp.response(200, UserResponseSchema(many=True))
    def get(self):
        users = User.query.all()
        user_schema = UserResponseSchema(many=True)
        results = user_schema.dump(users)
        return jsonify({"data": results})
