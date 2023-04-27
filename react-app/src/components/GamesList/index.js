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
                <NavLink to={`/games/${game.id}/setup`}>
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Finish Setup
                  </button>
                </NavLink>
              )}
              {(game.phase === 'role-selection') && (
                <NavLink to={`/games/${game.id}/roles`}>
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Select Roles
                  </button>
                </NavLink>
              )}
              {(game.phase === 'infiltration') && (
                <NavLink to={`/games/${game.id}/await-infiltrate`}>
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Play
                  </button>
                </NavLink>
              )}
              {(game.phase === 'role-reveal') && (
                <NavLink to={`/games/${game.id}/role-reveal`}>
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    View Role
                  </button>
                </NavLink>
              )}
              {(game.phase === 'last-breath') && (
                <NavLink to={`/games/${game.id}/last-breath`}>
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Play
                  </button>
                </NavLink>
              )}
              {(game.phase === 'mark') && (
                <NavLink to={`/games/${game.id}/mark`}>
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Play
                  </button>
                </NavLink>
              )}
              {(game.phase === 'conclusion') && (
                <NavLink to={`/games/${game.id}/conclusion`}>
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Play
                  </button>
                </NavLink>
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
                <NavLink to={`/games/${game.id}/setup`}>
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Awaiting Setup...
                  </button>
                </NavLink>
              )}
              {(game.phase === 'role-selection') && (
                <span>Awaiting Role Selection...</span>
              )}
              {(game.phase === 'infiltration') && (
                <NavLink to={`/games/${game.id}/await-infiltrate`}>
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Play
                  </button>
                </NavLink>
              )}
              {(game.phase === 'role-reveal') && (
                <NavLink to={`/games/${game.id}/role-reveal`}>
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    View Role
                  </button>
                </NavLink>
              )}
              {(game.phase === 'last-breath') && (
                <NavLink to={`/games/${game.id}/last-breath`}>
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Play
                  </button>
                </NavLink>
              )}
              {(game.phase === 'mark') && (
                <NavLink to={`/games/${game.id}/mark`}>
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Play
                  </button>
                </NavLink>
              )}
              {(game.phase === 'conclusion') && (
                <NavLink to={`/games/${game.id}/conclusion`}>
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Play
                  </button>
                </NavLink>
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
              <button className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                <NavLink to={`/games/${game.id}`}>View</NavLink>
              </button>
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
