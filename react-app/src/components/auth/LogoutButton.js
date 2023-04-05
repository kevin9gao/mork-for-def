import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = ({ setShowMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    if (!sessionUser) navigate('/');
  }, []);

  const onLogout = async (e) => {
    navigate('/');
    await dispatch(logout());
    setShowMenu(false);
  };

  return <button className='log-out-btn' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
