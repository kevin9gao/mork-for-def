import React from "react";
import { useDispatch } from "react-redux";
import GameState from "../GameState/GameState";
import './Game.css';

export default function SingleGame() {
  const dispatch = useDispatch();

  return (
    <main>
      <div className='board'>
        <div className='left'>
          <GameState />
        </div>
        <div className='right'>
          Right
        </div>
      </div>
    </main>
  );
}
