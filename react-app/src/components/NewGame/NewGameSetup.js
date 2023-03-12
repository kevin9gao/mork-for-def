import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadGame, loadUsersGames, updateGame } from "../../store/games";
import { loadGameInvites } from "../../store/invites";
import { loadFriendsList } from "../../store/users";
import UserInvite from "./UserInvite";

export default function NewGameSetup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gameId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const friends = useSelector(state => state.users.friends);
  const [game, setGame] = useState({});
  const [name, setName] = useState('');
  const [phase, setPhase] = useState('');
  const [active, setActive] = useState(true);
  console.log('gameId', gameId)
  console.log('game', game)
  console.log('name', name)
  console.log('phase', phase)
  console.log('active', active)
  // console.log('game.name', game?.name)

  useEffect(() => {
    dispatch(loadFriendsList(sessionUser.id));
    dispatch(loadUsersGames(sessionUser.id));
    dispatch(loadGameInvites(gameId));

    async function fetchGame() {
      const fetchedGame = await dispatch(loadGame(gameId));
      setGame(fetchedGame);
      setName(fetchedGame.name);
      setPhase(fetchedGame.phase);
      setActive(fetchedGame.active);
    };
    fetchGame();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      name,
      phase,
      active,
    };

    const updatedGame = await dispatch(updateGame(game.id, payload));

    if (updatedGame) navigate('/home');
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
