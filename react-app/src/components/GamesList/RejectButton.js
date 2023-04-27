import React from "react";
import { useDispatch } from "react-redux";
import { rejectInvite } from "../../store/invites";

export default function RejectButton({ invite, refresh, setRefresh }) {
  const dispatch = useDispatch();

  const handleReject = e => {
    e.preventDefault();

    if (!invite.rejected) {
      dispatch(rejectInvite(invite.id));
      setRefresh(refresh + 1);
    }
  }

  return (
    <button
      className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
      onClick={handleReject}>Reject</button>
  );
}
