from flask import Blueprint, request
from app.models import User, db, Game, GameInvite
from app.forms import GameForm, UpdateGameForm, GameInviteForm


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
        # print('validated on submit')
        data = form.data
        game = Game(name=data['name'],
                    num_players=data['num_players'],
                    phase=data['phase'],
                    active=data['active'],
                    creator_id=data['creator_id'],
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
        # players = [data['death'], data['time_shifter'], data['cultist'], data['necromancer'],
        #            data['disruptor'], data['psychic'], data['jesus'], data['medium'],
        #            data['mystic'], data['antideath']]
        # for player_id in players:
        #     if player_id:
        #         player = User.query.get(player_id)
        #         player.games.append(game)
        creator = User.query.get(data['creator_id'])
        game.players.append(creator)
        db.session.commit()
        return game.to_dict()

@game_routes.route('/<int:id>', methods=['PUT'])
def update_game(id):
    print('-------HIT update_game ROUTE---------')
    form = UpdateGameForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print('-------VALIDATED ON SUBMIT---------')
        game = Game.query.get(id)
        data = request.json
        # data = form.data
        game.name=data['name']
        game.phase=data['phase']
        game.active=data['active']
        roles = ['death', 'time_shifter', 'cultist', 'necromancer', 'disruptor',
                 'psychic', 'jesus', 'medium', 'mystic', 'antideath', 'villager_1',
                 'villager_2', 'villager_3', 'villager_4', 'villager_5', 'evos_1',
                 'evos_2', 'evos_3', 'evos_4']
        # print('-------------DEATH-----------', game.death, data['death'])
        for role in roles:
            try:
                game[role]=data[role]
                game[f'{role}_status']=data[f'{role}_status']
            except:
                continue
        db.session.commit()
        return game.to_dict()

@game_routes.route('/<int:id>', methods=['DELETE'])
def delete_game(id):
    game = Game.query.get(id)
    db.session.delete(game)
    db.session.commit()
    return game.to_dict()

@game_routes.route('/<int:game_id>/invite/<int:invited_id>', methods=['POST'])
def invite_to_game(game_id, invited_id):
    form = GameInviteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        invite = GameInvite(inviter_id=data['inviter_id'],
                            invited_id=data['invited_id'],
                            game_id=data['game_id'])
        invited = User.query.get(invited_id)
        invited.game_invites.append(invite)
        db.session.commit()
        return invite.to_dict()

@game_routes.route('/invites/<int:invite_id>/accept', methods=['POST'])
def accept_invite(invite_id):
    invite = GameInvite.query.get(invite_id)
    invite.accepted=True
    game = Game.query.get(invite.game_id)
    invited = User.query.get(invite.invited_id)
    game.players.append(invited)
    game.num_players += 1
    db.session.commit()
    return invite.to_dict()

@game_routes.route('/invites/<int:invite_id>/reject', methods=['POST'])
def reject_invite(invite_id):
    invite = GameInvite.query.get(invite_id)
    invite.rejected=True
    db.session.commit()
    game = Game.query.get(invite.game_id)
    return invite.to_dict()

@game_routes.route('/<int:game_id>/invites')
def get_invites(game_id):
    game = Game.query.get(game_id)
    invites = game.invites
    return {'invites_sent': [invite.to_dict() for invite in invites]}
