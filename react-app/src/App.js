import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SplashPage from './components/SplashPage/SplashPage';
import SignupForm from './components/auth/SignupForm';
import LoginForm from './components/auth/LoginForm';
import Home from './components/Home/Home';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navigation/Navbar';
import { useEffect, useState } from 'react';
import { authenticate } from './store/session';
import NewGameSetup from './components/NewGame/NewGameSetup';
import RoleSelection from './components/NewGame/RoleSelection';
import AwaitInfiltrate from './components/NewGame/AwaitInfiltrate';
import RoleReveal from './components/NewGame/RoleReveal';
import Infiltrate from './components/NewGame/Infiltrate';
import Lineup from './components/GameState/Lineup';
import RoleModal from './components/SingleGame/RoleModal';
import Mark from './components/SingleGame/MarkEvil';
import { loadAllUsers } from './store/users';
import GameState from './components/GameState/GameState';
import ProfilePage from './components/Profile/ProfilePage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllUsers());
  }, []);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) return null;

  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <div id='navbar'>
          <Navbar />
        </div>
        <main>
          <Routes>
            <Route path='/' element={ <SplashPage /> } />
            <Route path='/signup' element={ <SignupForm /> } exact={true} />
            <Route path='/login' element={ <LoginForm /> } exact={true} />
            <Route path='/home' element={ <Home /> } />
            <Route path='/users/:userId' element={ <ProfilePage /> } exact={true} />
            <Route path='/games/:gameId/setup' element={ <NewGameSetup /> } exact={true} />
            <Route path='/games/:gameId/roles' element={ <RoleSelection /> } exact={true} />
            <Route path='/games/:gameId/await-infiltrate' element={ <AwaitInfiltrate /> } exact={true} />
            <Route path='/games/:gameId/role-reveal' element={ <RoleReveal /> } exact={true} />
            <Route path='/games/:gameId/infiltrate' element={ <Infiltrate /> } exact={true} />
            <Route path='/games/:gameId/lineup' element={
              <>
                <Lineup />
                <RoleModal />
              </> } exact={true} />
            <Route path='/games/:gameId/first-mark' element={
              <>
                <Mark />
                <RoleModal />
              </>
            } exact={true} />
            <Route path='/games/:gameId/:phase' element={
              <>
                <GameState />
                <RoleModal />
              </>
              } exact={true} />
            <Route path='/games/:gameId' element={ <GameState /> } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
