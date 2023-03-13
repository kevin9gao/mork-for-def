import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadUsersGames } from '../../store/games';
import { loadUserInvites } from '../../store/invites';
import FriendsList from '../FriendsList';
import GamesList from '../GamesList';
import InviteList from '../GamesList/InvitesList';
import GameState from '../GameState/GameState';
import NewGame from '../NewGame';
import './Home.css';

export default function Home() {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionUser) navigate('/');
  }, [sessionUser]);

  useEffect(() => {
    dispatch(loadUsersGames(sessionUser?.id));
    dispatch(loadUserInvites(sessionUser?.id));
  }, []);

  if (!sessionUser) return null;

  return (
    <main>
      <div className='home-body'>
        <div className='games'>
          <GamesList />
          <InviteList />
        </div>
        <div className='friends-list-wrapper'>
          <NewGame />
          <FriendsList />
        </div>
      </div>
    </main>
  );
}
