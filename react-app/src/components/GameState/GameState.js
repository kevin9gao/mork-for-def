import React from "react";
import PlayerTable from "./PlayerTable";
import './GameState.css';

export default function GameState() {
  return (
    <div className="game-state">
      <h2>Game State</h2>
      <div className="player-table wrapper">
        <PlayerTable />
      </div>
    </div>
  );
}
