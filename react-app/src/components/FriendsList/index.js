import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { befriendUser, loadFriendsList, unfriendUser } from "../../store/users";
import User from "./User";
import './FriendsList.css';

export default function FriendsList() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const sessionUser = useSelector(state => state.session.user);
  const friends = useSelector(state => state.users.friends);


  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data.users);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    if (sessionUser) dispatch(loadFriendsList(sessionUser.id));
  }, []);

  const friendsIds = friends ? Object.keys(friends) : null;
  const friendsArray = friends ? Object.values(friends) : null;

  const allUsers = users?.filter(user => user.id !== sessionUser.id).map(user => {
    return (
      <User user={user} />
    );
  })

  const myFriends = friendsArray?.map(friend => {
    return (
      <User user={friend} />
    );
  })

  if (!sessionUser) return null;

  return (
    <div className="users-lists">
      <div className="users-friends-wrapper">
        <div className="all-users">
          <h3>All Users</h3>
          {allUsers && (
            <ul id="all-users-list">
              {allUsers}
            </ul>
          )}
        </div>
        <div className="my-friends-list-wrapper">
          <h3>Friends</h3>
          {myFriends && (
            <ul id="my-friends-list">
              {myFriends}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
