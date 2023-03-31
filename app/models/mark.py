from .db import db
from sqlalchemy.sql import func


class Mark(db.Model):
    __tablename__ = 'marks'

    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    caller_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    caller_name = db.Column(db.String(50), nullable=False)
    marked_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    marked_name = db.Column(db.String(50), nullable=False)
    time = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'game_id': self.game_id,
            'caller_id': self.caller_id,
            'caller_name': self.caller_name,
            'marked_id': self.marked_id,
            'marked_name': self.marked_name,
            'time': self.time,
        }

    game = db.relationship('Game', back_populates='marks')
    caller = db.relationship('User', foreign_keys=[caller_id])
    marked = db.relationship('User', foreign_keys=[marked_id])
