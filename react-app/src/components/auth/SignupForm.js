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
      navigate('/home');
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
            <h1>Marked For Death</h1>
          </NavLink>
        </div>
      </div>
      <div className="main">
        <div className="left">
          <div className="form-wrapper flex justify-start">
            <form
              className="bg-slate-600 shadow-md rounded p-6 flex flex-col justify-center"
              onSubmit={handleSubmit} id='sign-up-form'>
              <div className="flex justify-center">
                <h3>Sign Up</h3>
              </div>
              <div
                className="my-2 px-4"
                hidden={hideErrors}>
                {validationErrors.map((error, ind) => (
                  <div key={ind} className="text-sm text-red-400">{`* ${error}`}</div>
                ))}
              </div>
              <div className="m-2 flex flex-col">
                <label className="mb-2">Email</label>
                <input
                  type='text'
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  name="email"
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  placeholder='name@email.com'
                />
              </div>
              <div className="m-2 flex flex-col">
                <label className="mb-2">Username</label>
                <input
                  type='text'
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  name="username"
                  onChange={e => setUsername(e.target.value)}
                  value={username}
                  placeholder='Username'
                />
              </div>
              <div className="m-2 flex flex-col">
                <label className="mb-2">Password</label>
                <input
                  type='password'
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  name="password"
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  placeholder='Password'
                />
              </div>
              <div className="m-2 flex flex-col">
                <label className="mb-2">Confirm Password</label>
                <input
                  type='password'
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  name="repeat_password"
                  onChange={e => setRepeatPassword(e.target.value)}
                  value={repeatPassword}
                  placeholder='Confirm Password'
                />
              </div>
              <div className="flex justify-center m-4">
                <button
                  className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                  type='submit'>Sign Up</button>
              </div>
              <div className='login-reroute mt-2 flex flex-row justify-evenly'>
                <div className="text-sm">Already have an account?</div>
                <NavLink to='/login' className='text-sm'>
                  Log In.
                </NavLink>
              </div>
            </form>
          </div>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
}

export default SignupForm;
