import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadGame, loadUsersGames, updateGame } from "../../store/games";
import { loadGameInvites } from "../../store/invites";
import { loadFriendsList } from "../../store/users";
import { Modal } from "../../context/Modal";
import DeleteGameButton from "./DeleteGameButton";
import Player from "./Player";
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
  const [players, setPlayers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // console.log('gameId', gameId)
  // console.log('game', game)
  // console.log('name', name)
  console.log('phase', phase)
  // console.log('active', active)
  // console.log('players', players)
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
      setPlayers(fetchedGame.players);
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

  const handleGameStart = async e => {
    e.preventDefault();

    // setPhase('role-selection');

    const payload = {
      name,
      phase: 'role-selection',
      active,
    };
    console.log('NewGameSetup payload', payload)

    const updatedGame = await dispatch(updateGame(game.id, payload));

    if (updatedGame) navigate(`/games/${game.id}/roles`);
  }

  const friendsArray = friends ? Object.values(friends) : null;

  const myFriends = friendsArray?.map(friend => {
    return (
      <UserInvite user={friend} game={game} />
    );
  })

  const gamePlayers = players?.map(player => {
    return (
      <Player player={player} />
    );
  })

  if (!sessionUser) return null;

  if (sessionUser?.id !== game?.creator_id) {
    return (
      <div className="new-game-setup-wrapper">
        <div className="form-wrapper">
          <form className="new-game-form" onSubmit={handleSubmit}>
            <div className="game-header">
              <span>Campaign Name</span>
              <h3>{game.name}</h3>
            </div>
            <div className="game-invite">
              <span>Players</span>
              <ul id="game-players-ul">
                {gamePlayers}
              </ul>
            </div>
            <button disabled>Awaiting game master setup...</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="new-game-setup-wrapper">
      <div className="form-wrapper">
        <form className="new-game-form" onSubmit={handleSubmit}>
          <div className="game-header">
            <span>Campaign Name</span>
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
            <span>Players</span>
            <ul id="game-players-ul">
              {gamePlayers}
            </ul>
          </div>
          <button>Confirm.</button>
        </form>
        {players.length >= 6 && (
          <button onClick={() => setShowModal(true)} id='start-game-btn'>
            Start Game.
          </button>
        )}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <h3>You have enough players to start your campaign.</h3>
            <h4>Do you want to begin?</h4>
            <button onClick={handleGameStart} className='start-btn'>
              Start Game.
            </button>
            <button onClick={() => setShowModal(false)}>
              No, I'm still waiting for players. Go back.
            </button>
          </Modal>
        )}
        <div className="delete-btn-wrapper">
          <DeleteGameButton game={game} />
        </div>
      </div>
    </div>
  );
}
