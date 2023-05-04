import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGame, loadUsersGames } from "../../store/games";
import { loadUserInvites } from "../../store/invites";
import AcceptButton from "./AcceptButton";
import './GamesList.css';
import RejectButton from "./RejectButton";

export default function InviteList() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const invites = useSelector(state => state.invites['invites-received']);
  const invitesArray = invites ? Object.values(invites) : null;
  // console.log('invitesArray', invitesArray);
  const [users, setUsers] = useState({});
  const [games, setGames] = useState({});
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch('/api/users');
      const data = await res.json();
      const usersArray = data.users;
      const usersObj = usersArray.reduce((a, v) => ({ ...a, [v.id]: v }), {});
      setUsers(usersObj);
    }
    fetchUsers();

    async function fetchGames() {
      const res = await fetch('/api/games');
      const data = await res.json();
      const gamesArray = data.games;
      const gamesObj = gamesArray.reduce((a, v) => ({ ...a, [v.id]: v }), {});
      setGames(gamesObj);
    }
    fetchGames();
  }, [refresh]);
  // console.log('users', users);

  useEffect(() => {
    dispatch(loadUserInvites(sessionUser?.id));
    dispatch(loadUsersGames(sessionUser?.id));
  }, [refresh]);
  // console.log('refresh', refresh);

  const myInvites = invitesArray?.filter(async invite => {
    // const invitedGame = await dispatch(loadGame(invite.game_id));
    // console.log('invitedGame', invitedGame)

    return (!invite.accepted & !invite.rejected);
  }).map(invite => {
    return (
      <li key={invite.id}>
        <div className="invites-list-ele">
          <div>
            <span>{games[invite.game_id]?.name}</span>
          </div>
          <div>
            <span>{users[invite.inviter_id]?.username}</span>
          </div>
          <div>
            <span>{games[invite.game_id]?.num_players}</span>
          </div>
          <div>
            <AcceptButton invite={invite} refresh={refresh} setRefresh={setRefresh} />
          </div>
          <div>
            <RejectButton invite={invite} refresh={refresh} setRefresh={setRefresh} />
          </div>
        </div>
      </li>
    );
  })

  return (
    <div className="games-list-wrapper mt-2">
      <h2>Game Invites</h2>
      <div id="my-games">
        {myInvites && (
          <ul id="my-games-ul" className="invites">
            <li className="sticky top-0 bg-black">
              <div className="games-list-ele invites-header">
                <div>
                  <span>Name</span>
                </div>
                <div>
                  <span>From</span>
                </div>
                <div>
                  <span>Players</span>
                </div>
                <div>
                  <span>Action</span>
                </div>
              </div>
            </li>
            {myInvites}
          </ul>
        )}
      </div>
    </div>
  );
}
