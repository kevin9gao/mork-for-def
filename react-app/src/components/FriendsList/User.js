import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { befriendUser, unfriendUser } from "../../store/users";

export default function User({ user }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const friends = useSelector(state => state.users.friends);

  const friendsIds = friends ? Object.keys(friends).map(id => Number(id)) : null;
  const friendsArray = friends ? Object.values(friends) : null;
  const isFriend = friendsIds?.includes(user.id);

  const handleFriend = e => {
    e.preventDefault();

    if (!isFriend) {
      dispatch(befriendUser(sessionUser.id, user.id));
    } else {
      dispatch(unfriendUser(sessionUser.id, user.id));
    }
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
      <div className="follow-btn">
        <button
          onClick={handleFriend}
          className={`${isFriend ?
                    'friend bg-red-500 hover:bg-red-400 text-white font-bold py-4 px-4 border-b-4 border-red-700 hover:border-red-500 rounded' :
                    'not-friend bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'}`}
          >
          {isFriend ? 'Remove Friend' : 'Add Friend'}
        </button>
      </div>
    </li>
  );
}
