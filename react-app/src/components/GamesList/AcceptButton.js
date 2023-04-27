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
    <button
      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      onClick={handleAccept}>Accept</button>
  );
}
