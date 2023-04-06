import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadUsersGames } from "../../store/games";

export default function PlayerTable() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const { gameId } = useParams();
  // console.log('gameId', gameId);
  const game = useSelector(state => state.games[gameId]);
  // console.log('game', game);
  const gameKeys = game ? Object.keys(game) : null;
  const gameValues = game ? Object.values(game) : null;
  const playersObj = {};
  const roles = {};

  useEffect(() => {
    dispatch(loadUsersGames(sessionUser?.id));
  }, []);

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
    // console.log('game.players', game.players)
    // console.log('playersObj', playersObj)
    for (let i = 0; i < rolesObj.length; i++) {
      const player = playersObj[rolesObj[i][0]];
      // console.log('player', player);
      roles[player.id] = [playersObj[rolesObj[i][0]], ...rolesObj[i]]
    }
  }
  // console.log('roles', roles);
  // console.log('typeof roles', typeof roles);
  const playerIds = Object.keys(roles);
  // console.log('playerIds', playerIds)
  // console.log('typeof playerIds', typeof playerIds)

  if (!game || !roles) return null;

  if (roles[sessionUser?.id][3] === 'evil' ||
      roles[sessionUser?.id][4] === 'death' ||
      !game?.active) return (
    <div className="player table evil">
      <div className="player headers">
        <span>Player</span>
        <span>Faction</span>
        <span>Status</span>
      </div>
      {playerIds.map(id => (
        <div className="row">
          <div className="name">{sessionUser?.id === Number(id) ?
            `${roles[id][0].username} (You)` :
            roles[id][0].username}</div>
          <div className={`faction ${roles[id][3] === 'good' ? 'good' : 'evil'}`}>
            {roles[id][3][0].toUpperCase() + roles[id][3].slice(1)}
          </div>
          <div className={`status ${roles[id][2] === 'alive' ? 'alive' :
            roles[id][2] === 'marked' ? 'marked' :
            roles[id][2] === 'caller' ? 'caller' : 'dead'}`}>
            {roles[id][2][0].toUpperCase() + roles[id][2].slice(1)}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="player table good">
      <div className="player headers">
        <span>Player</span>
        <span>Status</span>
      </div>
      {playerIds.map(id => (
        <div className="row">
          <div className="name">{sessionUser?.id === Number(id) ?
            `${roles[id][0].username} (You)` :
            roles[id][0].username}</div>
          <div className={`status ${roles[id][2] === 'alive' ? 'alive' :
            roles[id][2] === 'marked' ? 'marked' :
            roles[id][2] === 'caller' ? 'caller' : 'dead'}`}>
            {roles[id][2][0].toUpperCase() + roles[id][2].slice(1)}
          </div>
        </div>
      ))}
    </div>
  );
}
