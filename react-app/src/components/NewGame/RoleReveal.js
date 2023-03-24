import React from "react";
import Card from '../../images/card-back.jpg';

export default function RoleReveal({ game, user }) {
  console.log('game', game);
  const gameKeys = Object.keys(game);
  const gameValues = Object.values(game);
  const roles = gameValues.map((value, idx) => {
    if (typeof value === 'object' & value[0] > 0) {
      return [...value, gameKeys[idx]];
    }
  }).filter(value => !!value);
  // console.log('gameKeys', gameKeys);
  // console.log('gameValues', gameValues);
  // console.log('roles', roles);
  const roleStr = roles.filter(role => role[0] === user.id)[0][2];
  const roleName = roleStr[0].toUpperCase() + roleStr.slice(1);
  // console.log('roleName', roleName)
  // console.log('typeof roleName', typeof roleName)

  return (
    <div className="role-reveal-wrapper">
      <div>
        <h2>Your role is...</h2>
      </div>
      <div className="card">
        <div className="card-back-wrapper">
          <div>
            <img src={Card} />
          </div>
        </div>
        <div className="role-card" id={roleName}>
          <div className="role-img">
            {/* <img src={} /> */}
          </div>
          <div className="role-name">
            <span>{roleName}</span>
          </div>
        </div>
      </div>
      <div id="got-it-btn">
        <button>Ok, got it!</button>
      </div>
    </div>
  );
}
