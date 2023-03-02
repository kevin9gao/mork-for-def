import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import LogoutButton from "../auth/LogoutButton";
import './Navigation.css';

export default function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [profPic, setProfPic] = useState(user?.profile_pic_url);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  }

  useEffect(() => {
    if (!profPic) {
      setProfPic(''); // todo
    }

    if (user?.profile_pic_url) setProfPic(user.profile_pic_url);
  }, [user?.profile_pic_url]);

  const toggleMenu = e => {
    e.preventDefault();

    setShowMenu(!showMenu);
  }

  useEffect(() => {
    if (!showMenu) return;

    const escapeClose = e => {
      if (e.key === 'Escape') {
        setShowMenu(false);
      }
    }

    document.onkeydown = e => escapeClose(e);

    return () => document.onkeydown = e => e.preventDefault();
  }, [showMenu]);

  // console.log('showMenu', showMenu);

  return (
    <>
      <div className="dropdown-wrapper">
        <button onClick={toggleMenu}>
          <img
            src={profPic}
            className='avatar'
            alt="avatar"
          />
        </button>
        {showMenu && (
          <div className="profile-dropdown">
            <p>
              <NavLink to={`/users/${user?.id}`} className='navbar-links'>
                {user?.username}
              </NavLink>
            </p>
            <p>
              <LogoutButton setShowMenu={setShowMenu} />
            </p>
          </div>
        )}
      </div>
    </>
  );
}
