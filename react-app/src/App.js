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
import SingleGame from './components/SingleGame';
import NewGameSetup from './components/NewGame/NewGameSetup';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

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
            <Route path='/games/:gameId/setup' element={ <NewGameSetup /> } exact={true} />
            <Route path='/games/:gameId' element={ <SingleGame /> } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
