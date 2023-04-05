from .db import db
from sqlalchemy.orm import Mapped


members = db.Table(
    'members',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('game_id', db.Integer, db.ForeignKey('games.id'), primary_key=True),
)


class Game(db.Model):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), nullable=False)
    num_players = db.Column(db.Integer, nullable=False)
    phase = db.Column(db.String(100), nullable=False)
    active = db.Column(db.Boolean, nullable=False, default=True)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    death = db.Column(db.Integer)
    death_faction = db.Column(db.String(50))
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
    time_shifter_faction = db.Column(db.String(50), default='evil')
    cultist_faction = db.Column(db.String(50), default='evil')
    necromancer_faction = db.Column(db.String(50), default='evil')
    disruptor_faction = db.Column(db.String(50), default='evil')
    psychic_faction = db.Column(db.String(50), default='good')
    jesus_faction = db.Column(db.String(50), default='good')
    medium_faction = db.Column(db.String(50), default='good')
    mystic_faction = db.Column(db.String(50), default='good')
    antideath_faction = db.Column(db.String(50), default='good')
    villager_1 = db.Column(db.Integer)
    villager_2 = db.Column(db.Integer)
    villager_3 = db.Column(db.Integer)
    villager_4 = db.Column(db.Integer)
    villager_5 = db.Column(db.Integer)
    villager_1_status = db.Column(db.String(50))
    villager_2_status = db.Column(db.String(50))
    villager_3_status = db.Column(db.String(50))
    villager_4_status = db.Column(db.String(50))
    villager_5_status = db.Column(db.String(50))
    villager_1_faction = db.Column(db.String(50), default='good')
    villager_2_faction = db.Column(db.String(50), default='good')
    villager_3_faction = db.Column(db.String(50), default='good')
    villager_4_faction = db.Column(db.String(50), default='good')
    villager_5_faction = db.Column(db.String(50), default='good')
    evos_1 = db.Column(db.Integer)
    evos_2 = db.Column(db.Integer)
    evos_3 = db.Column(db.Integer)
    evos_4 = db.Column(db.Integer)
    evos_1_status = db.Column(db.String(50))
    evos_2_status = db.Column(db.String(50))
    evos_3_status = db.Column(db.String(50))
    evos_4_status = db.Column(db.String(50))
    evos_1_faction = db.Column(db.String(50), default='evil')
    evos_2_faction = db.Column(db.String(50), default='evil')
    evos_3_faction = db.Column(db.String(50), default='evil')
    evos_4_faction = db.Column(db.String(50), default='evil')
    winner = db.Column(db.String(50), default='none')


    def to_dict(self):
        return {
          'id': self.id,
          'name': self.name,
          'num_players': self.num_players,
          'phase': self.phase,
          'active': self.active,
          'creator_id': self.creator_id,
          'death': [self.death, self.death_status, self.death_faction],
          'time_shifter': [self.time_shifter, self.time_shifter_status, self.time_shifter_faction],
          'cultist': [self.cultist, self.cultist_status, self.cultist_faction],
          'necromancer': [self.necromancer, self.necromancer_status, self.necromancer_faction],
          'disruptor': [self.disruptor, self.disruptor_status, self.disruptor_faction],
          'psychic': [self.psychic, self.psychic_status, self.psychic_faction],
          'jesus': [self.jesus, self.jesus_status, self.jesus_faction],
          'medium': [self.medium, self.medium_status, self.medium_faction],
          'mystic': [self.mystic, self.mystic_status, self.mystic_faction],
          'antideath': [self.antideath, self.antideath_status, self.antideath_faction],
          'villager_1': [self.villager_1, self.villager_1_status, self.villager_1_faction],
          'villager_2': [self.villager_2, self.villager_2_status, self.villager_2_faction],
          'villager_3': [self.villager_3, self.villager_3_status, self.villager_3_faction],
          'villager_4': [self.villager_4, self.villager_4_status, self.villager_4_faction],
          'villager_5': [self.villager_5, self.villager_5_status, self.villager_5_faction],
          'evos_1': [self.evos_1, self.evos_1_status, self.evos_1_faction],
          'evos_2': [self.evos_2, self.evos_2_status, self.evos_2_faction],
          'evos_3': [self.evos_3, self.evos_3_status, self.evos_3_faction],
          'evos_4': [self.evos_4, self.evos_4_status, self.evos_4_faction],
          'players': [player.to_dict() for player in self.players],
          'marks': [mark.to_dict() for mark in self.marks],
          'winner': self.winner,
        }

    players: Mapped[list['User']] = db.relationship('User',
        secondary=members,
        back_populates='games'
        )

    invites = db.relationship('GameInvite', back_populates='game', cascade='all, delete')
    marks = db.relationship('Mark', back_populates='game', cascade='all, delete')
