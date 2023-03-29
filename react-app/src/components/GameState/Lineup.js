import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadUsersGames } from "../../store/games";
import PlayerTable from "./PlayerTable";
import './GameState.css';

export default function Lineup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);
  const { gameId } = useParams();
  const game = useSelector(state => state.games[gameId]);

  useEffect(() => {
    dispatch(loadUsersGames(sessionUser?.id));
  }, []);

  if (sessionUser?.id === game?.death[0]) return (
    <div className="lineup-wrapper">
      <PlayerTable game={game} />
    </div>
  );

  return (
    <div className="lineup-wrapper">
      <PlayerTable game={game} />
    </div>
  );
}
