import React from "react";

const PLAYERS = ['Derek', 'Shyam', 'Kevin', 'Sean', 'Johnny', 'Chris', 'Greg', 'Alex', 'Joey'];

export default function PlayerTable() {
  return (
    <div className="player table">
      <div className="player headers">
        <span>Player</span>
        <span>Status</span>
      </div>
      {PLAYERS.map(player => (
        <div className="row">
          <div className="name">{player}</div>
          <div className="status">Alive</div>
        </div>
      ))}
    </div>
  );
}
