from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class GameInviteForm(FlaskForm):
    inviter_id = IntegerField('inviter_id', validators=[DataRequired()])
    invited_id = IntegerField('invited_id', validators=[DataRequired()])
    game_id = IntegerField('game_id', validators=[DataRequired()])
