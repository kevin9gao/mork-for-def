import React from 'react';
import FriendsList from '../FriendsList';
import GameState from '../GameState/GameState';
import NewGame from '../NewGame';
import './Home.css';

export default function Home() {
  return (
    <main>
      <div className='home-body'>
        <div className='games'></div>
        <div className='friends-list-wrapper'>
          <NewGame />
          <FriendsList />
        </div>
      </div>
    </main>
  );
}
