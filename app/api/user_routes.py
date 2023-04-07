from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required
from app.forms.user_form import UserForm
from app.models import User, db
from app.utils.helpers import upload_file_to_s3


user_routes = Blueprint('users', __name__)

@user_routes.route('/')
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<int:id>')
def user(id):
    user = User.query.get(id)
    return user.to_dict()

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@user_routes('/<int:id>/upload_prof_pic', methods=['POST'])
def upload(id):
 # check whether an input field with name 'image' exist
    if 'image' not in request.files:
        print('No image key in request.files')
        return redirect(url_for('new'))

    # after confirm 'image' exist, get the file from input
    file = request.files['image']

    # check whether a file is selected
    if file.filename == '':
        print('No selected file')
        return redirect(url_for('new'))

    # check whether the file extension is allowed (eg. png,jpeg,jpg,gif)
    if file and allowed_file(file.filename):
        output = upload_file_to_s3(file)

        # if upload success,will return file name of uploaded file
        if output:
            user = User.query.get(id)
            user.profile_pic_url = output
            db.session.commit()

            print("Success upload")
            return redirect(url_for('show'))

        # upload failed, redirect to upload page
        else:
            print("Unable to upload, try again")
            return redirect(url_for('new'))

    # if file extension not allowed
    else:
        print("File type not accepted,please try again.")
        return redirect(url_for('new'))

@user_routes.route('/<int:id>', methods=['PUT'])
def edit_user(id):
    user = User.query.get(id)
    form = UserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print('-------FORM DATA---------', form.data)
    if form.validate_on_submit():
        # print('-------VALIDATED ON SUBMIT---------')
        data = form.data
        try:
            user.profile_pic_url=data['profile_pic_url']
        except:
            pass
        try:
            user.username=data['username']
        except:
            pass
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

@user_routes.route('/<int:id>/games')
def get_users_games(id):
    user = User.query.get(id)
    games = user.games
    return {'games': [game.to_dict() for game in games]}

@user_routes.route('/<int:id>/invites-received')
def get_invites_received(id):
    user = User.query.get(id)
    invites = user.game_invites
    return {'invites_received': [invite.to_dict() for invite in invites]}
