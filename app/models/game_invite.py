from .db import db


class GameInvite(db.Model):
    __tablename__ = 'game_invites'

    id = db.Column(db.Integer, primary_key=True)
    inviter_id = db.Column(db.Integer, nullable=False)
    invited_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    accepted = db.Column(db.Boolean, default=False, nullable=False)
    rejected = db.Column(db.Boolean, default=False, nullable=False)

    invited = db.relationship('User', foreign_keys=[invited_id], back_populates='game_invites')
