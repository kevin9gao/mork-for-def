import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadUsersGames, updateGame } from "../../store/games";

export default function Infiltrate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);
  const { gameId } = useParams();
  const game = useSelector(state => state.games[gameId]);
  const [evil, setEvil] = useState(false);
  const [good, setGood] = useState(false);
  const [hideErrors, setHideErrors] = useState(true);
  const [validationErrors, setValidationErrors] = useState([]);
  const [timeShifter, setTimeShifter] = useState(game?.time_shifter[0]);
  const [cultist, setCultist] = useState(game?.cultist[0]);
  const [necromancer, setNecromancer] = useState(game?.necromancer[0]);
  const [disruptor, setDisruptor] = useState(game?.disruptor[0]);
  const [psychic, setPsychic] = useState(game?.psychic[0]);
  const [jesus, setJesus] = useState(game?.jesus[0]);
  const [medium, setMedium] = useState(game?.medium[0]);
  const [mystic, setMystic] = useState(game?.mystic[0]);
  const [antideath, setAntideath] = useState(game?.antideath[0]);
  const [villager_1, setVillager_1] = useState(game?.villager_1[0]);
  const [villager_2, setVillager_2] = useState(game?.villager_2[0]);
  const [villager_3, setVillager_3] = useState(game?.villager_3[0]);
  const [villager_4, setVillager_4] = useState(game?.villager_4[0]);
  const [villager_5, setVillager_5] = useState(game?.villager_5[0]);
  const [evos_1, setEvos_1] = useState(game?.evos_1[0]);
  const [evos_2, setEvos_2] = useState(game?.evos_2[0]);
  const [evos_3, setEvos_3] = useState(game?.evos_3[0]);
  const [evos_4, setEvos_4] = useState(game?.evos_4[0]);

  useEffect(() => {
    dispatch(loadUsersGames(sessionUser?.id));
  }, []);

  useEffect(() => {
    if (!evil & !good) setValidationErrors(['Please choose a faction.']);
    else setValidationErrors([]);
  }, [evil, good]);

  const gameKeys = game ? Object.keys(game) : null;
  const gameValues = game ? Object.values(game) : null;
  const roles = game ? gameValues?.map((value, idx) => {
    if (typeof value === 'object' & value[0] > 0) {
      // to deal with the to_dict method of games returning the faction for death
      if (gameKeys[idx] === 'death') return [value[0], value[1], gameKeys[idx], value[2]];

      return [...value, gameKeys[idx]];
    }
  }).filter(value => !!value) : null;
  const remainingRoles = roles?.filter(role => role[2] !== 'death').map(role => role[2]);
  const players = game ? Object.values(game.players) : null;
  const playerIds = [];
  for (let key in players) {
    if (players[key].id === sessionUser?.id) continue;
    playerIds.push(players[key].id);
  }
  // console.log('gameKeys', gameKeys);
  // console.log('gameValues', gameValues);
  // console.log('roles', roles);
  // console.log('remainingRoles', remainingRoles);
  // console.log('players', players);
  // console.log('playerIds', playerIds);

  const handleEvil = (e) => {
    e.preventDefault();

    if (!evil & !good) setEvil(true);
    if (good) {
      setGood(false);
      setEvil(true);
    }
  }
  const handleGood = (e) => {
    e.preventDefault();

    if (!good & !evil) setGood(true);
    if (evil) {
      setEvil(false);
      setGood(true);
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();

    if (!!validationErrors.length) {
      return setHideErrors(false);
    }

    const roleBook = {};
    while (remainingRoles.length > 0) {
      const numPlayers = playerIds.length;
      const role = remainingRoles.pop();
      if (numPlayers === 0) {
        roleBook[role] = -1;
        break;
      }
      let playerIdx = Math.floor(Math.random() * numPlayers);
      if (playerIdx >= numPlayers) playerIdx = numPlayers - 1;
      const playerId = playerIds.splice(playerIdx, 1)[0];
      roleBook[role] = playerId;
    }
    // console.log('roleBook', roleBook);

    const payload = {
      name: game.name,
      phase: 'role-reveal',
      active: true,
      death_faction: evil ? 'evil' : 'good',
      death: game.death[0],
      death_status: 'alive',
      time_shifter: timeShifter > 0 ? roleBook['time_shifter'] : -1,
      time_shifter_status: timeShifter > 0 & roleBook['time_shifter'] > 0 ? 'alive' : 'inactive',
      cultist: cultist > 0 ? roleBook['cultist'] : -1,
      cultist_status: cultist > 0 & roleBook['cultist'] > 0 ? 'alive' : 'inactive',
      necromancer: necromancer > 0 ? roleBook['necromancer'] : -1,
      necromancer_status: necromancer > 0 & roleBook['necromancer'] > 0 ? 'alive' : 'inactive',
      disruptor: disruptor > 0 ? roleBook['disruptor'] : -1,
      disruptor_status: disruptor > 0 & roleBook['disruptor'] > 0 ? 'alive' : 'inactive',
      psychic: psychic > 0 ? roleBook['psychic'] : -1,
      psychic_status: psychic > 0 & roleBook['psychic'] > 0 ? 'alive' : 'inactive',
      jesus: jesus > 0 ? roleBook['jesus'] : -1,
      jesus_status: jesus > 0 & roleBook['jesus'] > 0 ? 'alive' : 'inactive',
      medium: medium > 0 ? roleBook['medium'] : -1,
      medium_status: medium > 0 & roleBook['medium'] > 0 ? 'alive' : 'inactive',
      mystic: mystic > 0 ? roleBook['mystic'] : -1,
      mystic_status: mystic > 0 & roleBook['mystic'] > 0 ? 'alive' : 'inactive',
      antideath: antideath > 0 ? roleBook['antideath'] : -1,
      antideath_status: antideath > 0 & roleBook['antideath'] > 0 ? 'alive' : 'inactive',
      villager_1: villager_1 > 0 ? roleBook['villager_1'] : -1,
      villager_1_status: villager_1 > 0 & roleBook['villager_1'] > 0 ? 'alive' : 'inactive',
      villager_2: villager_2 > 0 ? roleBook['villager_2'] : -1,
      villager_2_status: villager_2 > 0 & roleBook['villager_2'] > 0 ? 'alive' : 'inactive',
      villager_3: villager_3 > 0 ? roleBook['villager_3'] : -1,
      villager_3_status: villager_3 > 0 & roleBook['villager_3'] > 0 ? 'alive' : 'inactive',
      villager_4: villager_4 > 0 ? roleBook['villager_4'] : -1,
      villager_4_status: villager_4 > 0 & roleBook['villager_4'] > 0 ? 'alive' : 'inactive',
      villager_5: villager_5 > 0 ? roleBook['villager_5'] : -1,
      villager_5_status: villager_5 > 0 & roleBook['villager_5'] > 0 ? 'alive' : 'inactive',
      evos_1: evos_1 > 0 ? roleBook['evos_1'] : -1,
      evos_1_status: evos_1 > 0 & roleBook['evos_1'] > 0 ? 'alive' : 'inactive',
      evos_2: evos_2 > 0 ? roleBook['evos_2'] : -1,
      evos_2_status: evos_2 > 0 & roleBook['evos_2'] > 0 ? 'alive' : 'inactive',
      evos_3: evos_3 > 0 ? roleBook['evos_3'] : -1,
      evos_3_status: evos_3 > 0 & roleBook['evos_3'] > 0 ? 'alive' : 'inactive',
      evos_4: evos_4 > 0 ? roleBook['evos_4'] : -1,
      evos_4_status: evos_4 > 0 & roleBook['evos_4'] > 0 ? 'alive' : 'inactive',
    };

    // console.log('payload', payload);

    const updatedGame = await dispatch(updateGame(gameId, payload));
    if (updatedGame) navigate(`/games/${gameId}/lineup`);
  }

  if (sessionUser?.id !== game?.death[0]) navigate(`/games/${gameId}/await-infiltrate`);

  return (
    <div className="infiltrate-wrapper">
      <div className="infiltrate-instructions">
        <span>
          Your role is Death. Choose to infiltrate either the evil faction or the
          good faction.
        </span>
        <span>
          The other players will not be able to see which faction you infiltrate.
        </span>
        <span>
          Based on your decision, one random role from the chosen good or evil
          roles will be discarded.
        </span>
      </div>
      <div className="infiltrate-choices-wrapper">
        <ul>
          <li className={`infiltrate-choices ${evil ? 'active' : ''}`} id="evil"
            onClick={handleEvil}>
            <div className="role-img">
              {/* <img src={} /> */}
            </div>
            <div className="role-name">
              <span>Evil</span>
            </div>
          </li>
          <li className={`infiltrate-choices ${good ? 'active' : ''}`} id="good"
            onClick={handleGood}>
            <div className="role-img">
              {/* <img src={} /> */}
            </div>
            <div className="role-name">
              <span>Good</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="confirm-btn-wrapper">
        <div
          className="errors"
          hidden={hideErrors}
        >
          <ul>
            {validationErrors && validationErrors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
        <button onClick={handleSubmit}>Confirm</button>
      </div>
    </div>
  );
}
