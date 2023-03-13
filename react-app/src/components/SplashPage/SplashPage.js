import React, { useEffect } from "react";
import './SplashPage.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SplashPage() {
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    if (sessionUser) navigate('/home');
  }, []);

  return (
    <div className="splash-page-wrapper">
      <h1>Morked For Def</h1>
      <button onClick={() => navigate('/signup')} id='signup'>
        Sign Up
      </button>
      <button onClick={() => navigate('/login')} id='login'>
        Log In
      </button>
    </div>
  );
}
