import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadUsersGames } from "../../store/games";

export default function RefreshButton({ refresh, setRefresh }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { gameId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const game = useSelector(state => state.games[gameId]);

  useEffect(() => {
    dispatch(loadUsersGames(sessionUser?.id));
  }, []);

  const handleRefresh = e => {
    e.preventDefault();

    setRefresh(refresh + 1);

    const phase = game?.phase;
    navigate(`/games/${gameId}/${phase}`);
  }

  return (
    <div className="refresh-btn">
      <button onClick={handleRefresh}>Refesh</button>
    </div>
  );
}
