from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired


class UpdateGameForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    phase = StringField('phase', validators=[DataRequired()])
    active = BooleanField('active')
    death = IntegerField('death')
    death_faction = StringField('death_faction')
    time_shifter = IntegerField('time_shifter')
    cultist = IntegerField('cultist')
    necromancer = IntegerField('necromancer')
    disruptor = IntegerField('disruptor')
    psychic = IntegerField('psychic')
    jesus = IntegerField('jesus')
    medium = IntegerField('medium')
    mystic = IntegerField('mystic')
    antideath = IntegerField('antideath')
    death_status = StringField('death_status')
    time_shifter_status = StringField('time_shifter_status')
    cultist_status = StringField('cultist_status')
    necromancer_status = StringField('necromancer_status')
    disruptor_status = StringField('disruptor_status')
    psychic_status = StringField('psychic_status')
    jesus_status = StringField('jesus_status')
    medium_status = StringField('medium_status')
    mystic_status = StringField('mystic_status')
    antideath_status = StringField('antideath_status')
    villager_1 = IntegerField('villager_1')
    villager_2 = IntegerField('villager_2')
    villager_3 = IntegerField('villager_3')
    villager_4 = IntegerField('villager_4')
    villager_5 = IntegerField('villager_5')
    villager_1_status = StringField('villager_1_status')
    villager_2_status = StringField('villager_2_status')
    villager_3_status = StringField('villager_3_status')
    villager_4_status = StringField('villager_4_status')
    villager_5_status = StringField('villager_5_status')
    evos_1 = IntegerField('evos_1')
    evos_2 = IntegerField('evos_2')
    evos_3 = IntegerField('evos_3')
    evos_4 = IntegerField('evos_4')
    evos_1_status = StringField('evos_1_status')
    evos_2_status = StringField('evos_2_status')
    evos_3_status = StringField('evos_3_status')
    evos_4_status = StringField('evos_4_status')
    winner = StringField('winner')
