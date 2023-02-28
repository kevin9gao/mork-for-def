import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SplashPage from './components/SplashPage/SplashPage';
import SignupForm from './components/auth/SignupForm';
import LoginForm from './components/auth/LoginForm';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Routes>
          <Route path='/' element={ <SplashPage /> } />
          <Route path='/signup' element={ <SignupForm /> } exact={true} />
          <Route path='/login' element={ <LoginForm /> } exact={true} />
          <Route path='home' element={ <Home /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
