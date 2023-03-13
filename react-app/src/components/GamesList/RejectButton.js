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
    <button onClick={handleReject}>Reject</button>
  );
}
