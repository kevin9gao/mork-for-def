import React from "react";
import { useSelector } from "react-redux";

export default function PlayerTable({ game }) {
  const sessionUser = useSelector(state => state.session.user);
  const gameKeys = game ? Object.keys(game) : null;
  const gameValues = game ? Object.values(game) : null;
  const playersObj = {};
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
  const roles = {};
  for (let i = 0; i < rolesObj.length; i++) {
    const player = playersObj[rolesObj[i][0]];
    // console.log('player', player);
    roles[player.id] = [playersObj[rolesObj[i][0]], ...rolesObj[i]]
  }
  // console.log('roles', roles);
  // console.log('typeof roles', typeof roles);
  const playerIds = Object.keys(roles);
  // console.log('playerIds', playerIds)
  // console.log('typeof playerIds', typeof playerIds)

  return (
    <div className="player table">
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
            {roles[id][3]}
          </div>
          <div className={`status ${roles[id][2] === 'alive' ? 'alive' :
                                    roles[id][2] === 'marked' ? 'marked' : 'dead'}`}>
            {roles[id][2]}
          </div>
        </div>
      ))}
    </div>
  );
}
