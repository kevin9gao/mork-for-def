from flask import Blueprint, request
from app.models import User, db, Game, GameInvite, Mark
from app.models.game import members
from app.forms import GameForm, UpdateGameForm, GameInviteForm, MarkForm


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
        try:
            game.death=data['death']
            game.death_status=data['death_status']
            game.time_shifter=data['time_shifter']
            game.time_shifter_status=data['time_shifter_status']
            game.cultist=data['cultist']
            game.cultist_status=data['cultist_status']
            game.necromancer=data['necromancer']
            game.necromancer_status=data['necromancer_status']
            game.disruptor=data['disruptor']
            game.disruptor_status=data['disruptor_status']
            game.psychic=data['psychic']
            game.psychic_status=data['psychic_status']
            game.jesus=data['jesus']
            game.jesus_status=data['jesus_status']
            game.medium=data['medium']
            game.medium_status=data['medium_status']
            game.mystic=data['mystic']
            game.mystic_status=data['mystic_status']
            game.antideath=data['antideath']
            game.antideath_status=data['antideath_status']
            game.villager_1=data['villager_1']
            game.villager_1_status=data['villager_1_status']
            game.villager_2=data['villager_2']
            game.villager_2_status=data['villager_2_status']
            game.villager_3=data['villager_3']
            game.villager_3_status=data['villager_3_status']
            game.villager_4=data['villager_4']
            game.villager_4_status=data['villager_4_status']
            game.villager_5=data['villager_5']
            game.villager_5_status=data['villager_5_status']
            game.evos_1=data['evos_1']
            game.evos_1_status=data['evos_1_status']
            game.evos_2=data['evos_2']
            game.evos_2_status=data['evos_2_status']
            game.evos_3=data['evos_3']
            game.evos_3_status=data['evos_3_status']
            game.evos_4=data['evos_4']
            game.evos_4_status=data['evos_4_status']
        except:
            # print('------------------------BAD UPDATE DATA-----------------------------')
            pass

        try:
            game.death_faction=data['death_faction']
        except:
            # print('------------------------BAD FACTION DATA-----------------------------')
            pass

        try:
            game.winner=data['winner']
        except:
            pass

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
    game = Game.query.get(invite.game_id)
    players = game.players
    for player in players:
        if invite.invited_id == player.id:
            return
    invite.accepted=True
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
    return invite.to_dict()

@game_routes.route('/<int:game_id>/invites')
def get_invites(game_id):
    game = Game.query.get(game_id)
    invites = game.invites
    return {'invites_sent': [invite.to_dict() for invite in invites]}

@game_routes.route('/<int:game_id>/marks')
def get_marks(game_id):
    game = Game.query.get(game_id)
    return {'marks': [mark.to_dict() for mark in game.marks]}

@game_routes.route('/<int:game_id>/mark', methods=['POST'])
def mark(game_id):
    game = Game.query.get(game_id)
    form = MarkForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        mark = Mark(game_id=data['game_id'],
                    caller_id=data['caller_id'],
                    caller_name=data['caller_name'],
                    marked_id=data['marked_id'],
                    marked_name=data['marked_name'],)
        db.session.add(mark)
        game.marks.append(mark)
        db.session.commit()
        return mark.to_dict()
