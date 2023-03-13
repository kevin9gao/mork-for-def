from .db import db


class GameInvite(db.Model):
    __tablename__ = 'game_invites'

    id = db.Column(db.Integer, primary_key=True)
    inviter_id = db.Column(db.Integer, nullable=False)
    invited_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    accepted = db.Column(db.Boolean, default=False, nullable=False)
    rejected = db.Column(db.Boolean, default=False, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'inviter_id': self.inviter_id,
            'invited_id': self.invited_id,
            'game_id': self.game_id,
            'accepted': self.accepted,
            'rejected': self.rejected,
        }

    invited = db.relationship('User', foreign_keys=[invited_id], back_populates='game_invites')
    game = db.relationship('Game', back_populates='invites')
