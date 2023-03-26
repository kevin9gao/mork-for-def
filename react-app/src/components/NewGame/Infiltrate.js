import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadUsersGames } from "../../store/games";

export default function Infiltrate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);
  const { gameId } = useParams();
  const game = useSelector(state => state.games[gameId]);

  useEffect(() => {
    dispatch(loadUsersGames(sessionUser?.id));
  }, []);

  if (sessionUser?.id !== game?.death[0]) navigate(`/games/${gameId}/await-infiltrate`);

  return (
    <div className="infiltrate-wrapper">
      <div className="infiltrate-instructions">
        <span>
          Your role is Death. Choose to infiltrate either the evil faction or the
          good faction.
        </span>
        <span>
          The other players will not be able to see which faction you infiltrate.
        </span>
        <span>
          Based on your decision, one random role from the chosen good or evil
          roles will be discarded.
        </span>
      </div>
    </div>
  );
}
