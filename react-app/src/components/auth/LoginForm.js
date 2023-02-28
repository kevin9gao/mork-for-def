import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../store/session";
import './Auth.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [hideErrors, setHideErrors] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(['Email or password incorrect. Please try again.']);
      setHideErrors(false);
    }
  };

  if (user) {
    return navigate('/home');
  }

  return (
    <div className="login-wrapper">
      <div className="header">
        <div id="logo-wrapper">
          <NavLink to='/'>
            <span>Morked For Def</span>
          </NavLink>
        </div>
      </div>
      <div className="main" id="login">
        <div className="form-wrapper">
          <h4>Log In</h4>
          <form onSubmit={handleSubmit}>
            <div hidden={hideErrors}>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              <input
                name='email'
                type='text'
                placeholder='name@email.com'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                name='password'
                type='password'
                placeholder='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button type='submit'>Login</button>
          </form>
          <div className='login-reroute' id='signup-reroute'>
            <div>Don't have an account?</div>
            <NavLink to='/signup'>
              Sign Up.
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
