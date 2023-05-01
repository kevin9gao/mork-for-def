import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import './Navigation.css';

export default function Navbar() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <ProfileButton user={sessionUser} />
      </>
    );
  }

  // console.log('sessionUser', sessionUser);

  if (!sessionUser) return null;

  return (
    <div className="navbar-wrapper">
      <div id="left">
        <p>{sessionUser?.username}</p>
        <NavLink to='/home'>Home</NavLink>
      </div>
      <div id="middle">
        <h1>Marked For Death</h1>
      </div>
      <div id="right">
        <ProfileButton user={sessionUser} />
      </div>
    </div>
  );
}
