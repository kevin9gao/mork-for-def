import React from "react";
import { useDispatch } from "react-redux";
import { acceptGameInvite } from "../../store/games";
import { acceptInvite } from "../../store/invites";

export default function AcceptButton({ invite, refresh, setRefresh }) {
  const dispatch = useDispatch();

  const handleAccept = e => {
    e.preventDefault();

    if (!invite.accepted) {
      dispatch(acceptInvite(invite.id));
      dispatch(acceptGameInvite(invite.game_id));
      setRefresh(refresh + 1);
    }
  };

  return (
    <button onClick={handleAccept}>Accept</button>
  );
}
