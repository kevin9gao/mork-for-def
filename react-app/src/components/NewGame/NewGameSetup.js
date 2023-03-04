import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadGame, updateGame } from "../../store/games";
import { loadFriendsList } from "../../store/users";
import UserInvite from "./UserInvite";

export default function NewGameSetup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gameId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const friends = useSelector(state => state.users.friends);

  useEffect(() => {
    dispatch(loadFriendsList(sessionUser.id));
    dispatch(loadGame(gameId));
  }, []);

  const game = useSelector(state => state.games.current);
  const [name, setName] = useState(game?.name);
  const [phase, setPhase] = useState(game?.phase);
  const [active, setActive] = useState(game?.active);
  console.log('name', name)
  console.log('phase', phase)
  console.log('active', active)

  const handleSubmit = e => {
    e.preventDefault();

    const payload = {
      name,
      phase,
      active,
    };

    dispatch(updateGame(game.id, payload));
  }

  const friendsArray = friends ? Object.values(friends) : null;

  const myFriends = friendsArray?.map(friend => {
    return (
      <UserInvite user={friend} game={game} />
    );
  })

  if (!sessionUser) return null;

  return (
    <div className="new-game-setup-wrapper">
      <div className="form-wrapper">
        <form className="new-game-form" onSubmit={handleSubmit}>
          <div className="game-header">
            <span>Set a name for your campaign...</span>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="game-invite">
            <span>Invite Friends...</span>
            <ul>
              {myFriends}
            </ul>
          </div>
          <button>Confirm</button>
        </form>
      </div>
    </div>
  );
}
