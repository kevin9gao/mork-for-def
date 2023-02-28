import React from "react";
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

  if (!sessionUser) return null;

  return (
    <div className="navbar-wrapper">
      <div id="left">
        <p>{sessionUser?.username}</p>
      </div>
      <div id="middle">
        <h1>Morked For Def</h1>
      </div>
      <div id="right">
        <ProfileButton user={sessionUser} />
      </div>
    </div>
  );
}
