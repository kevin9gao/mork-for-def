import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Card from '../../images/card-back.jpg';
import { loadUsersGames } from "../../store/games";

export default function RoleReveal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);
  const { gameId } = useParams();
  const game = useSelector(state => state.games[gameId]);
  const [hideCardBack, setHideCardBack] = useState(false);

  useEffect(() => {
    dispatch(loadUsersGames(sessionUser.id));
  }, []);

  // if (game?.death[2]) navigate(`/games/${gameId}/lineup`);

  const gameKeys = game ? Object.keys(game) : null;
  const gameValues = game ? Object.values(game) : null;
  const roles = game ? gameValues?.map((value, idx) => {
    if (typeof value === 'object' & value[0] > 0) {
      // to deal with the to_dict method of games returning the faction for death
      if (gameKeys[idx] === 'death') return [value[0], value[1], gameKeys[idx], value[2]];

      return [...value, gameKeys[idx]];
    }
  }).filter(value => !!value) : null;
  // console.log('gameKeys', gameKeys);
  // console.log('gameValues', gameValues);
  // console.log('roles', roles);
  const roleStr = roles?.filter(role => role[0] === sessionUser.id)[0][2];
  const roleName = roleStr ? roleStr[0].toUpperCase() + roleStr.slice(1) : null;
  // console.log('roleName', roleName)
  // console.log('typeof roleName', typeof roleName)

  const handleGotIt = e => {
    e.preventDefault();

    if (roleName === 'Death') navigate(`/games/${gameId}/infiltrate`);
  }

  return (
    <div className="role-reveal-wrapper">
      <div>
        <h2>Your role is...</h2>
      </div>
      <div className="card">
        <div className="card-back-wrapper" hidden={hideCardBack}>
          <div>
            <img src={Card} className={hideCardBack ? 'hidden' : ''}/>
          </div>
        </div>
        <div className="role-card" id={roleName}>
          <div className="role-img">
            {/* <img src={} /> */}
          </div>
          <div className="role-name">
            <span>{roleName}</span>
          </div>
        </div>
      </div>
      <div id="role-reveal-btns">
        <div id="show-role-btn">
          <button onClick={() => setHideCardBack(!hideCardBack)}>
            {hideCardBack ? 'Hide Role' : 'Show Role'}
            </button>
        </div>
        <div id="got-it-btn">
          <button onClick={handleGotIt}>Ok, got it!</button>
        </div>
      </div>
    </div>
  );
}
