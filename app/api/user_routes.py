from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms.user_form import UserForm
from app.models import User, db


user_routes = Blueprint('users', __name__)

@user_routes.route('/')
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<int:id>')
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>', methods=['PUT'])
def edit_user(id):
    user = User.query.get(id)
    form = UserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('-------FORM DATA---------', form.data)
    if form.validate_on_submit():
        data = form.data
        user.profile_pic_url = data['profile_pic_url']
        db.session.commit()
        return user.to_dict()

@user_routes.route('/<int:id>/friends')
def friends_list(id):
    user = User.query.get(id)
    return {'friends': [friend.to_dict() for friend in user.friends]}

@user_routes.route('/<int:befriender_id>/befriend/<int:befriended_id>', methods=['POST'])
def befriend(befriender_id, befriended_id):
    befriender = User.query.get(befriender_id)
    befriended = User.query.get(befriended_id)
    befriender.befriend(befriended)
    db.session.commit()
    return {'friends': [friend.to_dict() for friend in befriender.friends]}

@user_routes.route('/<int:unfriender_id>/unfriend/<int:unfriended_id>', methods=['POST'])
def unfriend(unfriender_id, unfriended_id):
    unfriender = User.query.get(unfriender_id)
    unfriended = User.query.get(unfriended_id)
    unfriender.unfriend(unfriended)
    db.session.commit()
    return {'friends': [friend.to_dict() for friend in unfriender.friends]}
