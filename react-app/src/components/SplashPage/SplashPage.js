import React, { useEffect } from "react";
import './SplashPage.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SplashPage() {
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);

  // console.log('ON SPLASH PAGE');
  if (sessionUser) navigate('/home');

  return (
    <div className="splash-page-wrapper">
      <h1 className="m-4">Marked For Death: One Life</h1>
      <div className="flex flex-row justify-evenly items-center" id="splash-page-buttons">
        <button
          className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded m-1"
          onClick={() => navigate('/signup')} id='signup'>
          Sign Up
        </button>
        <button
          className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded m-1"
          onClick={() => navigate('/login')} id='login'>
          Log In
        </button>
      </div>
    </div>
  );
}
