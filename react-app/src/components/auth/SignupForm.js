import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { signUp } from '../../store/session';
import './Auth.css';

const SignupForm = () => {
  const [validationErrors, setValidationErrors] = useState([]);
  const [hideErrors, setHideErrors] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('/api/users');
      const responseData = await response.json();
      setUsers(responseData.users);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const errors = [];

    if (!username.length) {
      errors.push('Please provide a username.');
    } else if (username.length > 40) {
      errors.push('Username cannot be longer than 40 characters.');
    } else if (users.map(user => user.username).includes(username)) {
      errors.push('Username is taken.');
    }

    if (!email.length) {
      errors.push('Please provide a email.');
    } else if (email.length > 255) {
      errors.push('Email cannot be longer than 255 characters.');
    } else if (users.map(user => user.email).includes(email)) {
      errors.push('Email is taken.');
    } else if (!email.includes('@')) {
      errors.push('Please provide a valid email.');
    }

    if (!password.length) {
      errors.push('Please provide a password.');
    } else if (repeatPassword !== password) {
      errors.push('Confirm password must be the same as password.');
    }

    setValidationErrors(errors);
  }, [username, email, password, repeatPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validationErrors.length) {
      const data = await dispatch(signUp(username, email, password));
      // console.log('data.errors', data);
    } else {
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
      <div className="main">
        <div className="left">
          <div className="form-wrapper">
            <h4>Sign Up</h4>
            <form onSubmit={handleSubmit} id='sign-up-form'>
              <div hidden={hideErrors}>
                {validationErrors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div>
                <input
                  type='text'
                  name="email"
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  placeholder='name@email.com'
                />
              </div>
              <div>
                <input
                  type='text'
                  name="username"
                  onChange={e => setUsername(e.target.value)}
                  value={username}
                  placeholder='Username'
                />
              </div>
              <div>
                <input
                  type='password'
                  name="password"
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  placeholder='Password'
                />
              </div>
              <div>
                <input
                  type='password'
                  name="repeat_password"
                  onChange={e => setRepeatPassword(e.target.value)}
                  value={repeatPassword}
                  placeholder='Confirm Password'
                />
              </div>
              <button type='submit'>Sign Up</button>
            </form>
            <div className='login-reroute'>
              <div>Already have an account?</div>
              <NavLink to='/login'>
                Log In.
              </NavLink>
            </div>
          </div>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
}

export default SignupForm;
