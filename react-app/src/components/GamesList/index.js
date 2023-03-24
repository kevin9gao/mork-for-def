import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './GamesList.css';
import { loadUsersGames } from "../../store/games";

export default function GamesList() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const games = useSelector(state => state.games);
  const gamesArray = games ? Object.values(games) : null;
  // const [gamesArray, setGamesArray] = useState([]);
  // console.log('gamesArray', gamesArray);
  // console.log('sessionUser', sessionUser)

  useEffect(() => {
    dispatch(loadUsersGames(sessionUser?.id));
  }, [sessionUser]);

  // TODO: sort games so that finished games are at the bottom
  const myGames = gamesArray?.map(game => {
    // if (!game.includes('active')) return null;

    if (game.active & game.creator_id === sessionUser?.id) {
      return (
        <li>
          <div className="games-list-ele">
            <div>
              <span>{game.name}</span>
            </div>
            <div>
              <span>Phase</span>
              <span>{game.phase}</span>
            </div>
            <div>
              <span>Players</span>
              <span>{game.num_players}</span>
            </div>
            <div>
              {(game.phase === 'setup') && (
                <NavLink to={`/games/${game.id}/setup`}>Finish Setup</NavLink>
              )}
              {(game.phase === 'role-selection') && (
                <NavLink to={`/games/${game.id}/roles`}>Select Roles</NavLink>
              )}
              {(game.phase === 'infiltration') && (
                <NavLink to={`/games/${game.id}/infiltrate`}>Play</NavLink>
              )}
              {(game.phase === 'play') && (
                <NavLink to={`/games/${game.id}`}>Play</NavLink>
              )}
            </div>
          </div>
        </li>
      );
    } else if (game.active) {
      return (
        <li>
          <div className="games-list-ele">
            <div>
              <span>{game.name}</span>
            </div>
            <div>
              <span>Phase</span>
              <span>{game.phase}</span>
            </div>
            <div>
              <span>Players</span>
              <span>{game.num_players}</span>
            </div>
            <div>
              {(game.phase === 'setup') && (
                <NavLink to={`/games/${game.id}/setup`}>Awaiting Setup...</NavLink>
              )}
              {(game.phase === 'role-selection') && (
                <span>Awaiting Role Selection...</span>
              )}
              {(game.phase === 'infiltration') && (
                <NavLink to={`/games/${game.id}/infiltrate`}>Play</NavLink>
              )}
              {(game.phase === 'play') && (
                <NavLink to={`/games/${game.id}`}>Play</NavLink>
              )}
            </div>
          </div>
        </li>
      );
    } else {
      return (
        <li>
          <div className="games-list-ele">
            <div>
              <span>{game.name}</span>
            </div>
            <div>
              <span>Phase</span>
              <span>Concluded</span>
            </div>
            <div>
              <span>Players</span>
              <span>{game.num_players}</span>
            </div>
            <div>
              <NavLink to={`/games/${game.id}`}>View</NavLink>
            </div>
          </div>
        </li>
      );
    }
  });

  // console.log('myGames', myGames)

  return (
    <div className="games-list-wrapper">
      <h2>My Games</h2>
      <div id="my-games">
        {myGames && (
          <ul id="my-games-ul">
            {myGames}
          </ul>
        )}
        {myGames.length === 0 && (
          <h3>You do not have any active games.</h3>
        )}
      </div>
    </div>
  );
}
