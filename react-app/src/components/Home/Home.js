import React from 'react';
import FriendsList from '../FriendsList';
import GameState from '../GameState/GameState';
import './Home.css';

export default function Home() {
  return (
    <main>
      <div className='header'>
        <h1>Mork Fuh Def</h1>
      </div>
      <div className='home-body'>
        <div className='games'></div>
        <div className='friends-list-wrapper'>
          <FriendsList />
        </div>
      </div>
    </main>
  );
}
