import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function UserInvite({ user }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const handleInvite = e => {
    e.preventDefault();
  }

  if (!sessionUser) return null;

  return (
    <li key={user.id}>
      <NavLink to={`/users/${user.id}`}>
        <div className="user-btns">
          <div className="user-pics">
            <img className="avatars"
              src={user.profile_pic_url}
              alt='avatar'
              onError={({ target }) => {
                target.onError = null;
                target.src = 'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/link_broken.png';
              }}
            />
          </div>
          <div className="user-usernames">
            {user.username}
          </div>
        </div>
      </NavLink>
      <div className="invite-btn">
        <button
          onClick={handleInvite}
          // disabled={} TODO
          >
            Invite
            {/* TODO: CHANGE TO INVITED IF ALREADY INVITED */}
          </button>
      </div>
    </li>
  );
}
