import React from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../FriendsList/User";

export default function InvitePlayers() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const friends = useSelector(state => state.users.friends);

  const friendsArray = friends ? Object.values(friends) : null;

  const myFriends = friendsArray?.map(friend => {
    return (
      <User user={friend} />
    );
  })

  if (!sessionUser) return null;

  return ();
}
