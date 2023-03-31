from .db import db
from app.models.game import members
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


friendship = db.Table('friendships',
    db.Column('friend_a_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('friend_b_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    )


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_pic_url = db.Column(db.String(500), nullable=True, default='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROZTgJiqRWL5wWednBz8zyRUhSuEDTzefieg&usqp=CAU')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_pic_url': self.profile_pic_url
        }

    friends = db.relationship('User',
                              secondary=friendship,
                              primaryjoin=id==friendship.c.friend_a_id,
                              secondaryjoin=id==friendship.c.friend_b_id)
    games = db.relationship('Game',
            secondary=members,
            back_populates='players')
    game_invites = db.relationship('GameInvite', back_populates='invited')

    def befriend(self, friend):
        if friend not in self.friends:
            self.friends.append(friend)
            friend.friends.append(self)

    def unfriend(self, friend):
        if friend in self.friends:
            self.friends.remove(friend)
            friend.friends.remove(self)
