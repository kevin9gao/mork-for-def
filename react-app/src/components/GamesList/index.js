import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './GamesList.css';

export default function GamesList() {
  const dispatch = useDispatch();
  const games = useSelector(state => state.games);
  const gamesArray = games ? Object.values(games) : null;
  console.log(gamesArray);

  // TODO: sort games so that finished games are at the bottom
  const myGames = gamesArray?.map(game => {
    // if (!game.includes('active')) return null;

    if (game.active) {
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
              <NavLink to={`/games/${game.id}`}>Play</NavLink>
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

  return (
    <div className="games-list-wrapper">
      <h2>My Games</h2>
      <div id="my-games">
        {myGames && (
          <ul id="my-games-ul">
            {myGames}
          </ul>
        )}
        {!myGames && (
          <h3>You do not have any active games.</h3>
        )}
      </div>
    </div>
  );
}
