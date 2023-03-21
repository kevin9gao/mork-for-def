import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadUsersGames } from "../../store/games";

const EVIL = ['Time Shifter', 'Cultist', 'Necromancer', 'Disruptor'];
const GOOD = ['Psychic', 'Hero', 'Medium', 'Mystic', 'Antideath'];

export default function RoleSelection() {
  const dispatch = useDispatch();
  const gameId = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const game = useSelector(state => state.games[gameId.gameId]);
  const [death, setDeath] = useState('active');
  const [timeShifter, setTimeShifter] = useState('');
  const [cultist, setCultist] = useState('');
  const [necromancer, setNecromancer] = useState('');
  const [disruptor, setDisruptor] = useState('');
  const [psychic, setPsychic] = useState('');
  const [hero, setHero] = useState('');
  const [medium, setMedium] = useState('');
  const [mystic, setMystic] = useState('');
  const [antideath, setAntideath] = useState('');
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
        <span>{`Please select ${numEvil - selectedEvil} more evil roles and
                ${numGood - selectedGood} more good roles.`}</span>
      </div>
      <div>
        <span>If insufficient evil or good roles are selected, empty roles
          will be filled with generic evil or generic villagers.</span>
      </div>
      <div>
        <span>Death is always in the game.</span>
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
            {roleCard(hero, setHero, 'Hero')}
            {roleCard(medium, setMedium, 'Medium')}
            {roleCard(mystic, setMystic, 'Mystic')}
            {roleCard(antideath, setAntideath, 'Antideath')}
          </ul>
        </div>
      </div>
    </div>
  );
}
