import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadUsersGames } from "../../store/games";
import joey from '../../images/joey-morked-for-def.jpg';
import RoleReveal from "./RoleReveal";

export default function AwaitInfiltrate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gameId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const game = useSelector(state => state.games[gameId]);
  // console.log('gameId', gameId);
  // console.log('game', game);

  useEffect(() => {
    dispatch(loadUsersGames(sessionUser?.id));
  }, []);

  if (sessionUser?.id === game?.death[0]) {
    return navigate(`/games/${gameId}/role-reveal`);
  }

  return (
    <div className="infiltrate-wrapper">
      <div className="infiltrate-media">
        <img src={joey} />
      </div>
      <div className="infiltrate-text">
        <span>Awaiting Death's Infiltration...</span>
      </div>
    </div>
  );
}
