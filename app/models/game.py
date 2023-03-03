from .db import db


members = db.Table(
    'members',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('game_id', db.Integer, db.ForeignKey('games.id'), primary_key=True),
)


class Game(db.Model):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    num_players = db.Column(db.Integer, nullable=False)
    phase = db.Column(db.String(100), nullable=False)
    active = db.Column(db.Boolean, nullable=False, default=True)
    death = db.Column(db.Integer)
    time_shifter = db.Column(db.Integer)
    cultist = db.Column(db.Integer)
    necromancer = db.Column(db.Integer)
    disruptor = db.Column(db.Integer)
    psychic = db.Column(db.Integer)
    jesus = db.Column(db.Integer)
    medium = db.Column(db.Integer)
    mystic = db.Column(db.Integer)
    antideath = db.Column(db.Integer)
    death_status = db.Column(db.String(50))
    time_shifter_status = db.Column(db.String(50))
    cultist_status = db.Column(db.String(50))
    necromancer_status = db.Column(db.String(50))
    disruptor_status = db.Column(db.String(50))
    psychic_status = db.Column(db.String(50))
    jesus_status = db.Column(db.String(50))
    medium_status = db.Column(db.String(50))
    mystic_status = db.Column(db.String(50))
    antideath_status = db.Column(db.String(50))

    def to_dict(self):
        return {
          'id': self.id,
          'num_players': self.num_players,
          'phase': self.phase,
          'active': self.active,
          'death': [self.death, self.death_status],
          'time_shifter': [self.time_shifter, self.time_shifter_status],
          'cultist': [self.cultist, self.cultist_status],
          'necromancer': [self.necromancer, self.necromancer_status],
          'disruptor': [self.disruptor, self.disruptor_status],
          'psychic': [self.psychic, self.psychic_status],
          'jesus': [self.jesus, self.jesus_status],
          'medium': [self.medium, self.medium_status],
          'mystic': [self.mystic, self.mystic_status],
          'antideath': [self.antideath, self.antideath_status],
        }

    players = db.relationship('User',
        secondary=members,
        back_populates='games'
        )
