from flask import Blueprint, request
from app.models import User, db, Game
from app.forms import GameForm, UpdateGameForm


game_routes = Blueprint('games', __name__)

@game_routes.route('/')
def all_games():
    games = Game.query.all()
    return {'games': [game.to_dict() for game in games]}

@game_routes.route('/<int:id>')
def game(id):
    game = Game.query.get(id)
    return game.to_dict()

@game_routes.route('/', methods=['POST'])
def create_game():
    form = GameForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        game = Game(num_players=data['num_players'],
                    phase=data['phase'],
                    active=data['active'],
                    death=data['death'],
                    time_shifter=data['time_shifter'],
                    cultist=data['cultist'],
                    necromancer=data['necromancer'],
                    disruptor=data['disruptor'],
                    psychic=data['psychic'],
                    jesus=data['jesus'],
                    medium=data['medium'],
                    mystic=data['mystic'],
                    antideath=data['antideath'],
                    death_status=data['death_status'],
                    time_shifter_status=data['time_shifter_status'],
                    cultist_status=data['cultist_status'],
                    necromancer_status=data['necromancer_status'],
                    disruptor_status=data['disruptor_status'],
                    psychic_status=data['psychic_status'],
                    jesus_status=data['jesus_status'],
                    medium_status=data['medium_status'],
                    mystic_status=data['mystic_status'],
                    antideath_status=data['antideath_status'])
        db.session.add(game)
        players = [data['death'], data['time_shifter'], data['cultist'], data['necromancer'],
                   data['disruptor'], data['psychic'], data['jesus'], data['medium'],
                   data['mystic'], data['antideath']]
        for player_id in players:
            if player_id:
                player = User.query.get(player_id)
                player.games.append(game)
        db.session.commit()
        return game.to_dict()

@game_routes.route('/<int:id>', methods=['PUT'])
def update_game(id):
    form = UpdateGameForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        game = Game.query.get(id)
        data = request.json
        # data = form.data
        game.phase=data['phase']
        game.active=data['active']
        game.death=data['death']
        game.time_shifter=data['time_shifter']
        game.cultist=data['cultist']
        game.necromancer=data['necromancer']
        game.disruptor=data['disruptor']
        game.psychic=data['psychic']
        game.jesus=data['jesus']
        game.medium=data['medium']
        game.mystic=data['mystic']
        game.antideath=data['antideath']
        game.death_status=data['death_status']
        game.time_shifter_status=data['time_shifter_status']
        game.cultist_status=data['cultist_status']
        game.necromancer_status=data['necromancer_status']
        game.disruptor_status=data['disruptor_status']
        game.psychic_status=data['psychic_status']
        game.jesus_status=data['jesus_status']
        game.medium_status=data['medium_status']
        game.mystic_status=data['mystic_status']
        game.antideath_status=data['antideath_status']
        db.session.commit()
        return game.to_dict()

@game_routes.route('/<int:id>', methods=['DELETE'])
def delete_game(id):
    game = Game.query.get(id)
    db.session.delete(game)
    db.session.commit()
    return game.to_dict()
