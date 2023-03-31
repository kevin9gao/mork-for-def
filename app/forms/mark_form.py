from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired


class MarkForm(FlaskForm):
    game_id = IntegerField('game_id', validators=[DataRequired()])
    caller_id = IntegerField('caller_id', validators=[DataRequired()])
    caller_name = StringField('caller_name', validators=[DataRequired()])
    marked_id = IntegerField('marked_id', validators=[DataRequired()])
    marked_name = StringField('marked_name', validators=[DataRequired()])
