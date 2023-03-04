from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired


class UpdateGameForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    phase = StringField('phase', validators=[DataRequired()])
    active = BooleanField('active', validators=[DataRequired()])
    death = IntegerField('death')
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
