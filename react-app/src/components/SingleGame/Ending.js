import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadUsersGames } from "../../store/games";

export default function Ending() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const { gameId } = useParams();
  const game = useSelector(state => state.games[gameId]);

  useEffect(() => {
    dispatch(loadUsersGames(sessionUser?.id));
  }, []);

  return (
    <div className="ending-wrapper">
      <div className="header">
        <h2>The game is over.</h2>
      </div>
    </div>
  );
}
