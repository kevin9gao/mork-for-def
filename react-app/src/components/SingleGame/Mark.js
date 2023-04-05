import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { markPlayer } from "../../store/games";
import joey from '../../images/joey-morked-for-def.jpg';

export default function Mark({ refresh, setRefresh }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gameId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const game = useSelector(state => state.games[gameId]);
  const [marked, setMarked] = useState(0);
  const users = useSelector(state => state.users);

  useEffect(() => {
    if (game?.phase === 'last-breath') {
      navigate(`/games/${gameId}/last-breath`);
    }
  }, []);

  const gameKeys = game ? Object.keys(game) : null;
  const gameValues = game ? Object.values(game) : null;
  const playersObj = {};
  const roles = {};
  if (game) {
    for (let i = 0; i < game.players.length; i++) {
      const player = game.players[i];
      playersObj[player.id] = player;
    };
    const rolesObj = game ? gameValues?.map((value, idx) => {
      if (typeof value === 'object' & value[0] > 0) {
        const val = value;
        return [...val, gameKeys[idx]];
      }
    }).filter(value => !!value) : null;
    // console.log('rolesObj', rolesObj);
    // console.log('playersObj', playersObj)
    for (let i = 0; i < rolesObj.length; i++) {
      const player = playersObj[rolesObj[i][0]];
      roles[player.id] = [playersObj[rolesObj[i][0]], ...rolesObj[i]]
    }
  }
  // console.log('roles', roles);
  const playerIds = Object.keys(roles);

  const handleMark = id => {
    if (roles[id][2] !== 'dead') setMarked(id);
  };

  const playersTable = playerIds.map(id => (
    <div key={id}
      className={`row ${id === marked ? 'marked' : ''}`}
      onClick={() => handleMark(id)}>
      <div className="name">{sessionUser?.id === Number(id) ?
        `${roles[id][0].username} (You)` :
        roles[id][0].username}</div>
      <div className={`status ${roles[id][2] === 'alive' ? 'alive' :
        roles[id][2] === 'marked' ? 'marked' :
        roles[id][2] === 'caller' ? 'caller' : 'dead'}`}>
        {roles[id][2][0].toUpperCase() + roles[id][2].slice(1)}
      </div>
    </div>
  ));

  const handleSubmit = async e => {
    e.preventDefault();

    const gamePayload = {
      name: game.name,
      phase: 'last-breath',
      active: true,
      death_faction: game.death[2],
      death: game.death[0],
      death_status: Number(marked) === game.death[0] ? 'marked' :
                    game.death[1] === 'caller' ? 'alive' : game.death[1],
      time_shifter: game.time_shifter[0],
      time_shifter_status: Number(marked) === game.time_shifter[0] ? 'marked' :
                    game.time_shifter[1] === 'caller' ? 'alive' : game.time_shifter[1],
      cultist: game.cultist[0],
      cultist_status: Number(marked) === game.cultist[0] ? 'marked' :
                    game.cultist[1] === 'caller' ? 'alive' : game.cultist[1],
      necromancer: game.necromancer[0],
      necromancer_status: Number(marked) === game.necromancer[0] ? 'marked' :
                    game.necromancer[1] === 'caller' ? 'alive' : game.necromancer[1],
      disruptor: game.disruptor[0],
      disruptor_status: Number(marked) === game.disruptor[0] ? 'marked' :
                    game.disruptor[1] === 'caller' ? 'alive' : game.disruptor[1],
      psychic: game.psychic[0],
      psychic_status: Number(marked) === game.psychic[0] ? 'marked' :
                    game.psychic[1] === 'caller' ? 'alive' : game.psychic[1],
      jesus: game.jesus[0],
      jesus_status: Number(marked) === game.jesus[0] ? 'marked' :
                    game.jesus[1] === 'caller' ? 'alive' : game.jesus[1],
      medium: game.medium[0],
      medium_status: Number(marked) === game.medium[0] ? 'marked' :
                    game.medium[1] === 'caller' ? 'alive' : game.medium[1],
      mystic: game.mystic[0],
      mystic_status: Number(marked) === game.mystic[0] ? 'marked' :
                    game.mystic[1] === 'caller' ? 'alive' : game.mystic[1],
      antideath: game.antideath[0],
      antideath_status: Number(marked) === game.antideath[0] ? 'marked' :
                    game.antideath[1] === 'caller' ? 'alive' : game.antideath[1],
      villager_1: game.villager_1[0],
      villager_1_status: Number(marked) === game.villager_1[0] ? 'marked' :
                    game.villager_1[1] === 'caller' ? 'alive' : game.villager_1[1],
      villager_2: game.villager_2[0],
      villager_2_status: Number(marked) === game.villager_2[0] ? 'marked' :
                    game.villager_2[1] === 'caller' ? 'alive' : game.villager_2[1],
      villager_3: game.villager_3[0],
      villager_3_status: Number(marked) === game.villager_3[0] ? 'marked' :
                    game.villager_3[1] === 'caller' ? 'alive' : game.villager_3[1],
      villager_4: game.villager_4[0],
      villager_4_status: Number(marked) === game.villager_4[0] ? 'marked' :
                    game.villager_4[1] === 'caller' ? 'alive' : game.villager_4[1],
      villager_5: game.villager_5[0],
      villager_5_status: Number(marked) === game.villager_5[0] ? 'marked' :
                    game.villager_5[1] === 'caller' ? 'alive' : game.villager_5[1],
      evos_1: game.evos_1[0],
      evos_1_status: Number(marked) === game.evos_1[0] ? 'marked' :
                    game.evos_1[1] === 'caller' ? 'alive' : game.evos_1[1],
      evos_2: game.evos_2[0],
      evos_2_status: Number(marked) === game.evos_2[0] ? 'marked' :
                    game.evos_2[1] === 'caller' ? 'alive' : game.evos_2[1],
      evos_3: game.evos_3[0],
      evos_3_status: Number(marked) === game.evos_3[0] ? 'marked' :
                    game.evos_3[1] === 'caller' ? 'alive' : game.evos_3[1],
      evos_4: game.evos_4[0],
      evos_4_status: Number(marked) === game.evos_4[0] ? 'marked' :
                    game.evos_4[1] === 'caller' ? 'alive' : game.evos_4[1],
    };

    const markPayload = {
      game_id: game.id,
      caller_id: sessionUser.id,
      caller_name: sessionUser.username,
      marked_id: marked,
      marked_name: users[Number(marked)].username,
    };

    // console.log('gamePayload', gamePayload)
    // console.log('markPayload', markPayload)

    const dispatchedMark = await dispatch(markPlayer(game.id, gamePayload, markPayload));
    navigate(`/games/${gameId}/last-breath`);
    setRefresh(refresh + 1);
  };

  if (!game) return null;

  if (!!roles && roles[sessionUser?.id][2] !== 'caller') {
    return (
      <div className="infiltrate-wrapper">
        <div className="infiltrate-media">
          <img src={joey} />
        </div>
        <div className="infiltrate-text">
          <span>Waiting for Caller to Mark next player...</span>
        </div>
      </div>
    );
  };

  return (
    <div className="mark-wrapper good">
      <div className="mark-instructions">
        <span>You are the Caller.</span>
        <span>Choose one player to be Marked for Death.</span>
        <span>That player is Marked, and then gets to choose the next Caller.</span>
      </div>
      <div className="player table">
        <div className="player headers">
          <span>Player</span>
          <span>Status</span>
        </div>
        {playersTable}
      </div>
      <div>
        <button onClick={handleSubmit}>Confirm.</button>
      </div>
    </div>
  );
}
