import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadUsersGames, updateGame } from "../../store/games";
import joey from '../../images/joey-morked-for-def.jpg';

export default function LastBreath({ refresh, setRefresh }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gameId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const game = useSelector(state => state.games[gameId]);
  const [caller, setCaller] = useState(0);
  // const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');

  useEffect(() => {
    dispatch(loadUsersGames(sessionUser?.id));
  }, []);

  useEffect(() => {
    if (game?.phase === 'mark') {
      navigate(`/games/${gameId}/mark`);
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

  const handleNextCaller = id => {
    if (roles[id][2] !== 'dead' && roles[id][2] !== 'marked') setCaller(id);
  };

  const playersTable = playerIds.map(id => (
    <div key={id}
      className={`row ${id === caller ? 'caller' : ''}`}
      onClick={() => handleNextCaller(id)}>
      <div className="name">{sessionUser?.id === Number(id) ?
        `${roles[id][0].username} (You)` :
        roles[id][0].username}</div>
      <div className={`status ${roles[id][2] === 'alive' ? 'alive' :
        roles[id][2] === 'marked' ? 'marked' : 'dead'}`}>
        {roles[id][2][0].toUpperCase() + roles[id][2].slice(1)}
      </div>
    </div>
  ));

  const handleSubmit = async e => {
    e.preventDefault();

    if (!!roles) {
      let gameOver = false;
      const rolesArr = Object.values(roles);
      // console.log('rolesArr', rolesArr)
      const alive = rolesArr.filter(player => player[2] !== 'dead' &&
                                              player[1] !== sessionUser.id);
      console.log('alive', alive)
      let evilAlive = false;
      let goodAlive = false;
      let deathAlive = false;
      for (let i = 0; i < alive.length; i++) {
        // console.log('i', i, 'alive[i]', alive[i]);
        if (alive[i][3] === 'evil') evilAlive = true;
        if (alive[i][3] === 'good') goodAlive = true;
        if (alive[i][4] === 'death') deathAlive = true;
      }
      console.log('evilAlive', evilAlive)
      console.log('goodAlive', goodAlive)
      console.log('deathAlive', deathAlive)
      // console.log('alive.length', alive.length)
      if (evilAlive && !(goodAlive && deathAlive)) {
        // setGameOver(true);
        gameOver = true;
        setWinner('evil');
      } else if (goodAlive && !(evilAlive && deathAlive)) {
        // setGameOver(true);
        gameOver = true;
        setWinner('good');
      } else if (deathAlive && alive.length === 1) {
        // setGameOver(true);
        gameOver = true;
        setWinner('death');
      }

      console.log('gameOver', gameOver)
      console.log('winner', winner)

      if (gameOver) {
        const payload = {
          name: game.name,
          phase: 'conclusion',
          active: false,
          winner: winner,
          death_faction: game.death[2],
          death: game.death[0],
          death_status: game.death[0] === 'alive' ? 'alive' :
            game.death[1] === 'caller' ? 'alive' :
            game.death[1] === 'marked' ? 'dead' : game.death[1],
          time_shifter: game.time_shifter[0],
          time_shifter_status: game.time_shifter[0] === 'alive' ? 'alive' :
            game.time_shifter[1] === 'caller' ? 'alive' : game.time_shifter[1],
          cultist: game.cultist[0],
          cultist_status: game.cultist[0] === 'alive' ? 'alive' :
            game.cultist[1] === 'caller' ? 'alive' : game.cultist[1],
          necromancer: game.necromancer[0],
          necromancer_status: game.necromancer[0] === 'alive' ? 'alive' :
            game.necromancer[1] === 'caller' ? 'alive' : game.necromancer[1],
          disruptor: game.disruptor[0],
          disruptor_status: game.disruptor[0] === 'alive' ? 'alive' :
            game.disruptor[1] === 'caller' ? 'alive' : game.disruptor[1],
          psychic: game.psychic[0],
          psychic_status: game.psychic[0] === 'alive' ? 'alive' :
            game.psychic[1] === 'caller' ? 'alive' : game.psychic[1],
          jesus: game.jesus[0],
          jesus_status: game.jesus[0] === 'alive' ? 'alive' :
            game.jesus[1] === 'caller' ? 'alive' : game.jesus[1],
          medium: game.medium[0],
          medium_status: game.medium[0] === 'alive' ? 'alive' :
            game.medium[1] === 'caller' ? 'alive' : game.medium[1],
          mystic: game.mystic[0],
          mystic_status: game.mystic[0] === 'alive' ? 'alive' :
            game.mystic[1] === 'caller' ? 'alive' : game.mystic[1],
          antideath: game.antideath[0],
          antideath_status: game.antideath[0] === 'alive' ? 'alive' :
            game.antideath[1] === 'caller' ? 'alive' : game.antideath[1],
          villager_1: game.villager_1[0],
          villager_1_status: game.villager_1[0] === 'alive' ? 'alive' :
            game.villager_1[1] === 'caller' ? 'alive' : game.villager_1[1],
          villager_2: game.villager_2[0],
          villager_2_status: game.villager_2[0] === 'alive' ? 'alive' :
            game.villager_2[1] === 'caller' ? 'alive' : game.villager_2[1],
          villager_3: game.villager_3[0],
          villager_3_status: game.villager_3[0] === 'alive' ? 'alive' :
            game.villager_3[1] === 'caller' ? 'alive' : game.villager_3[1],
          villager_4: game.villager_4[0],
          villager_4_status: game.villager_4[0] === 'alive' ? 'alive' :
            game.villager_4[1] === 'caller' ? 'alive' : game.villager_4[1],
          villager_5: game.villager_5[0],
          villager_5_status: game.villager_5[0] === 'alive' ? 'alive' :
            game.villager_5[1] === 'caller' ? 'alive' : game.villager_5[1],
          evos_1: game.evos_1[0],
          evos_1_status: game.evos_1[0] === 'alive' ? 'alive' :
            game.evos_1[1] === 'caller' ? 'alive' : game.evos_1[1],
          evos_2: game.evos_2[0],
          evos_2_status: game.evos_2[0] === 'alive' ? 'alive' :
            game.evos_2[1] === 'caller' ? 'alive' : game.evos_2[1],
          evos_3: game.evos_3[0],
          evos_3_status: game.evos_3[0] === 'alive' ? 'alive' :
            game.evos_3[1] === 'caller' ? 'alive' : game.evos_3[1],
          evos_4: game.evos_4[0],
          evos_4_status: game.evos_4[0] === 'alive' ? 'alive' :
            game.evos_4[1] === 'caller' ? 'alive' : game.evos_4[1],
        };

        console.log('GameState payload', payload)

        dispatch(updateGame(gameId, payload));
        navigate(`/games/${gameId}/conclusion`);
      }
    } else {
      const payload = {
        name: game.name,
        phase: 'mark',
        active: true,
        death_faction: game.death[2],
        death: game.death[0],
        death_status: Number(caller) === game.death[0] ? 'caller' :
          game.death[1] === 'marked' ? 'dead' : game.death[1],
        time_shifter: game.time_shifter[0],
        time_shifter_status: Number(caller) === game.time_shifter[0] ? 'caller' :
          game.time_shifter[1] === 'marked' ? 'dead' : game.time_shifter[1],
        cultist: game.cultist[0],
        cultist_status: Number(caller) === game.cultist[0] ? 'caller' :
          game.cultist[1] === 'marked' ? 'dead' : game.cultist[1],
        necromancer: game.necromancer[0],
        necromancer_status: Number(caller) === game.necromancer[0] ? 'caller' :
          game.necromancer[1] === 'marked' ? 'dead' : game.necromancer[1],
        disruptor: game.disruptor[0],
        disruptor_status: Number(caller) === game.disruptor[0] ? 'caller' :
          game.disruptor[1] === 'marked' ? 'dead' : game.disruptor[1],
        psychic: game.psychic[0],
        psychic_status: Number(caller) === game.psychic[0] ? 'caller' :
          game.psychic[1] === 'marked' ? 'dead' : game.psychic[1],
        jesus: game.jesus[0],
        jesus_status: Number(caller) === game.jesus[0] ? 'caller' :
          game.jesus[1] === 'marked' ? 'dead' : game.jesus[1],
        medium: game.medium[0],
        medium_status: Number(caller) === game.medium[0] ? 'caller' :
          game.medium[1] === 'marked' ? 'dead' : game.medium[1],
        mystic: game.mystic[0],
        mystic_status: Number(caller) === game.mystic[0] ? 'caller' :
          game.mystic[1] === 'marked' ? 'dead' : game.mystic[1],
        antideath: game.antideath[0],
        antideath_status: Number(caller) === game.antideath[0] ? 'caller' :
          game.antideath[1] === 'marked' ? 'dead' : game.antideath[1],
        villager_1: game.villager_1[0],
        villager_1_status: Number(caller) === game.villager_1[0] ? 'caller' :
          game.villager_1[1] === 'marked' ? 'dead' : game.villager_1[1],
        villager_2: game.villager_2[0],
        villager_2_status: Number(caller) === game.villager_2[0] ? 'caller' :
          game.villager_2[1] === 'marked' ? 'dead' : game.villager_2[1],
        villager_3: game.villager_3[0],
        villager_3_status: Number(caller) === game.villager_3[0] ? 'caller' :
          game.villager_3[1] === 'marked' ? 'dead' : game.villager_3[1],
        villager_4: game.villager_4[0],
        villager_4_status: Number(caller) === game.villager_4[0] ? 'caller' :
          game.villager_4[1] === 'marked' ? 'dead' : game.villager_4[1],
        villager_5: game.villager_5[0],
        villager_5_status: Number(caller) === game.villager_5[0] ? 'caller' :
          game.villager_5[1] === 'marked' ? 'dead' : game.villager_5[1],
        evos_1: game.evos_1[0],
        evos_1_status: Number(caller) === game.evos_1[0] ? 'caller' :
          game.evos_1[1] === 'marked' ? 'dead' : game.evos_1[1],
        evos_2: game.evos_2[0],
        evos_2_status: Number(caller) === game.evos_2[0] ? 'caller' :
          game.evos_2[1] === 'marked' ? 'dead' : game.evos_2[1],
        evos_3: game.evos_3[0],
        evos_3_status: Number(caller) === game.evos_3[0] ? 'caller' :
          game.evos_3[1] === 'marked' ? 'dead' : game.evos_3[1],
        evos_4: game.evos_4[0],
        evos_4_status: Number(caller) === game.evos_4[0] ? 'caller' :
          game.evos_4[1] === 'marked' ? 'dead' : game.evos_4[1],
      };

      console.log('payload', payload)

      const updatedGame = await dispatch(updateGame(gameId, payload));
      navigate(`/games/${gameId}/mark`);
      setRefresh(refresh + 1);
    }
  };
  // console.log('roles', roles);
  // console.log('typeof roles', typeof roles);
  // console.log('!!(roles)', !!(roles))
  // console.log('roles.length > 0', roles.length > 0)
  // console.log('roles[sessionUser.id][2]', roles[sessionUser.id][2])
  // console.log('roles.length > 0 && roles[sessionUser.id][2] === "marked"', roles.length > 0 && roles[sessionUser.id][2] === 'marked')

  if (!game) return null;

  if (!!roles && roles[sessionUser?.id][2] === 'marked') return (
    <div className="last-breath-wrapper">
      <div className="last-breath-instructions">
        <span>You are Marked for Death.</span>
        <span>Choose one player to be the next Caller.</span>
        <span>That player gets to Mark another player for Death.</span>
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

  return (
    <div className="infiltrate-wrapper">
      <div className="infiltrate-media">
        <img src={joey} />
      </div>
      <div className="infiltrate-text">
        <span>Waiting for Marked to choose next Caller...</span>
      </div>
    </div>
  );
}
