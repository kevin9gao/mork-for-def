import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadUsersGames, updateGame } from "../../store/games";

const EVIL = ['Time Shifter', 'Cultist', 'Necromancer', 'Disruptor'];
const GOOD = ['Psychic', 'Jesus', 'Medium', 'Mystic', 'Antideath'];

export default function RoleSelection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gameId = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const game = useSelector(state => state.games[gameId.gameId]);
  const [death, setDeath] = useState('active');
  const [timeShifter, setTimeShifter] = useState('');
  const [cultist, setCultist] = useState('');
  const [necromancer, setNecromancer] = useState('');
  const [disruptor, setDisruptor] = useState('');
  const [psychic, setPsychic] = useState('');
  const [jesus, setJesus] = useState('');
  const [medium, setMedium] = useState('');
  const [mystic, setMystic] = useState('');
  const [antideath, setAntideath] = useState('');
  const [villager_1, setVillager_1] = useState('');
  const [villager_2, setVillager_2] = useState('');
  const [villager_3, setVillager_3] = useState('');
  const [villager_4, setVillager_4] = useState('');
  const [villager_5, setVillager_5] = useState('');
  const [evos_1, setEvos_1] = useState('');
  const [evos_2, setEvos_2] = useState('');
  const [evos_3, setEvos_3] = useState('');
  const [evos_4, setEvos_4] = useState('');
  const numPlayers = game ? game.num_players : null;
  const numEvil = numPlayers ? Math.floor(numPlayers / 2) : null;
  const numGood = numPlayers ? Math.ceil(numPlayers / 2) : null;
  const [selectedEvil, setSelectedEvil] = useState(0);
  const [selectedGood, setSelectedGood] = useState(0);

  // console.log('gameId', gameId);
  // console.log('game', game);

  useEffect(() => {
    dispatch(loadUsersGames(sessionUser?.id));
  }, []);

  useEffect(() => {
    const evilFill = numEvil - selectedEvil;
    if (evilFill === 4) {
      setEvos_1('active');
      setEvos_2('active');
      setEvos_3('active');
      setEvos_4('active');
    } else if (evilFill === 3) {
      setEvos_1('active');
      setEvos_2('active');
      setEvos_3('active');
      setEvos_4('');
    } else if (evilFill === 2) {
      setEvos_1('active');
      setEvos_2('active');
      setEvos_3('');
      setEvos_4('');
    } else if (evilFill === 1) {
      setEvos_1('active');
      setEvos_2('');
      setEvos_3('');
      setEvos_4('');
    } else {
      setEvos_1('');
      setEvos_2('');
      setEvos_3('');
      setEvos_4('');
    }
  }, [selectedEvil]);

  useEffect(() => {
    const villagerFill = numGood - selectedGood;
    if (villagerFill === 5) {
      setVillager_1('active');
      setVillager_2('active');
      setVillager_3('active');
      setVillager_4('active');
      setVillager_5('active');
    } if (villagerFill === 4) {
      setVillager_1('active');
      setVillager_2('active');
      setVillager_3('active');
      setVillager_4('active');
      setVillager_5('');
    } else if (villagerFill === 3) {
      setVillager_1('active');
      setVillager_2('active');
      setVillager_3('active');
      setVillager_4('');
      setVillager_5('');
    } else if (villagerFill === 2) {
      setVillager_1('active');
      setVillager_2('active');
      setVillager_3('');
      setVillager_4('');
      setVillager_5('');
    } else if (villagerFill === 1) {
      setVillager_1('active');
      setVillager_2('');
      setVillager_3('');
      setVillager_4('');
      setVillager_5('');
    } else {
      setVillager_1('');
      setVillager_2('');
      setVillager_3('');
      setVillager_4('');
      setVillager_5('');
    }
  }, [selectedGood]);

  const handleSubmit = async e => {
    e.preventDefault();

    // const players = game?.players;
    // console.log('players', players);
    const deathId = Math.floor(Math.random() * numPlayers);
    // console.log('deathId', deathId);

    const payload = {
      name: game?.name,
      phase: 'infiltration',
      active: true,
      death: deathId,
      death_status: 'alive',
      time_shifter: timeShifter === 'active' ? 100 : -1,
      time_shifter_status: timeShifter === 'active' ? 'alive' : 'inactive',
      cultist: cultist === 'active' ? 100 : -1,
      cultist_status: cultist === 'active' ? 'alive' : 'inactive',
      necromancer: necromancer === 'active' ? 100 : -1,
      necromancer_status: necromancer === 'active' ? 'alive' : 'inactive',
      disruptor: disruptor === 'active' ? 100 : -1,
      disruptor_status: disruptor === 'active' ? 'alive' : 'inactive',
      psychic: psychic === 'active' ? 100 : -1,
      psychic_status: psychic === 'active' ? 'alive' : 'inactive',
      jesus: jesus === 'active' ? 100 : -1,
      jesus_status: jesus === 'active' ? 'alive' : 'inactive',
      medium: medium === 'active' ? 100 : -1,
      medium_status: medium === 'active' ? 'alive' : 'inactive',
      mystic: mystic === 'active' ? 100 : -1,
      mystic_status: mystic === 'active' ? 'alive' : 'inactive',
      antideath: antideath === 'active' ? 100 : -1,
      antideath_status: antideath === 'active' ? 'alive' : 'inactive',
      villager_1: villager_1 === 'active' ? 100 : -1,
      villager_1_status: villager_1 === 'active' ? 'alive' : 'inactive',
      villager_2: villager_2 === 'active' ? 100 : -1,
      villager_2_status: villager_2 === 'active' ? 'alive' : 'inactive',
      villager_3: villager_3 === 'active' ? 100 : -1,
      villager_3_status: villager_3 === 'active' ? 'alive' : 'inactive',
      villager_4: villager_4 === 'active' ? 100 : -1,
      villager_4_status: villager_4 === 'active' ? 'alive' : 'inactive',
      villager_5: villager_5 === 'active' ? 100 : -1,
      villager_5_status: villager_5 === 'active' ? 'alive' : 'inactive',
      evos_1: evos_1 === 'active' ? 100 : -1,
      evos_1_status: evos_1 === 'active' ? 'alive' : 'inactive',
      evos_2: evos_2 === 'active' ? 100 : -1,
      evos_2_status: evos_2 === 'active' ? 'alive' : 'inactive',
      evos_3: evos_3 === 'active' ? 100 : -1,
      evos_3_status: evos_3 === 'active' ? 'alive' : 'inactive',
      evos_4: evos_4 === 'active' ? 100 : -1,
      evos_4_status: evos_4 === 'active' ? 'alive' : 'inactive',
    };

    console.log('payload', payload)

    const updatedGame = await dispatch(updateGame(game?.id, payload));
    if (updatedGame) navigate(`/games/${game?.id}/await-infiltrate`);
  }
  // console.log('numPlayers', numPlayers);

  const roleCard = (role, setRole, roleName) => {
    const toggleCard = e => {
      e.preventDefault();

      if (roleName === 'Death') return;
      if (role === '') {
        if (EVIL.includes(roleName)) {
          if (selectedEvil < numEvil) {
            setRole('active');
            setSelectedEvil(selectedEvil + 1);
          }
        }
        if (GOOD.includes(roleName)) {
          if (selectedGood < numGood) {
            setRole('active');
            setSelectedGood(selectedGood + 1);
          }
        }
      }
      else if (role === 'active') {
        if (EVIL.includes(roleName)) {
          setRole('');
          setSelectedEvil(selectedEvil - 1);
        }
        if (GOOD.includes(roleName)) {
          setRole('');
          setSelectedGood(selectedGood - 1);
        }
      }
    }

    return (
      <li id={roleName} className={role} onClick={toggleCard}>
        <div className="role-img">
          {/* <img src={} /> */}
        </div>
        <div className="role-name">
          <span>{roleName}</span>
        </div>
      </li>
    );
  }

  return (
    <div className="roles-wrapper">
      <h1>Role Selection</h1>
      <div>
        <span>{`Players: ${numPlayers}`}</span>
      </div>
      <div>
        <span>{`Select up to ${numEvil - selectedEvil} more evil roles and
                ${numGood - selectedGood} more good roles.`}</span>
      </div>
      <div>
        <span>If insufficient evil or good roles are selected, empty roles
          will be filled with generic evil or generic villagers.</span>
      </div>
      <div>
        <span>Death is always in the game, and will infiltrate a faction of their
          choosing after this phase. A random role will then be discarded from the
          faction he chooses to infiltrate.
        </span>
      </div>
      <div className="roles-wrapper">
        <div className="evil-and-death-wrapper">
          <ul>
            {roleCard(death, setDeath, 'Death')}
            {roleCard(timeShifter, setTimeShifter, 'Time Shifter')}
            {roleCard(cultist, setCultist, 'Cultist')}
            {roleCard(necromancer, setNecromancer, 'Necromancer')}
            {roleCard(disruptor, setDisruptor, 'Disruptor')}
          </ul>
        </div>
        <div className="good-roles-wrapper">
          <ul>
            {roleCard(psychic, setPsychic, 'Psychic')}
            {roleCard(jesus, setJesus, 'Jesus')}
            {roleCard(medium, setMedium, 'Medium')}
            {roleCard(mystic, setMystic, 'Mystic')}
            {roleCard(antideath, setAntideath, 'Antideath')}
          </ul>
        </div>
      </div>
      <button id="confirm-role-btn" onClick={handleSubmit}>Confirm Roles</button>
    </div>
  );
}
