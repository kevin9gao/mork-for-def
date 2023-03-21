import React from "react";
import { NavLink } from "react-router-dom";

export default function Player({ player }) {
  return (
    <li key={player.id}>
      <NavLink to={`/users/${player.id}`}>
        <div className="user-btns">
          <div className="user-pics">
            <img className="avatars"
              src={player.profile_pic_url}
              alt='avatar'
              onError={({ target }) => {
                target.onError = null;
                target.src = 'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/link_broken.png';
              }}
            />
          </div>
          <div className="user-usernames">
            {player.username}
          </div>
        </div>
      </NavLink>
    </li>
  );
}
