import React, { useEffect, useState } from "react";
import PlayerTable from "./PlayerTable";
import './GameState.css';
import { useNavigate, useParams } from "react-router-dom";
import Mark from "../SingleGame/Mark";
import { loadUsersGames, updateGame } from "../../store/games";
import { useDispatch, useSelector } from "react-redux";
import LastBreath from "../SingleGame/LastBreath";
import RefreshButton from "./RefreshButton";
import Ending from "../SingleGame/Ending";

export default function GameState() {
  const dispatch = useDispatch();
  const { gameId, phase } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const [rightElement, setRightElement] = useState();
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();
  const game = useSelector(state => state.games[gameId]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  // console.log('gameId', gameId)
  // console.log('phase', phase)

  useEffect(() => {
    loadUsersGames(sessionUser?.id);
    if (phase === 'mark') {
      setRightElement(<Mark refresh={refresh} setRefresh={setRefresh} />);
    } else if (phase === 'last-breath') {
      setRightElement(<LastBreath refresh={refresh} setRefresh={setRefresh}
        gameOver={gameOver} setGameOver={setGameOver} winner={winner} setWinner={setWinner} />);
    } else if (phase === 'conclusion') {
      setRightElement(<Ending />);
    }
  }, [phase, refresh]);

  useEffect(() => {
    if (game?.phase === 'last-breath') {
      navigate(`/games/${gameId}/last-breath`);
    }
    if (game?.phase === 'mark') {
      navigate(`/games/${gameId}/mark`);
    }
    if (game?.phase === 'conclusion') {
      navigate(`/games/${gameId}/conclusion`);
    }
  }, []);

  // console.log('rightElement', rightElement)

  const gameKeys = game ? Object.keys(game) : null;
  const gameValues = game ? Object.values(game) : null;
  const playersObj = {};
  const roles = {};
  if (game) {
    for (let i = 0; i < game.players.length; i++) {
      const player = game.players[i];
      playersObj[player.id] = player;
    };
    const rolesObj = game ? gameValues?.map((value, idx) => {
      if (typeof value === 'object' & value[0] > 0) {
        const val = value;
        return [...val, gameKeys[idx]];
      }
    }).filter(value => !!value) : null;
    // console.log('rolesObj', rolesObj);
    // console.log('playersObj', playersObj)
    for (let i = 0; i < rolesObj.length; i++) {
      const player = playersObj[rolesObj[i][0]];
      roles[player.id] = [playersObj[rolesObj[i][0]], ...rolesObj[i]]
    }
  }
  // console.log('roles', roles);

  return (
    <div className="game-state">
      <RefreshButton refresh={refresh} setRefresh={setRefresh} />
      <div className="left">
        <div className="player-table wrapper">
          <PlayerTable />
        </div>
      </div>
      <div className="right">
        {rightElement}
      </div>
    </div>
  );
}
