import React from 'react';
import GameState from '../GameState/GameState';
import './Home.css';

export default function Home() {
  return (
    <main>
      <div className='header'>
        <h1>Mork Fuh Def</h1>
      </div>
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
