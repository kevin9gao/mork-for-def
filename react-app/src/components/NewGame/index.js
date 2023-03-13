import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createGame } from "../../store/games";
import './NewGame.css';

export default function NewGame() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const navigate = useNavigate();

  const handleNewGame = async e => {
    e.preventDefault();

    const payload = {
      name: `${sessionUser.username} - New Campaign`,
      num_players: 1,
      phase: 'setup',
      active: true,
      creator_id: sessionUser.id,
    };

    const newGame = await dispatch(createGame(payload));

    navigate(`/games/${newGame.id}/setup`);
  }

  return (
    <div className="new-game-wrapper">
      <button onClick={handleNewGame}>New Game</button>
    </div>
  );
}
