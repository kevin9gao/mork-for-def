import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { inviteUser } from "../../store/invites";

export default function UserInvite({ user, game }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);
  const invitesSent = useSelector(state => state.invites['invites-sent']);
  const invitesArray = invitesSent ? Object.values(invitesSent).filter(invite => {
    return invite.game_id === game.id
  }).map(invite => invite.invited_id) : null;
  // console.log('invitesArray', invitesArray);

  const handleInvite = e => {
    e.preventDefault();

    const payload = {
      inviter_id: sessionUser.id,
      invited_id: user.id,
      game_id: game.id
    };

    dispatch(inviteUser(payload, user.id, game.id));
    navigate(0);
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
          disabled={invitesArray?.includes(user.id)}
          className={invitesArray?.includes(user.id) ? 'invited' : 'not-invited'}
          >
            {!invitesArray?.includes(user.id) && 'Invite'}
            {invitesArray?.includes(user.id) && 'Invite Sent'}
          </button>
      </div>
    </li>
  );
}
