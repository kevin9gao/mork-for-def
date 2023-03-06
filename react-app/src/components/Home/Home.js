import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsersGames } from '../../store/games';
import FriendsList from '../FriendsList';
import GamesList from '../GamesList';
import GameState from '../GameState/GameState';
import NewGame from '../NewGame';
import './Home.css';

export default function Home() {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsersGames(sessionUser.id));
  }, []);

  return (
    <main>
      <div className='home-body'>
        <div className='games'>
          <GamesList />
        </div>
        <div className='friends-list-wrapper'>
          <NewGame />
          <FriendsList />
        </div>
      </div>
    </main>
  );
}
