import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = ({ setShowMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = async (e) => {
    navigate('/');
    await dispatch(logout());
    setShowMenu(false);
  };

  return <button className='log-out-btn' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
