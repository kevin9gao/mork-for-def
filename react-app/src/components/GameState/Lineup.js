import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadUsersGames } from "../../store/games";
import PlayerTable from "./PlayerTable";
import './GameState.css';
import RoleModal from "../SingleGame/RoleModal";

export default function Lineup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);
  const { gameId } = useParams();
  const game = useSelector(state => state.games[gameId]);

  useEffect(() => {
    dispatch(loadUsersGames(sessionUser?.id));
  }, []);

  const handleFirstMark = e => {
    e.preventDefault();

    if (sessionUser?.id === game?.death[0]) {
      return navigate(`/games/${gameId}/first-mark`);
    }

    navigate(`/games/${gameId}/mark`);
  }

  if (sessionUser?.id === game?.death[0] & game?.phase === 'role-reveal') {
    return (
      <div className="lineup-wrapper">
        <PlayerTable />
        <button onClick={handleFirstMark}>Got it.</button>
      </div>
    );
  }

  return (
    <div className="lineup-wrapper">
      <PlayerTable />
    </div>
  );
}
